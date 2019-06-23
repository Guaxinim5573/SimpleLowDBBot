const Discord = require("discord.js")
const client = new Discord.Client()
const dbfunc = require("./lib/dbfunc")
const chalk = require("chalk")
const config = require("./config.js")
const fs = require("fs")
const db = dbfunc.db

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.commands.array = []
const cooldowns = new Discord.Collection()

if(!db.get('all')) db.set('all', [])

fs.readdir('./commands', async function(err, files){
	if(err) console.log(err)
	var jsf = files.filter(f => f.split(".").pop() === "js")
	if(jsf <= 0) return console.log(chalk.red("Pasta commands não existe, ou está sem arquivos .js"))
	jsf.forEach(f => {
		try {
			var cmd = require(`./commands/${f}`)
			client.commands.set(cmd.help.name, cmd)
			if(!cmd.help.desc) return console.log(chalk.red(`--- Comando ${f} sem a string "desc"`))
			if(!cmd.help.modulo) return console.log(chalk.red(`--- Comando ${f} sem a string "modulo"`))
			client.commands.array.push({name: cmd.help.name, desc: cmd.help.desc, modulo: cmd.help.modulo})
			if(!cmd.help.aliases) return
			cmd.help.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name, cmd)
			})
		} catch(e) {
			console.log(chalk.red('ERROR: ' + e))
		} finally {
			console.log(chalk.green(`${f} Loaded!`))
		}
	})
})

client.on("guildMemberAdd", async function(member){
	dbfunc.createNewUser(member)
})

if(config.lostDB == true) {
	client.on("guildMemberRemove", async function(member){
		dbfunc.deleteUser(member)
	})
}

client.on("ready", async function(){
	console.log(chalk.blue(`${client.user.username} Conectado novamente!`))
})

client.on("message", async function(message){
	if(message.channel.type === "dm") return
	if(message.author.bot) return

	if(!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g); 
	const command = args.shift().toLocaleLowerCase();
	if(command.length <= 0) return

	if(!cooldowns.has(command.name)){
		cooldowns.set(command.name, new Discord.Collection())
	}

	var now = Date.now()
	var timestamps = cooldowns.get(command.name)
	var cooldownAmount = (5) * 1000

	if(timestamps.has(message.author.id)){
		var expTime = timestamps.get(message.author.id) + cooldownAmount
	}
	if(now < expTime){
		var timeLeft = (expTime - now) / 1000
		return message.reply(`Espere mais **${timeLeft.toFixed(1)}** segundos para executar este comando novamente.`)
	}
	timestamps.set(message.author.id, now)
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	try{
		var cmd = client.commands.get(command.slice(config.prefix.lenght)) || client.commands.get(client.aliases.get(command.slice(config.prefix.lenght)))
		if(cmd) cmd.run(client, message, args, db)
		if(!cmd && config.noCommand) return message.reply(`Comando não encontrado.`)
	} catch(e) {
		return message.reply(`**ERROR:** ${e.message}`)
	}
})

client.login(config.token)
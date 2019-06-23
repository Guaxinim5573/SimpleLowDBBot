const Discord = require("discord.js")
const config = require("../config.js")

exports.run = async (client, message, args, db) => {
	var array = db.__wrapped__.all
	array.sort(function(a, b) { return b.coin - a.coin })
	var e = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setTimestamp()
	.setTitle(`TOP COINS`)

	if(config.topMax > 25) return new Error(`CONFIG ERROR: config.topMax nao pode passar de 25`)
	
	for(var i = 0; i < config.topMax; i++) {
		var d = array[i] //Dados da pessoa na DataBase
		var next = array[i + 1] //Próxima pessoa
        var nick = message.guild.members.get(d.id).nickname
        if(nick == undefined) { nick = message.guild.members.get(d.id).user.username }
        e.addField(`${i + 1}º ${nick}`, `${config.zen} ${d.coin}`)
        if(!next){ i = 99 }
	}
	message.reply(e)
}

exports.help = {
	name: 'topcoins',
	desc: 'Mostra as pessoas mais ricas do servidor',
	modulo: 'Economia',
	uso: 'topcoins'
}
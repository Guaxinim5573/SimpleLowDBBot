const Discord = require("discord.js")
const config = require("../config.js")
const dbfunc = require("../lib/dbfunc")

exports.run = async (client, message, args, db) => {
	try{
		var member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member
		var value = db.get('all').find({id: member.id}).value()
		if(value == undefined) {
			message.reply(`Usuário ${member.nickname || member.user.username} não tinha registro na DataBase. Use o comando novamente.`)
			dbfunc.createNewUser(member)
			return
		}
		var e = new Discord.RichEmbed()
		.setFooter(message.author.tag, message.author.displayAvatarURL)
		.setTimestamp()
		.setThumbnail(member.avatarURL)
		.setTitle(`Saldo de ${member.nickname || member.user.username}`)
		.addField(`${config.zenE ? config.zenE : ""} ${config.zen}:`, value.coin)
		if(config.gems) {
			e.addField(`${config.gemE ? config.gemE : ""} ${config.gem}:`, value.gems)
		}
		message.reply(e)
	} catch(e) {
		message.reply(`**ERROR:** ${e.message}`)
	}
}

exports.help = {
	name: 'saldo',
	aliases: ['bal', 'balance', 'money', config.zen.toLowerCase()],
	desc: 'Mostra seu saldo, ou o saldo da pessoa mencionada',
	modulo: 'Economia',
	uso: 'saldo (Usuário)'
}
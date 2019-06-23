const Discord = require("discord.js")
const config = require("../config.js")
const ms = require("parse-ms")
const timeout = 86400000

exports.run = async (client, message, args, db) => {
	var amount = Math.floor(Math.random() * (config.dailyMax - config.dailyMin)) + config.dailyMin
	var value = db.get('all').find({id: message.author.id}).value()
	if(value == undefined) {
		dbfunc.createNewUser(message.member)
		message.reply(`Você não estava na minha DataBase, use o comando novamente.`)
		return
	}
	if(value.daily !== null && timeout - (Date.now() - value.daily) > 0) {
		var time = ms(timeout - (Date.now() - value.daily))
		message.reply(`Você já coletou hoje! Aguarde mais **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
	} else {
		var nw = value.coin + amount
		db.get('all').find({id: message.author.id}).assign({
			coin: nw,
			daily: Date.now()
		}).write()
		message.reply(`Daily coletado com sucesso! Moedas coletada: ${amount}`)
	}
}

exports.help = {
	name: 'daily',
	aliases: ['diaria'],
	desc: 'Coleta seu saldo diário',
	modulo: 'Economia',
	uso: 'daily'
}
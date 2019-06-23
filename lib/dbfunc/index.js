const low = require("lowdb")
const fsync = require("lowdb/adapters/FileSync")
const adap = new fsync('db.json')
const db = low(adap)

const Discord = require("discord.js")
const config = require("../config.js")

exports.db = db

exports.createNewUser = async function(member){
	if(this.db.get('all').find({id: member.id}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
	this.db.get('all').push({
		id: member.id,
		coin: 0,
		gems: 0,
		daily: 0,
		reps: 0
	}).write()
}

exports.deleteUser = async function(member){
	if(this.db.get("all").find({id: member.id}).value() == undefined) return new Error(`DATABASE ERRO: O Membro não tem registro para ser deletado.`)
	this.db.get('all').remove({id: member.id}).write()
}
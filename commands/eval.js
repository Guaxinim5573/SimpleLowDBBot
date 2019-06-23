const Discord = require("discord.js");
var config = require('../config.js')
var ownerID = config.ownerID;


exports.run = async (client, message, args, db) => {
    if (ownerID.includes(message.author.id)) {
        try {
            let argumentos = args.join(" ");
    		if(!args.join(' ')) return message.reply('Burro pa krl')
            let código = eval(argumentos);

            if (typeof código !== 'string')
                código = require('util').inspect(código, { depth: 0 });
            let embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .addField('Entrada', `\`\`\`js\n${argumentos}\`\`\``)
            .addField('Saída', `\`\`\`js\n${código}\n\`\`\``)
            message.channel.send(embed)
        } catch(e) {
            message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
        }
    }
}

exports.help = {
    name: 'eval',
    aliases: ['execute'],
    desc: 'Faz o bot executar um código (Apenas o Guaxinim pode usar!)',
    modulo: 'Bot Owner',
    uso: 'eval [código]'
}
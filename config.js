/* 
	CONFIG.JS
 Ajuda de cada coisa está depois da //
 Nunca modifique nada antes do =
 Caso não saiba básico de JavaScript (Array, Boolean, String, Number) tente não modificar muito.
*/

exports.prefix = "Prefix do seu bot" //Ex: ("t!", "m%")
exports.token = "Token do seu bot" //Ex: ("Só copia do site do discord e cola '-' ")
exports.ownerID = ["OWNER 1 ID", "OWNER 2 ID"] // Propietários do bot, permissão pra EVAL. Ex: ['OWNER 1 ID'] | ['OWNER 1 ID', 'OWNER 2 ID']

exports.dailyMin = 100 // Mínimo de moedas que se ganha no daily
exports.dailyMax = 1000 // Máximo de moedas que se ganha no daily
exports.topMax = 5 // Número de pessoas que aparecem no TOP COIN ou TOPREP | Max: 25

exports.zen = "Nome da primeira moeda" //Ex: (G, Z, Coin, Prata)
exports.gem = "Nome da segunda moeda" //Ex: (Gema, Diamante, Ouro)
exports.gems = false // Mude false pra true, para ativar a segunda moeda (gem)
exports.zenE = "<:Emoji Name:Emoji ID>" //Emoji que aparece junto com a primeira moeda (zen). Ex: ("<a:zenies:93940502930>", "<:coin:020340234923>") | Coloque null ou apague a linha para não existir este emoji
exports.gemE = "<:Emoji Name:Emoji ID>" //Emoji que aparece junto com a segunda moeda (gem). Ex: ("<a:zenies:93940502930>", "<:coin:020340234923>") | Coloque null ou apague a linha para não existir este emoji

exports.lostDB = true // Muda true pra false, para quando membros saírem eles não perderem moedas (Registro na DataBase)
exports.noCommand = true // Muda true pra false, para o bot não avisar quando a pessoa fazer um comando inexistente
const guildModel = require('../../models/guild.js')

module.exports = {
    name: 'language',
    aliases: ['lang'],
    description: 'Change bot language',
    utilisation: '{prefix}lang',

	async execute(client, message, args) {

        const language = args.join(" ").toLowerCase()

        if(language !== 'pt' && language != 'en') return message.channel.send("Você selecionou uma linguagem inválida, por favor digite:\n*You selected an invalid language, please type:*\n\n-**PT** - Português\n-**EN** - English")

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(client.languages.__({phrase: 'lang.noAdm', locale: language}))

        await guildModel.findOne({guildId: message.guildId.toString()}).then((s, err) => {
            if(err) return console.log(err)
            
            if(s){
                s.lang = language
                s.save().catch(e => console.log(e))
            } else {
                const newGuild = new guildModel({
                    guildId: message.guildId.toString(),
                    lang: language
                })
                newGuild.save().catch(e => console.log(e))
            }
        })
        return message.channel.send(client.languages.__({phrase: 'lang.newLang', locale: language}))
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const guildModel = require('../../models/guild.js')

module.exports = {
	data: new SlashCommandBuilder()
        .setName("language")
        .setDescription("Change bot language")
        .addStringOption(option => 
            option.setName("language")
            .setDescription("The language you want")
            .setRequired(true)
            .addChoice('Português', 'pt')
            .addChoice('English', 'en')
            ),

	async execute(client, interaction) {

        const language = interaction.options._hoistedOptions[0].value

        if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: `\`\`\`${client.languages.__({phrase: 'lang.noAdm', locale: language})}\`\`\``, ephemeral:true})

        await guildModel.findOne({guildId: interaction.guildId.toString()}).then((s, err) => {
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
        return interaction.reply({content: `\`\`\`${client.languages.__({phrase: 'lang.newLang', locale: language})}\`\`\``, ephemeral:true})
    }
}
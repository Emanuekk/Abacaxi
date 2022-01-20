const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping') //name of the slash command
        .setDescription('Mostra o ping do bot em relação a você'), //description of the slash cmd

    async execute(client, interaction) {

        const language = interaction.member.guild.lang

        console.log(`${interaction.user.username} - USOU PING SLASH`);

        return interaction.reply({content: `\`\`\`${client.languages.__({phrase: 'ping', locale: language},{ping:client.ws.ping})}\`\`\``, ephemeral:true}).then(() => {
        }).catch(error => {
            console.log(`${interaction.author.id} - MISSING PERMISSIONS PING`);
        })
    },
}
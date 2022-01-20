const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    voiceChannel: true,
	data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Para a musica"),

	async execute(client, interaction) {

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing){
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${interaction.member}... ❌`)
            return interaction.reply({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${interaction.member.id} - MISSING PERMISSIONS STOP`);
            })

        }

        console.log(`${interaction.user.username} - USOU STOP SLASH`);

        queue.destroy();

        interaction.reply("✅").then(() => {
        }).catch(error => {
            console.log(`${interaction.member.id} - Falha ao reagir ao STOP`);
        })
    }
}
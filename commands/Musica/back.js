const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'back',
    aliases: ['prev','voltar', 'anterior'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {

        console.log(`${message.author} - USOU BACK`);

        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
            embed.setColor('RED');
            embed.setTimestamp();
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!queue || !queue.playing) {
            embed.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS BACK`);
            })
        }
        
        if (!queue.previousTracks[1]){
            embed.setDescription(`Não havia música sendo tocada antes ${message.author}... ❌`);
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS BACK`);
            })
        }

        await queue.back();

        message.react('⏮️').then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir ao BACK`);
        })
    },
};
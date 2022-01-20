const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    aliases: ['cq','limpar'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {

        console.log(`${message.author} - USOU CLEAR`);

        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
                embed.setColor('RED');
                embed.setTimestamp();
                embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});
    
        if (!queue || !queue.playing) {
            embed.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS CLEAR`);
            })
        }

        if (!queue.tracks[0]) {
            embed.setDescription(`Não há música na fila após a atual ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS CLEAR`);
            })
        }
        
        await queue.clear();

        message.react('♻️').then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir ao CLEAR`);
        })
    },
};
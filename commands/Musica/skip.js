const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['sk','pular'],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {

        console.log(`${message.author} - USOU SKIP`);

        const queue = player.getQueue(message.guild.id);

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!queue || !queue.playing) {
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SKIP`);
            })
        }
        
        if (!queue.tracks[0]) {
            embed2.setDescription(`Não há música na fila após a anterior ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SKIP`);
            })
        }

        const success = queue.skip();

        return message.react(success?"⏭️" : "❌").then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir ao SKIP`)
        })
    }
}
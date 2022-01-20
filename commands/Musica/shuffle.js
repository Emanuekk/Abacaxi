const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh','embaralhar'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {

        console.log(`${message.author} - USOU SHUFFLE`);

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) {
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SHUFFLE`);
            })
        }

        if (!queue.tracks[0]) {
            embed2.setDescription(`Não há música na fila após a atual ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SHUFFLE`);
            })
        }

        await queue.shuffle();

        return message.react("🔀").then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir no SHUFFLE`);
        })
    },
};
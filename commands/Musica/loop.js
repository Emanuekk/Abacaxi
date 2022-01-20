const { QueueRepeatMode } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {

        console.log(`${message.author} - USOU LOOP`);

        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
            embed.setTimestamp();
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

            const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!queue || !queue.playing) {
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS LOOP`);
            })
        }

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1)  {
                embed.setColor('WHITE');
                embed.setDescription(`Você deve primeiro desativar a música atual no modo de loop (${client.config.app.px}loop) ${message.author}... ❌`) 
                return message.channel.send({ embeds: [embed] }).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS LOOP`);
                })
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            embed.setColor('GREEN');
            embed.setDescription(`Repeat mode **${queue.repeatMode === 0 ? 'desligado' : 'ligado'}** toda a fila será repetida indefinidamente 🔁`)
            embed2.setDescription(`Algo deu errado ${message.author}... ❌`) 
            return message.channel.send(success ? { embeds: [embed] } : { embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS LOOP`);
            })
        
        } else {
            if (queue.repeatMode === 2) {
                embed.setColor('WHITE');
                embed.setDescription(`Você deve primeiro desabilitar a fila atual no modo de loop (${client.config.app.px}loop queue) ${message.author}... ❌`)
                return message.channel.send({ embeds: [embed] }).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS LOOP`);
                })
            }

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            embed.setColor('GREEN');
            embed.setDescription(`Repeat mode **${queue.repeatMode === 0 ? 'desligado' : 'ligado'}** a música atual será repetida indefinidamente (você pode repetir a fila com a opção <loop queue>) 🔂`)
            embed2.setDescription(`Algo deu errado ${message.author}... ❌`) 

            return message.channel.send(success ? { embeds: [embed] } : { embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS LOOP`);
            })
        };
    },
};
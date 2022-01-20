const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'lista','list'],
    utilisation: '{prefix}queue',
    voiceChannel: true,

    execute(client, message) {

        console.log(`${message.author} - USOU QUEUE`);

        const queue = player.getQueue(message.guild.id);

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!queue){
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS QUEUE`);
            })
        }

        if (!queue.tracks[0]){
            embed2.setDescription(`Não há música na fila após a atual ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS QUEUE`);
            })
        }

        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];

        embed.setColor('RED');
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setAuthor({ name: `Lista do Servidor - ${message.guild.name} ${methods[queue.repeatMode]}`,iconURL: '', url: '' })

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Solicitada por : ${track.requestedBy.username})`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `E **${songs - 5}** outra(s) música(s)...` : `A playlist tem **${songs}** música(s)...`;

        embed.setDescription(`Current ${queue.current.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS QUEUE`);
        })
    },
};
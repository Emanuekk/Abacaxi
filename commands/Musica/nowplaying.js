const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np','tocando','pbar'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {

        console.log(`${message.author} - USOU NOWPLAYING`);

        const queue = player.getQueue(message.guild.id);

        const embed = new MessageEmbed();
            embed.setColor('RED');
            embed.setTimestamp();
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!queue || !queue.playing){
            embed.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS NP`);
            })
        }

        const track = queue.current;
        const progress = queue.createProgressBar();

        embed.setColor("DARK_ORANGE");
        embed.setAuthor({ name: `${track.title}\n`,iconURL: '', url: '' })
    
        const methods = ['Desligado', 'Música', 'Playlist'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        if (timestamp.progress == 'Infinity') {

            embed.setDescription(`Tocando ao vivo 🎧\n\n\nLoop mode **${methods[queue.repeatMode]}**\nSolicitada por ${track.requestedBy}`) 
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PROGRESS`);
            })

        }

        embed.setDescription(`${progress} (**${timestamp.progress}**%)\n\nLoop mode **${methods[queue.repeatMode]}**\nSolicitada por ${track.requestedBy}`)
        return message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS PROGRESS`);
        })

    },
};
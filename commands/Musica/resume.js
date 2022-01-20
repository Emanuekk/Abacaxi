const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    aliases: ['rs', 'continuar'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {

        console.log(`${message.author} - USOU RESUME`);

        const embed = new MessageEmbed();
            embed.setColor("DARK_BUT_NOT_BLACK")
            embed.setTimestamp();
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});
        
        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        const queue = player.getQueue(message.guild.id);

        if (!queue) {
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ou pausada ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS RESUME`);
            })
        }

        const success = queue.setPaused(false);
        
        embed.setDescription(`Música ${queue.current.title} continuada ✅`)
        embed2.setDescription(`Algo deu errado ${message.author}... ❌`) 
        return message.channel.send(success ? { embeds: [embed] } : { embeds: [embed2] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS RESUME`);
        })
    },
};
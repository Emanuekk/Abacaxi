const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['dc','desconectar'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {

        console.log(`${message.author} - USOU STOP`);

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing){
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS STOP`);
            })

        }

        queue.destroy();

        message.react("✅").then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir ao STOP`);
        })
    },
};
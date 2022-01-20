const ms = require('ms');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'seek',
    aliases: ['se'],
    utilisation: '{prefix}seek [time]',
    voiceChannel: true,

    async execute(client, message, args) {

        console.log(`${message.author} - USOU SEEK`);

        const queue = player.getQueue(message.guild.id);

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (args.length === 0) { return message.channel.send(`Digite o tempo desejado após o comando ${message.author}... ❌`) }
        else {
            const timeToMS = ms(args.join(' '));
        }

        if (!queue || !queue.playing) {
            embed2.setDescription(`Nenhuma música sendo reproduzida no momento ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEEK`);
            })
        }

        const timeToMS = ms(args.join(' '));
        
        if (timeToMS >= queue.current.durationMS) {
            embed2.setDescription(`O tempo indicado é maior que o tempo total da música atual ${message.author}... ❌\nTente, por exemplo, um tempo válido como ** 5s, 10s, 20 segundos, 1m ** ... *`) 
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEEK`);
            })
        }

        if(!timeToMS){
            embed2.setDescription(`Você digitou um valor inválido! ${message.author}... ❌\nTente, por exemplo, um tempo válido como ** 5s, 10s, 20 segundos, 1m ** ... *`) 
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEEK`);
            })
        }

        await queue.seek(timeToMS);

        embed2.setColor("DARK_NAVY")
        embed2.setDescription(`Tempo definido para a música atual **${ms(timeToMS, { long: true })}** ✅`) 
        return message.channel.send({ embeds: [embed2]}).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS SEEK`);
        })
    },
};
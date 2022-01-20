const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'play',
    aliases: ['p','tocar'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    async execute(client, message, args) {

        const voice = message.member.voice.channel

        const embed = new MessageEmbed();
            embed.setTitle("")
            embed.setColor("RED")
            embed.setTimestamp()
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if(!message.guild.me.permissionsIn(message.member.voice.channel).has(['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD'])){
            embed.setTitle("")
            embed.setDescription(`Não tenho permissão para entrar no seu canal de voz ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PLAY`);
            })
        }

        if (!args[0]) {
            embed.setDescription(`Por favor, digite um pesquisa válida ${message.author}... ❌`)
            embed.setTitle("")
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PLAY`);
            })
        }

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            embed.setDescription(`Sem resultados encontrados ${message.author}... ❌`) 
            embed.setTitle("")
            console.log(`Sem resultados de música encontrados para - ${message.content}`)
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PLAY`);
            })

        }

        console.log(`${message.author} - USOU PLAY: ${args.join(' ')}`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        if (!queue.connection) await queue.connect(voice);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play(); 
        
        message.react("▶️").then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - Falha ao reagir a mensagem de play`)
        })
    },
};
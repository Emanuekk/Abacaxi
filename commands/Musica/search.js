const { MessageEmbed } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'search',
    aliases: ['s','buscar'],
    utilisation: '{prefix}search [song name]',
    voiceChannel: true,

    async execute(client, message, args) {

        const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if (!args[0]) {
            embed2.setDescription(`Por favor, digite uma pesquisa válida ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
            })
        }

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            embed2.setDescription(`Sem resultados encontrados ${message.author}... ❌`) 
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
            })
        }

        console.log(`${message.author} - USOU SEARCH: ${args.join(' ')}`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        var str = args.join(' ');
        var result = str.toUpperCase();

        const embed = new MessageEmbed();

        embed.setColor("AQUA");
        embed.setAuthor({ name: `RESULTADOS PARA: ${result}`, iconURL: '', url: '' })

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nSelecione a escolha dentro de **20s**\n Escolha o número correspondente entre **1** e **${maxTracks.length}** ou **cancel**... 💭`);

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        await message.channel.send({ embeds: [embed]}).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
        })

        const collector = message.channel.createMessageCollector({
            time: 20000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') {
                message.react("✅").then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - Falha ao reagir ao SEARCH`);
                })

                collector.stop()
                embed2.setDescription(`Cancelado ${message.author}... ❌`)
                return message.channel.send({ embeds: [embed2]}).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
                })
            }

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) {
                embed2.setDescription(`Resposta inválida ${message.author} tente um valor entre **1** e **${maxTracks.length}** ou **cancel**... ❌`)
                return message.channel.send({ embeds: [embed2]}).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
                })
            }

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await player.deleteQueue(message.guild.id);
                embed2.setDescription(`Por favor, digite uma pesquisa válida ${message.author}... ❌`)
                return message.channel.send({ embeds: [embed]}).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
                })
            }

            await message.react("✅").then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - Falha ao reagir ao SEARCH`);
            })

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.playing) await queue.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') {
                embed2.setDescription(`Tempo de busca excedido ${message.author}... ❌`)
                return message.channel.send({ embeds: [embed2]}).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS SEARCH`);
                })
            }
        });
    },
};
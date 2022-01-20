const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js')
const cooldown = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help') //name of the slash command
        .setDescription('Mostra o menu de ajuda a você'), //description of the slash cmd

    async execute(client, interaction) {

        if(cooldown.has(interaction.guild.id)) return interaction.reply("Aguarde 1 Minuto para usar esse comando novamente!")

        const language = interaction.member.guild.lang

        console.log(`${interaction.user.username} - USOU HELP SLASH`);

        let embed_1 = new MessageEmbed()
            .setColor("RED")
            .setTitle("Help Menu")
            .setDescription(client.languages.__({phrase: 'help.menu', locale: language},{user:interaction.user}))
            .addField(client.languages.__({phrase: 'help.select', locale: language}),'\u200B')
            .setTimestamp()
            .setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" });

        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
            .setCustomId('menu')
            .setPlaceholder(client.languages.__({phrase: 'help.bar', locale: language})) // Mensagem estampada
            .addOptions([
               {
                    label: client.languages.__({phrase: 'help.inicio.label', locale: language}),
                    description: client.languages.__({phrase: 'help.inicio.description', locale: language}),
                    emoji: '📓',
                    value: 'painel_inicial',
               },
                {
                    label: client.languages.__({phrase: 'help.musica.label', locale: language}),
                    description: client.languages.__({phrase: 'help.music.description', locale: language}),
                    emoji: '🎧',
                    value: 'musica',
                },
                {
                    label: client.languages.__({phrase: 'help.utilidades.label', locale: language}),
                    description: client.languages.__({phrase: 'help.utilidades.description', locale: language}),
                    emoji: '🧮',
                    value: 'utilidade',
                },
                {
                    label: client.languages.__({phrase: 'help.atividades.label', locale: language}),
                    description: client.languages.__({phrase: 'help.atividades.description', locale: language}),
                    emoji: '🕹️',
                    value: 'activities',
                },

            ])

        );
            cooldown.add(interaction.guild.id);
            setTimeout(() => {
                cooldown.delete(interaction.guild.id)
            }, 60000)

            interaction.reply({ embeds: [embed_1], components: [painel] }).then(msg => {

            const filtro = (interaction) => 
            interaction.isSelectMenu()
    
            const coletor = interaction.channel.createMessageComponentCollector({
            filtro,
            time:60000
            });
    
            coletor.on('collect', async (collected) => {

            let valor = collected.values[0]
            collected.deferUpdate()

            if (valor === 'painel_inicial') {

                interaction.editReply({ embeds: [embed_1], components: [painel] });

            };
    
            if (valor === 'musica') {

                let embed_2 = new MessageEmbed()
                    .setColor("RED")
                    .setTitle(client.languages.__({phrase: 'help.musica.title', locale: language}))
                    .setDescription(client.languages.__({phrase: 'help.utilization', locale: language}))
                    .setTimestamp()

                    .addField('\u200B','\u200B')
                    .addField('\`\`\`Play (p)\`\`\` - *$play <link or name>*', client.languages.__({phrase: 'help.play', locale: language}), true)
                    .addField('\`\`\`Stop (dc)\`\`\` - *$stop*', client.languages.__({phrase: 'help.stop', locale: language}), true)
                    .addField('\`\`\`Nowplaying (np)\`\`\` - *$nowplaying*', client.languages.__({phrase: 'help.nowplaying', locale: language}))
                    .addField('\`\`\`Skip (sk)\`\`\` - *$skip*', client.languages.__({phrase: 'help.skip', locale: language}), true)
                    .addField('\`\`\`Back (prev)\`\`\` - *$back*', client.languages.__({phrase: 'help.back', locale: language}), true)
                    .addField('\`\`\`Seek (se)\`\`\` - *$seek <time>*', client.languages.__({phrase: 'help.seek', locale: language}))
                    .addField('\`\`\`Pause (ps)\`\`\` - *$pause*', client.languages.__({phrase: 'help.pause', locale: language}), true)
                    .addField('\`\`\`Resume (rs)\`\`\` - *$resume*', client.languages.__({phrase: 'help.resume', locale: language}), true)
                    .addField('\`\`\`Search (s)\`\`\` - *$search <name>*', client.languages.__({phrase: 'help.search', locale: language}))
                    .addField('\`\`\`Shuffle (sh)\`\`\` - *$shuffle*', client.languages.__({phrase: 'help.shuffle', locale: language}),true)
                    .addField('\`\`\`Queue (list)\`\`\` - *$queue*', client.languages.__({phrase: 'help.queue', locale: language}), true)
                    .addField('\`\`\`Loop (lp)\`\`\` - *$loop [queue]*', client.languages.__({phrase: 'help.loop', locale: language}))
                    .addField('\`\`\`Clear (cq)\`\`\` - *$clear*', client.languages.__({phrase: 'help.clear', locale: language}))
                    .addField('\u200B','\u200B')
                    
                    .setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" });

                interaction.editReply({ embeds: [embed_2], components: [painel] });
            };

            if (valor === 'utilidade') {

                let embed_3 = new MessageEmbed()
                    .setColor("RED")
                    .setTitle(client.languages.__({phrase: 'help.utilidades.title', locale: language}))
                    .setDescription(client.languages.__({phrase: 'help.utilization', locale: language}))
                    .setTimestamp()

                    .addField('\u200B','\u200B')
                    .addField('\`\`\`Coinflip (cf)\`\`\` - *$coinflip*', client.languages.__({phrase: 'help.coinflip', locale: language}), true)
                    .addField('\`\`\`Roll (-)\`\`\` - *$roll [-]*', client.languages.__({phrase: 'help.roll', locale: language}), true)
                    .addField('\`\`\`About (sobre)\`\`\` - *$about*', client.languages.__({phrase: 'help.about', locale: language}))
                    .addField('\`\`\`Copypasta (zap)\`\`\` - *$copypasta*', client.languages.__({phrase: 'help.copypasta', locale: language}), true)
                    .addField('\`\`\`Feedback (bug)\`\`\` - *$feedback <feedback>*', client.languages.__({phrase: 'help.feedback', locale: language}), true)
                    .addField('\`\`\`Userinfo (user)\`\`\` - *$user [@user]*', client.languages.__({phrase: 'help.user', locale: language}))
                    .addField('\`\`\`Ping (pong)\`\`\` - *$ping*', client.languages.__({phrase: 'help.ping', locale: language}), true)
                    .addField('\`\`\`Help (h)\`\`\` - *$help*', client.languages.__({phrase: 'help.help', locale: language}), true)
                    .addField('\`\`\`Ppt (rps)\`\`\` - *$ppt <choice>*', client.languages.__({phrase: 'help.ppt', locale: language}))
                    .addField('\`\`\`Avatar (foto)\`\`\` - *$avatar [@user]*', client.languages.__({phrase: 'help.avatar', locale: language}))
                    .addField('\u200B','\u200B')
                
                    .setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" });

                interaction.editReply({ embeds: [embed_3], components: [painel] });
            };

            if (valor === 'activities') {

                let embed_4 = new MessageEmbed()
                    .setColor("RED")
                    .setTitle(client.languages.__({phrase: 'help.atividades.title', locale: language}))
                    .setDescription(client.languages.__({phrase: 'help.atividades.des', locale: language}))
                    .setTimestamp()

                    .addField('\u200B','\u200B')
                    .addField('\`\`\`Youtube (ytt)\`\`\`', '*$youtube*', true)
                    .addField('\`\`\`Poker (-)\`\`\`', '*$poker*', true)
                    .addField('\`\`\`Betrayal (-)\`\`\`', '*$betrayal*', true)
                    .addField('\`\`\`Checkers (-)\`\`\`', '*$checkers*', true)
                    .addField('\`\`\`Chess (-)\`\`\`', '*$chess*', true)
                    .addField('\`\`\`Doodlecrew (doodle)\`\`\`', '*$doodle*', true)
                    .addField('\`\`\`Fishing (fish)\`\`\`', '*$fishing*', true)
                    .addField('\`\`\`Lettertile (letter)\`\`\`', '*$letter*', true)
                    .addField('\`\`\`Spellcast (spell)\`\`\`', '*$spellcast*', true)
                    .addField('\`\`\`Wordsnack (words)\`\`\`', '*$words*', true)
                    .addField('\u200B','\u200B')
                
                    .setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" });

                interaction.editReply({ embeds: [embed_4], components: [painel] });

            };
    
        })
    })
}}
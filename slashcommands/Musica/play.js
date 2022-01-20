const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    voiceChannel: true,
	data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Toca musicaaa")
        .addStringOption(option => option.setName("nome").setDescription("musica").setRequired(true)),

	async execute(client, interaction) {

        await interaction.deferReply({ephemeral:true})

        const voice = interaction.member.voice.channel
        const args = interaction.options.getString("nome")

        const embed = new MessageEmbed();
            embed.setTitle("")
            embed.setColor("RED")
            embed.setTimestamp()
            embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        if(!interaction.guild.me.permissionsIn(voice).has(['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD'])){
            embed.setTitle("")
            embed.setDescription(`Não tenho permissão para entrar no seu canal de voz ${interaction.member}... ❌`)
            return interaction.editReply({ embeds: [embed], ephemeral:true }).then(() => {
            }).catch(error => {
                console.log(`${interaction.member.id} - MISSING PERMISSIONS PLAY`);
            })
        }

        const res = await player.search(args, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) {
            embed.setDescription(`Sem resultados encontrados ${interaction.member}... ❌`) 
            embed.setTitle("")
            console.log(`Sem resultados de música encontrados para - ${args}`)
            return interaction.editReply({ embeds: [embed], ephemeral:true }).then(() => {
            }).catch(error => {
                console.log(`${interaction.member.id} - MISSING PERMISSIONS PLAY`);
            })

        }

        console.log(`${interaction.user.username} - USOU PLAY SLASH: ${args}`);

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        if (!queue.connection) await queue.connect(voice);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play(); 

        await interaction.editReply({content:'▶️ - Adicionada', ephemeral:true});
        
    },
};
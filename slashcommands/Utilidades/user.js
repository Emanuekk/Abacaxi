const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
	data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Mostra o perfil de usuário com informações gerais")
        .addUserOption(option => option.setName("membro").setDescription("O usuário que você quer ver os detalhes")),

	async execute(client, interaction) {

        const language = interaction.member.guild.lang

        const member = interaction.options.getMember("membro") || interaction.member
        const user = interaction.options.getUser("membro") || interaction.user

        console.log(`${interaction.user.username} - USOU USER SLASH`);
        
        const embed = new MessageEmbed();
        embed.setTitle(`${user.username}#${user.discriminator}`)
            .setColor(3447003)
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .addField(client.languages.__({phrase:'user.disc', locale:language}) , `${moment(user.createdAt).format('DD/MM/YYYY').toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`)
            .addField(client.languages.__({phrase:'user.serv', locale:language}) , `${moment(member.joinedAt).format('DD/MM/YYYY').toString().substr(0, 15)}\n(${moment(member.joinedAt).fromNow()})`)
            .addField("ID", `${user.id}`)
            .setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'})
            
        if(member.nickname) embed.setDescription(client.languages.__({phrase:'user.nick', locale:language},{ nickname: member.nickname}))
    
        interaction.reply({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS USERINFO`);
        })
	},
};
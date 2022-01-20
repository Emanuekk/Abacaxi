const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'avatar',
    description : "Mostra o avatar do perfil de quem usou ou de quem foi marcado",
    aliases: ['foto'],

    async execute(client, message, args) {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        const embed = new MessageEmbed()
        embed.setTitle(`📸 ${user.username}`)
        embed.setURL(user.avatarURL({size: 4096, dynamic: true, format: 'png' }))
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'})
        embed.setImage(user.displayAvatarURL({size:4096, dynamic: true}))
        embed.setTimestamp()

    console.log(`${message.author} - USOU AVATAR`);

    return message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS AVATAR`);
        })
    }
}
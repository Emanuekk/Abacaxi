const { MessageEmbed } = require('discord.js');
const guildModel = require('../../models/guild.js')
const moment = require('moment');

module.exports = {
    name : 'user',
    description : "Mostra o perfil de usuário com informacoes gerais",
    aliases: ['Userinfo'],

    async execute(client, message, args) {
        //const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        console.log(message.member.guild.id)

        let language;
        await guildModel.findOne({guildId: message.member.guild.id}).then((s, err) =>{
            if(err) return console.log(err)
    
            if(s){
                language = s.lang
            } else {
                language = 'pt'
            }
        })
        
        const marcado = message.mentions.members.first()
        let user
        let muser

        if(!message.mentions.users.first()) {
            user = message.author;
            muser = message.member;
        }
        else{
            user = message.mentions.users.first();
            muser = marcado;
        }

        console.log(`${user.username} - USOU USER`);

        const embed = new MessageEmbed();
        embed.setTitle(`${user.username}#${user.discriminator}`)
            .setColor(3447003)
            .setThumbnail(user.avatarURL())
            .setTimestamp()
            .addField(client.languages.__({phrase:'user.disc', locale:language}) , `${moment(user.createdAt).format('DD/MM/YYYY').toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`)
            .addField(client.languages.__({phrase:'user.serv', locale:language}) , `${moment(muser.joinedAt).format('DD/MM/YYYY').toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`)
            .addField("ID", `${user.id}`)
            .setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'})
            
        if(muser.nickname) embed.setDescription(client.languages.__({phrase:'user.nick', locale:language},{nickname:muser.nickname}))
    
        message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS USERINFO`);
        })
    }
}
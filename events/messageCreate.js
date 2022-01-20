const { MessageEmbed } = require('discord.js');
const guildModel = require('../models/guild.js')

module.exports = async (client, message) => {
    const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

    if (message.author.bot || message.channel.type === 'dm') return;

    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
        const command = 'help'
        const help = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        return help.execute(client, message);
    }

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0) return;

    const Guild = message.guildId

    await guildModel.findOne({guildId: message.guildId}).then((s, err) =>{
        if(err) return console.log(err)

        if(s){
            Guild.lang = s.lang
        } else {
            const newGuild = new guildModel({
                guildId: message.guildId.toString(),
                lang: 'pt'
            })
            newGuild.save().catch(e => console.log(e))
        }
    })

    if(!message.guild.me.permissionsIn(message.channel).has(['ADD_REACTIONS','SEND_MESSAGES','READ_MESSAGE_HISTORY','VIEW_CHANNEL']))
    {
        embed2.setDescription(`Olá ${message.author}, não vou conseguir processar seu comando agora, pois me faltam algumas das minhas principais permissões. Cheque se eu tenho permissões no CANAL para:\n\n• Adicionar Reações\n• Ler Histórico de Mensagem\n• Ver Canais\n• Conectar\n• Falar\n• Usar Detecção de Voz\n\nSe por um acaso eu tiver todas e isso ainda aparecer, contate meu dev com **$FeedBack**\n\n**Se você receber isso via DM, eu não consigo mandar mensagem no canal em que fui solicidado!**`)
        return message.channel.send({embeds:[embed2]}).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
        })
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd && cmd.voiceChannel) {
        if (!message.member.voice.channel){
            embed2.setDescription(`Você não está em um canal de voz ${message.author}... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
            })
        }

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            embed2.setDescription(`Você não está no mesmo canal de voz que eu ${message.author}! Eu sou apenas UM Abacaxi... ❌`)
            return message.channel.send({ embeds: [embed2]}).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
            })
        }
    }

    if (cmd) cmd.execute(client, message, args);
};
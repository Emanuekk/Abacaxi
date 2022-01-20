const { MessageEmbed } = require('discord.js')
require('dotenv').config();
const DevName = process.env.DevName;

module.exports = {
    name: 'about',
    aliases: ['sobre'],

    async execute(client, message) {

        const embed = new MessageEmbed();
        embed.setColor(0xFFFF00)
            .setThumbnail(client.user.avatarURL())
            .setTitle('**Informações**')
            .addField('**O Abacaxi:**', `O Abacaxi, saiu de uma ideia simples de se desafiar a fazer algo diferente, e nunca havia feito um bot antes, e apesar conhecer programação, eu nunca havia programado em JavaScript antes. O nome surgiu de um Nick muito antigo que usava em jogos... **"AbacaxiBR"**`)
            .addField('**O Criador:**', `O Criador, **${DevName}**, tem 21 anos, e busca sempre tirar do papel ideias que as vezes nem ele mesmo acredita. Me criar, está dando a ele muitos dias de dedicação ~~(e um pouquinho de dor de cabeça)~~`)
            .addField('**O Objetivo:**', `O Objetivo é conseguir me manter online, já que a hospedagem é paga e mesmo na Discloud, com os menores valores que mantém o bot online, ainda são custosos. Futuramente penso em evoluir os comandos do Abacaxi, colocando novos comandos e em algum futuro (provávelmente distante), remover as músicas... Infelizmente eu não quero que o Abacaxi acabe como tantos bots de música!`)
            .addField('**Upvote**',`Se você quiser me ajudar, você pode me dar upvote [AQUI](https://discordbotlist.com/bots/abacaxi), eu aprecio`)
            .addField('**Contato:**',`Se por algum motivo, você ainda quiser ajudar mais, você pode me enviar um **$FeedBack**, ou entrar em contato pelo Discord`)
            .setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'})
            .setTimestamp()
        
        console.log(`${message.author} - USOU ABOUT`);

        message.channel.send( {embeds: [embed]} ).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS ABOUT`);
        })
    }
}
const { MessageEmbed } = require('discord.js');
require ('dotenv').config();

module.exports = {
    name: "feedback",
    aliases: ['bug','feed'],
    description: "Comando que reporta um feedback ou erro, diretamente ao servidor de suporte",

    async execute(client, message, args) {

        const embed = new MessageEmbed()
            embed.setColor("DARK_BUT_NOT_BLACK")
            embed.setTimestamp()
	        embed.setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" })


        if(!args[0]){
            embed.setDescription('Por favor, tente novamente e adicione a razão do feedback/bug na frente do comando! ❌') 
            return message.channel.send({ embeds: [embed] }).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS FEEDBACK`);
            })
        }

        const content = args.join(" ");
        embed.setDescription(`✉ | ${message.author.username}, obrigado pelo feedback ou BUG report! :)`) 
        await message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS FEEDBACK`);
        })

        embed.setColor("DARK_BUT_NOT_BLACK")
        embed.setDescription("")
        embed.setTitle(`🚫 Novo Erro ou Feedback!`)
        embed.addField("👤 Usuário", `${message.author}`, true)
        embed.addField("🌐 Server", `${message.guild.name}`,true)
        embed.addField('\u200b', '\u200b',true)
        embed.addField("🔒 ID", `${message.author.id}`, true)
        embed.addField("🔒 Server ID", `${message.guild.id}`, true)
        embed.addField("📢 Reportou:", `${content}`)
        embed.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        embed.addField('\u200b', '\u200b')
        embed.setTimestamp()
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: "https://i.imgur.com/hxIsrRC.png" })

        const ID = process.env.feedbackId

        console.log(`${message.author} - USOU FEEDBACK`);
        
        client.channels.cache.get(ID).send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS AO TENTAR RECEBER FEEDBACK`);
        })
    }
}
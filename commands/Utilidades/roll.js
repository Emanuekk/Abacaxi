const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'roll',
    aliases: [],

    async execute(client, message){

        console.log(`${message.author.username} - CAIU NO RICK ROLLING`);

        const embed = new MessageEmbed()
            .setTitle("Rick...")
            .setImage("https://media.giphy.com/media/Ju7l5y9osyymQ/giphy.gif")
            .setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'})
            .setTimestamp()
        
        message.channel.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS RICKROLLING F`);
        })
    }
}
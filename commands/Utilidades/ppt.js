const guildModel = require('../../models/guild.js')

module.exports = {
    name: 'ppt',
    aliases: ['rps'],
    utilisation: '{prefix}help',

    async execute(client, message, args) {

        let language;
        await guildModel.findOne({guildId: message.member.guild.id}).then((s, err) =>{
            if(err) return console.log(err)
    
            if(s){
                language = s.lang
            } else {
                language = 'pt'
            }
        })

        console.log(`${message.author.username} - USOU PTT`);

        let choice = args.join(" ").toLowerCase();

        if (choice === '') {

            return message.reply(`\`\`\`${client.languages.__({phrase:'ppt', locale:language})}\`\`\``).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PPT`);
            })
        }

        if (language == "pt" && choice !== "pedra" && choice !== "papel" && choice !== "tesoura") {

            return message.reply(`\`\`\`Por favor, especifique pedra, papel ou tesoura. ${choice} não é uma opção :P\`\`\``).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PPT`);
            })
        }

        if (language == "en" && choice !== "rock" && choice !== "paper" && choice !== "scissors") {

            return message.reply(`\`\`\`Please specify rock, paper or scissors. ${choice} is not an option :P\`\`\``).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS PPT`);
            })
        }

        message.reply(`\`\`\`${random()}\`\`\``).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS PPT`);
        })
    }
}

function random() { 

    let rps = [
        "** 📝 **", 
        "** ⛰️ **", 
        "** ✂️ **"
    ]
    return `${rps[Math.floor(Math.random() * rps.length)]}` 
}
module.exports.random = random
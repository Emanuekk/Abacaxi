require ('dotenv').config();

module.exports = {
    name: 'guilds',
    aliases: [''],
    utilisation: '{prefix}guilds',
    showHelp: false,

    async execute(client, message) {

        const OwnerID = process.env.botOwnerID
        if(message.author.id != OwnerID) return console.log(`${message.author.id} - TENTOU GUILDS`)
        
        const time = Date.now();
        const hora = new Date(time);
        date = (hora.getHours()-3) + ":" + hora.getMinutes();
        
        console.log( date );
        message.channel.send('Abacaxi!')
        console.log(`=====================================Preparado em ${client.guilds.cache.size} servidores, para ${client.users.cache.size} usuários=========================================================`), console.log(client.guilds.cache.map((guild) => guild.name).join(' ||| '))
    }
}
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async (client) => {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const mongo = process.env.mongoDB;

    console.log(`=============================================== Conectando a Data Base ===================================================================`);

    if(!mongo) return console.log('Não conectado ao MongoDB!\n\n');

    await mongoose.connect(mongo,
    {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology:true

    }).then(() => {
        console.log('✅ -> Conectado com sucesso ao MongoDB!\n')
    }).catch((err) => {
        console.log(err)
    })

    console.log(`================================ Online ${today.toUTCString()} com ${client.user.username} ====================================================\n===================================== Preparado em ${client.guilds.cache.size} servidores, para ${client.users.cache.size} usuários =========================================================\n`);
    
    const activity = [
        { type: 'PLAYING',  message: 'Abacaxi🍍'  },
        { type: 'LISTENING', message: '$Help 📖' },
    ];
        
    setInterval(() => {
        const index = Math.floor(Math.random() * (activity.length));
    
        client.user.setActivity(activity[index].message, { type: activity[index].type });
    }, 600000);

    console.log(client.guilds.cache.map((guild) => guild.name).join(' ||| '))

}
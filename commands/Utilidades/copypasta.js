const copypastas = require('../../data/copypasta.json');

module.exports = {
    name: 'copypasta',
    aliases:['zap'],
    description: 'Sends a random copypasta.',
    category: "Useful",
    usage: 'copypasta',
    
    async execute (client, message) {

        console.log(`${message.author} - USOU COPYPASTA`);
    
        message.channel.send(`\`\`\`${copypastas[Math.floor(Math.random() * copypastas.length)]}\`\`\``).then(() => {
        }).catch(error => {
            console.log(`${message.author.id} - MISSING PERMISSIONS COPYPASTA`);
        })
    }
}

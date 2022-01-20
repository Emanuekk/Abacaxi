const ms = require('ms');

module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'Mostra o ping do bot em relação a você',
    utilisation: '{prefix}ping',

    async execute(client, message) {

        console.log(`${message.author} - USOU PING`);

        return message.channel.send(`\`\`\` Seu ping atual para o bot é **${client.ws.ping}ms** 🛰️ \`\`\``).then(() => {
      }).catch(error => {
          console.log(`${message.author.id} - MISSING PERMISSIONS PING`);
      })
    },
};
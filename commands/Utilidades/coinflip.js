module.exports = {
  name : 'coinflip',
  description : "Gira uma moeda, cara ou coroa?",
  aliases: ['cf'],

  async execute(client, message){

    let random = (Math.floor(Math.random() * Math.floor(2)));

    console.log(`${message.author} - USOU COINFLIP`);

    if(random === 0) {

      message.channel.send(`\`\`\`Cara!\`\`\``).then(() => {
      }).catch(error => {
          console.log(`${message.author.id} - MISSING PERMISSIONS COINFLIP`);
      })
    }

    else {

      message.channel.send(`\`\`\`Coroa!\`\`\``).then(() => {
      }).catch(error => {
          console.log(`${message.author.id} - MISSING PERMISSIONS COINFLIP`);
      })
    }
  }
}
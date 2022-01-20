module.exports = {
    name: 'wordsnack',
    aliases: ['words'],

    async execute(client, message) {

        console.log('Atividade Wordsnack criada!')

        if(message.member.voice.channel) {

            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'wordsnack').then(async invite => {

                return message.channel.send(`Clique no **LINK AZUL** a seguir para entrar: ${invite.code}`).then(() => {
                }).catch(error => {
                    console.log(`${message.author.id} - MISSING PERMISSIONS CHESS`);
                })
            });
        } else{
            return message.channel.send(`Você deve estar em um canal de Voz para criar o convite`).then(() => {
            }).catch(error => {
                console.log(`${message.author.id} - MISSING PERMISSIONS CHESS`);
            })
        }
    }
}

const {MessageEmbed} = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'stats',
    aliases: [''],
    description: 'Stats Bot',
    showHelp: false,

    async execute(client, message) {

        const OwnerID = process.env.botOwnerID
        if(message.author.id != OwnerID) return console.log(`${message.author.id} - TENTOU STATS`)

        // Aqui importamos o axios para fazer o trabalho duro
        const axios = require('axios')

        // Aqui mandamos uma mensagem enquanto o bot pega todas as informações
        const msg = await message.reply('Obtendo os dados necessários...')

        SuperSecretoTokenDaAPI= process.env.Discloud

        // Aqui colocamos todas as informações do bot dentro da variável "BotInfo" para ficar mais fácil de pegar todas as informações
        const info = (await axios.get(`https://discloud.app/status/bot/${client.user.id}`, {
            headers: { // PRESTA ATENÇÃO! Na URL ^^^^^^ você DEVE colocar o ID do seu bot. o termo ${client.user.id} ou ${bot.user.id} já faz o trabalho pra você
                "api-token": `${SuperSecretoTokenDaAPI}` // Você pode pegar o seu token usando o comando .api nos canais de comandos da Discloud
            }
        })).data

        // Mesma coisa do bot, só muda que é do usuário (você)
        const user = (await axios.get('https://discloud.app/status/user', {
            headers: { // Para as informações do usuário, não é necessário mexer na URL passada acima, não se preocupe.
                "api-token": `${SuperSecretoTokenDaAPI}`
            }
        })).data

        // Após todos os dados serem carregados, mandamos a nossa linda embed com todos os dados.
        return msg.edit({
            content: `Sucesso`,
            embeds: [
                new MessageEmbed()
                    .setColor(client.blue)
                    .setDescription(`Discloud Host Information`)
                    .addFields(
                        {
                            name: `Bot Stats`,
                            value: `> Bot: ${client.users.cache.get(info?.bot_id)?.tag || "Não encontrado"} \`${info?.bot_id || 'Indefinido'}\`\n> Plano: ${user.pan}`
                        },
                        {
                            name: 'container',
                            value: `> ${info.container === 'Online' ? `🟢 Online` : `🔴 Offline`}`
                        },
                        {
                            name: 'Cpu Usage',
                            value: `> ${info.cpu}`
                        },
                        {
                            name: `Ram Memory Usage`,
                            value: `> ${info.memory}`
                        },
                        {
                            name: `Last Discloud Restart`,
                            value: `> ${info.last_restart}`
                        }
                    )
            ]
        }).catch(() => { })

    }
}
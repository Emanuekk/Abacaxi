const { MessageEmbed, VoiceState } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Erro emitido da fila ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Erro emitido de conexão ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;

    const embed = new MessageEmbed();

        embed.setColor("BLUE");
        embed.setTitle(`${track.title}`)
        embed.setDescription(`Começou a tocar no **${queue.connection.channel.name}** 🎧`);

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return queue.metadata.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), queue.current.durationMS)
        }).catch(error => {
            console.log(`Erro ao comecar a tocar: ${error}`)
            return queue.destroy();
        })
});

player.on('trackAdd', (queue, track) => {
    const embed = new MessageEmbed();

        embed.setColor('NAVY');
        embed.setTitle(`${track.title}`)
        embed.setDescription(`Adicionada a fila! Aguarde... 🌐`);

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return queue.metadata.send({ embeds: [embed] }).then(msg => {
            setTimeout(() => msg.delete(), 30000)
        }).catch(error => {
            console.log(`Erro ao adicionar música: ${error}`)
            return queue.destroy();
        })
});

player.on('botDisconnect', (queue) => {
    const embed = new MessageEmbed();

        embed.setColor('BLACK');
        embed.setTitle('Fui desconectado manualmente do canal de voz, limpando a fila... ❌');

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return queue.metadata.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`Erro ao ser desconectado: ${error}`)
            return
        })
});

player.on('channelEmpty', (queue) => {
    const embed = new MessageEmbed();

        embed.setColor('BLACK');
        embed.setTitle('Ninguém está no canal de voz, saindo do canal... ❌');

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return queue.metadata.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`Erro com canal vazio: ${error}`)
            return
        })
});

player.on('queueEnd', (queue) => {
    const embed = new MessageEmbed();

        embed.setColor('BLACK');
        embed.setTitle('Vejo você uma próxima vez! 🥺');

        embed.setTimestamp();
        embed.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

        return queue.metadata.send({ embeds: [embed] }).then(() => {
        }).catch(error => {
            console.log(`Erro ao terminar de tocar: ${error}`)
            return
        })
});
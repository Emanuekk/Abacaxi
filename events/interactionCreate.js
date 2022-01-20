const guildModel = require('../models/guild.js')

const { MessageEmbed } = require('discord.js');

module.exports = async (client, interaction) => {
    const embed2 = new MessageEmbed();
            embed2.setColor('RED');
            embed2.setTimestamp();
            embed2.setFooter({ text: "Abacaxi 🍍", iconURL: 'https://i.imgur.com/hxIsrRC.png'});

    if (!interaction.isCommand()) return;

    const Guild = interaction.member.guild

    await guildModel.findOne({guildId: interaction.guildId}).then((s, err) =>{
        if(err) return console.log(err)

        if(s){
            Guild.lang = s.lang
        } else {
            const newGuild = new guildModel({
                guildId: interaction.guildId.toString(),
                lang: 'pt'
            })
            newGuild.save().catch(e => console.log(e))
        }
    })

    if(!interaction.guild.me.permissionsIn(interaction.channel).has(['ADD_REACTIONS','SEND_MESSAGES','READ_MESSAGE_HISTORY','VIEW_CHANNEL']))
    {
        embed2.setDescription(`Olá ${interaction.author}, não vou conseguir processar seu comando agora, pois me faltam algumas das minhas principais permissões. Cheque se eu tenho permissões no CANAL para:\n\n• Adicionar Reações\n• Ler Histórico de Mensagem\n• Ver Canais\n• Conectar\n• Falar\n• Usar Detecção de Voz\n\nSe por um acaso eu tiver todas e isso ainda aparecer, contate meu dev com **$FeedBack**\n\n**Se você receber isso via DM, eu não consigo mandar mensagem no canal em que fui solicidado!**`)
        return interaction.reply({embeds:[embed2]}).then(() => {
        }).catch(error => {
            console.log(`${interaction.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
        })
    }

    const slashCommand = client.slashCommands.get(interaction.commandName); //get the command name from collection
    if(!slashCommand) return //if no slash cmd name then return

    if (slashCommand && slashCommand.voiceChannel) {
        if (!interaction.member.voice.channel){
            embed2.setDescription(`Você não está em um canal de voz ${interaction.member}... ❌`)
            return interaction.reply({ embeds: [embed2] , ephemeral:true }).then(() => {
            }).catch(error => {
                console.log(`${interaction.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
            })
        }

        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id){
            embed2.setDescription(`Você não está no mesmo canal de voz que eu ${interaction.member}! Eu sou apenas UM Abacaxi... ❌`)
            return interaction.reply({ embeds: [embed2] , ephemeral:true }).then(() => {
            }).catch(error => {
                console.log(`${interaction.author.id} - MISSING PERMISSIONS SEND MESSAGE`);
            })
        }
    }

    try{
        await slashCommand.execute(client, interaction) //execute the command 
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({ content: 'There was an error!', ephemeral: true })
    }
};
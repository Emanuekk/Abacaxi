const { Player } = require('discord-player');
const { Client, Intents } = require('discord.js');
const { DiscordTogether } = require('discord-together');
const i18n = require('i18n');
const { join } = require('path');
require ('dotenv').config();

global.client = new Client({
    messageCacheMaxSize: 50,
	messageCacheLifetime: 300,
    intents: [
        Intents.FLAGS.GUILDS,
        //Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    disableMentions: 'everyone',
});

client.languages = require('i18n')
client.config = require('./config');
client.discordTogether = new DiscordTogether(client);

client.languages.configure({
    locales:['pt', 'en'],
    directory: join(__dirname, "locales"),
    defaultLocale: 'pt',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn: function (msg) {
        console.log('WARN'+ msg)
    },

    logErrorFn: function (msg) {
        console.log('ERROR'+ msg)
    },

    missingKeyFn: function (locale, value) {
        return value
    },

    mustacheConfig:{
        tags:["{{", "}}"],
        disable: false
    }
})

console.log(`\n======================================================== Starting =======================================================================`);

process.on('unhandledRejection', err => {
    console.log(err);
});

global.player = new Player(client, client.config.opt.discordPlayer);

require('./aloader/loader');
require('./aloader/events');

client.login(process.env.TOKEN);
const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

client.commands = new Collection();
client.slashCommands = new Collection();

const token = process.env.TOKEN;
const guild = process.env.guild;
const application_id = process.env.botID;

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`\n=================================================== Carregando Eventos ==================================================================`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`✅ -> Evento carregado: ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

console.log(`\n================================================== Carregando Comandos ==================================================================`);

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`../commands/${dirs}/${file}`);
        console.log(`✅ -> Comando carregado: ${command.name.toLowerCase()}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
    };
});

console.log(`\n============================================== Carregando Slash Comands =================================================================`);

const slashCommands = []; //make a variable

readdirSync('./slashCommands/').forEach(dir => {
    const slashCommandFiles = readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const slashCommand =require(`../slashCommands/${dir}/${file}`);
        slashCommands.push(slashCommand.data.toJSON());
        if(slashCommand.data.name) { //if the slash command file has a name
            client.slashCommands.set(slashCommand.data.name, slashCommand)
            console.log('✅ -> SlashCommand carregado:', slashCommand.data.name) //check if the file load and log in console
        } else {
            console.log('❌ -> Erro no SlashCommand:', slashCommand.data.name) //if the file doesn't have command name, log it error in console
        }
    }
});

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		//console.log('Comecou a registrar Slash (/) Commands.');

		await rest.put(
			Routes.applicationGuildCommands(application_id, guild),
			{ body: slashCommands },
		);

		console.log('\n✅ -> SlashCommands Registrados!\n');
	} catch (error) {
		console.error(error);
	}
})();
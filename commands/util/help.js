const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	
        let prefixes = JSON.parse(fs.readFileSync("../../prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
      }

    let prefix = prefixes[message.guild.id].prefixes;

        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:\n');
            data.push(commands.map(command => command.help.name).join(' - description here\n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type == 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

	
		data.push(`**Command:** ${command.help.name}\n`);

		if (command.help.aliases) data.push(`**Aliases:** ${command.help.aliases.join(', ')}`);
		if (command.help.description) data.push(`**Description:** ${command.help.description}\n`);
		if (command.help.usage) data.push(`**Usage:** ${prefix}${command.help.usage}`);
                if (command.help.example) data.push(`**Example:** ${prefix}${command.help.example}\n`);
		if (command.help.category) data.push(`**Category:** ${command.help.category}`);

		message.channel.send(data, { split: true });
    }

    module.exports.help = {
    name: "help",
    aliases: [
            "h",
            "cmd"
    ]
  }

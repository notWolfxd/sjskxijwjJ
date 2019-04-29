const Discord = require("discord.js");
const config = require("../config.json");
const fs = require("fs");

module.exports = async(client, message) => {


 //   var tkn = "client.token,token".split(",");
 //   for (i=0;i<tkn.length;i++) {
 //       if (message.content.toLowerCase().includes(tkn[i])) {
 //  
 //         return;
 //       }
 //   }
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
      }

    let prefix = prefixes[message.guild.id].prefixes;
   
    
let args = message.content.slice(prefix.length).trim().split(/ +/g);
let cmd = args.shift().toLowerCase();
let command;

if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
} else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
}

    if (!message.content.startsWith(prefix)) return;

    if (command) {
    
        if (message.author.id == config.owner) return message.channel.send(`${message.author.username} Sorry the command has been Disabled!!`);
    }
try {
    command.run(client, message, args, prefix);

} catch (e) {
}

};

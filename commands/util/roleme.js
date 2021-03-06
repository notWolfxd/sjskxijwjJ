const { RichEmbed } = require("discord.js");
const config = require("../../config.json");
const { stripIndents } = require("common-tags");

module.exports.run = async (client, message, args) => {
    
  const helpEmbed = new RichEmbed()
    .setColor("#f4392b")
    .setThumbnail(message.author.avatarURL)
    .addField("**__Command:__** RoleMe", stripIndents`**Description:** Gives you a role of your choice.
    **Usage:** -roleme <Role>
    **Example:** -roleme factions`)
    .setFooter(`${config.version} | Made By: Wolf#9001`, client.user.avatarURL)

    let role = args[0];
    let facsrole = message.guild.roles.find(r => r.id === "556189435796914204");
    let sbrole = message.guild.roles.find(r => r.id === "556189434672971777");
    let prisonrole = message.guild.roles.find(r => r.id === "556189416172027910");
    let colourrole = message.guild.roles.find(r => r.id === "566689848979619860");
    let member = message.member;
    
  if (!role) 
     return message.channel.send(helpEmbed);
  if (args[0].toLowerCase() != "factions" && args[0].toLowerCase() != "prison" && args[0].toLowerCase() != "skyblock" && args[0].toLowerCase() != "colour") 
     return message.channel.send(helpEmbed);
    
  if (args[0].toLowerCase() == "factions" && !member.roles.has(facsrole)) {
        await member.addRole(facsrole);
        await message.channel.send("Gave you the `Factions` role!");
        }
  if (args[0].toLowerCase() == "factions" && member.roles.has(facsrole))  {
        await member.removeRole(facsrole);
        await message.channel.send("Removed the `Factions` role from you!");
        }
  if (args[0].toLowerCase() == "colour" && !member.roles.has(566689848979619860)) {
        await member.addRole(colourrole);
        await message.channel.send("Gave you the `Colour` role!");
        } else if (args[0].toLowerCase() == "colour" && member.roles.has(566689848979619860)) {
        await member.removeRole(colourrole);
        await message.channel.send("Removed the `Colour` role from you!");
        }
  if (args[0].toLowerCase() == "skyblock" && !member.roles.has(556189434672971777)) {
        await member.addRole(sbrole);
        await message.channel.send("Gave you the `SkyBlock` role!");
        } else if (args[0].toLowerCase() == "skyblock" && member.roles.has(556189434672971777)) {
        await member.removeRole(sbrole);
        await message.channel.send("Removed the `SkyBlock` role from you!");
        }
  if (args[0].toLowerCase() == "prison" && !member.roles.has(556189416172027910)) {
        await member.addRole(prisonrole);
        await message.channel.send("Gave you the `Prison` role!");
        } else if (args[0].toLowerCase() == "prison" && member.roles.has(556189416172027910)) {
        await member.removeRole(prisonrole);
        await message.channel.send("Removed the `Prison` role from you!");
        }
  }

module.exports.help = {
    name: "roleme",
    aliases: [ "iam", "iamnot", "iamn", "selfassign" ],
    description: "Give yourself a self assignable role.",
    usage: "roleme <Role>",
    example: "roleme colour",
    category: "Util"
}

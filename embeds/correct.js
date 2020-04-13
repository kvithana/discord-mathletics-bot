const Discord = require('discord.js');

module.exports = (user) => {
	const embed = new Discord.MessageEmbed();
	embed.setColor('#27ae60');
	embed.setTitle(`${user} 👌`);
	embed.setAuthor('Mathletics');
	return embed;
};
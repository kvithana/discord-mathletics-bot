const Discord = require('discord.js');

module.exports = (leaderboard, count, countCap) => {
	let embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Leaderboard')
		.setAuthor('Mathletics')
		.setDescription(`${count} questions completed of ${countCap}.`);
	leaderboard.map(v => {
		embed = embed.addField(v[0], `${'\\|'.repeat(v[1])} [${v[1]}]`);
	},
	);

	return embed;
};
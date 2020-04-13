const Discord = require('discord.js');


module.exports = (question, count, countCap, user, incorrect) => {
	let embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(question)
		.setAuthor('Mathletics')
		.setDescription(`Question ${count + 1} of ${countCap}.`);
	if (user) {
		embed = embed.addField('First Correct', `${user} 👌`);
	}
	if (Array.from(incorrect).length) {
		embed = embed.addField('Incorrect', Array.from(incorrect).concat(['']).join(' -1\n'));
	}
	return embed;
};
const Discord = require('discord.js');


module.exports = (question, count, countCap, user, incorrect) => {
	let embed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(question)
		.setAuthor('Mathletics');
	if (!isNaN(count) && countCap) {
		embed = embed.setDescription(`Question ${count + 1} of ${countCap}.`);
	}
	if (user) {
		embed = embed.addField('First Correct', `${user} 👌`, true);
	}
	if (incorrect && Array.from(incorrect).length) {
		embed = embed.addField('Incorrect', Array.from(incorrect).concat(['']).join(' 🔽\n'), true);
	}
	return embed;
};
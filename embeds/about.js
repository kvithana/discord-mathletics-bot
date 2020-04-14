const Discord = require('discord.js');

module.exports = () => {
	return new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Mathletics Bot Help')
		.setAuthor('Mathletics')
		.setDescription('How to use me:')
		.addField('Command', '`$mathletics [force] <no. questions> <operations>`\
        \n eg. `$mathletics 20 + -`')
		.addField('Current Question', 'Get the current question with `$mathletics question`')
		.addField('Supported Operations',
			'Currently, the operations supported are:\n\
        - `+` Addition\n\
        - `-` Subtraction\n\
        - `*` Multiplication (up until 12 x 12)\n\
        - `/` Division (up until 144 / 12)\n\
        - `%` Modulo\n\
        - `//` Integer Division\n\
        ')
		.addField('Forcing A New Game', 'If a game is currently in progress and you want to start a new one,\
        you can use `force`')
		.setFooter('Created by @_kalpal');
};
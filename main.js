const Discord = require('discord.js');
const GameMaster = require('./services/gamemaster');

// import embeds
const Leaderboard = require('./embeds/leaderboard');
const Question = require('./embeds/question');
const Correct = require('./embeds/correct');
// import environment variables
require('dotenv').config();

// initialise Discord client
const client = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

// initialise Mathletics GameMaster
const GM = new GameMaster();

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
	if (message.member.displayName === 'JimmyNutron') {
		return message.channel.send('Fuck you Jimmy Nuttron.');
	}
	if (message.content.match(/^\$mathletics .*/)) {
		let forceNew = false;
		let params = message.content.split(' ').slice(1);
		console.log('params', params);
		if (params[0] === 'force') {
			forceNew = true;
			params = params.slice(1);
		}
		let numQuestions;
		try {
			numQuestions = parseInt(params[0]);
		}
		catch (e) {
			return message.channel.send('No question count provided.');
		}
		if (!params.length) {
			return message.channel.send('No parameters provided.');
		}
		const ops = params.slice(1);
		console.log('ops', ops);
		if (!ops.length) {
			return message.channel.send('No operations provided.');
		}
		if(!ops.every((op => ['+', '-', '*', '/', '%', '//'].includes(op)))) {
			return message.channel.send('Invalid operations.');
		}
		if (GM.isRunning && !forceNew) {
			return message.channel.send('Mathletics game in progress.');
		}

		GM.createGame(ops, numQuestions);
		message.channel.send('New Mathletics game.');
		message.channel.send(Question(GM.getCurrentQuestion(), GM.currentCount, GM.countCap, null, GM.getIncorrect()));
	}
	if (GM.isRunning) {
		if (message.content.match(/^-?\d+$/)) {
			const response = parseInt(message.content);
			const isCorrect = GM.submit(message.member.displayName, response);
			if (isCorrect && GM.isRunning) {
				setTimeout(() => message.channel.send(Question(GM.getCurrentQuestion(), GM.currentCount, GM.countCap, message.member.displayName, GM.getIncorrect())), 1000) ;
			}
		}
		if (!GM.isRunning) {
			GM.printLeaderboard = false;
			message.channel.send(Leaderboard(GM.getLeaderboard(), GM.currentCount, GM.countCap));
		}
	}

});
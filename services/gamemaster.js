const _ = require('lodash');
const Mathletics = require('./mathletics');

class GameMaster {
	constructor() {
		this.isRunning = false;
		this.incorrect = [new Set()];
	}

	createGame(ops, countCap, mlOpts = {}) {
		console.log('Creating game.');
		if (!this.isRunning) {
			this.ml = new Mathletics(ops, mlOpts);
			this.countCap = countCap;
			this.currentCount = 0;
			this.leaderboard = {};
			this.isRunning = true;
			this.printLeaderboard = false;
			this.lastCorrect = 0;
			console.log('Created game.');
		}
		else {
			throw Error('Game already running.');
		}

	}

	getCurrentQuestion() {
		return this.ml.currentQuestion.string;
	}

	getLeaderboard() {
		return Object.entries(this.leaderboard).sort((a, b) => (a[1] < b[1]));
	}

	getIncorrect() {
		console.log(this.incorrect);
		return this.incorrect.slice(-2)[0];
	}

	next() {
		if (++this.currentCount < this.countCap) {
			this.lastCorrect = this.ml.currentQuestion.solution;
			this.incorrect.push(new Set());
			this.ml.nextQuestion();
			this.printLeaderboard = this.currentCount % 5 === 0;
		}
		else {
			this.isRunning = false;
		}
	}

	submit(user, response) {
		if (this.ml.checkSolution(response)) {
			if (!_.get(this.leaderboard, user, false)) {
				_.set(this.leaderboard, user, 1);
			}
			else {
				_.set(this.leaderboard, user, this.leaderboard[user] + 1);
			}
			this.next();
			return true;
		}
		else {
			if (!(response === this.lastCorrect)) {
				if (!_.get(this.leaderboard, user, false)) {
					_.set(this.leaderboard, user, 0);
				}
				else {
					_.set(this.leaderboard, user, Math.min(0, this.leaderboard[user] - 1));
				}
				this.incorrect[this.currentCount].add(user);
			}
			return false;
		}

	}
}

module.exports = GameMaster;
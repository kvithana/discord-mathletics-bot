/**
 * Mathletics service provider.
 */

const _ = require('lodash');

// Operations
const add = (a) => (b) => a + b;
const sub = (a) => (b) => a - b;
const mult = (a) => (b) => a * b;
const div = (a) => (b) => a / b;
const mod = (a) => (b) => a % b;
const intDiv = (a) => (b) => Math.floor(a / b);

const operations = {
	'+' : {
		char: '+',
		func: add,
		isValid: () => true,
		create: (a, b) => [a, b, add(a)(b)],
	},
	'-' : {
		char: '-',
		func: sub,
		isValid: () => true,
		create: (a, b) => [a, b, sub(a)(b)],
	},
	'*' : {
		char: '×',
		func: mult,
		isValid: x => x < 13,
		create: (a, b) => [a, b, mult(a)(b)],
	},
	'/' :{
		char: '÷',
		func: div,
		isValid: x => x < 13,
		create: (a, b) => [mult(a)(b), a, b],
	},
	'%' :{
		char: '%',
		func: mod,
		isValid: x => x < 13 && x != 1,
		create: (a, b) => {
			const m = Math.min(1, Math.floor(Math.random() * b));
			return [mult(a)(b) + m, a, mod((mult(a)(b) + m))(a)];
		},
	},
	'//' :{
		char: '//',
		func: intDiv,
		isValid: x => x < 13 && x != 1,
		create: (a, b) => {
			const m = Math.min(Math.floor(Math.random() * a));
			return [mult(a)(b) + m, a, m];
		},
	},
};

class Mathletics {
	constructor(ops, options) {
		this.maxInt = options.maxInt || 20;
		this.operations = ops.map(op => operations[op]);
		this.currentQuestion = this.createQuestion();
		console.log('Created Mathletics instance.');
	}

	createQuestion() {
		const op = _.sample(this.operations);
		console.log('op', op);
		const opNums = this.getExpressionNumbers(op);
		const expNums = op.create(...opNums);
		console.log('expNums', expNums);
		const question = {
			string: `${expNums[0]} ${op.char} ${expNums[1]} = ?`,
			solution: expNums[2],
		};
		return question;
	}

	checkSolution(soln) {
		/**
         * Check if a given solution is correct.
         */
		return soln === this.currentQuestion.solution;
	}

	nextQuestion() {
		/**
         * Returns the next prompt as a string.
         */
		const next = this.createQuestion();
		this.currentQuestion = next;
		return next.string;
	}

	getExpressionNumbers(op) {
		/**
         * Create valid question numbers for a given operation.
         */
		let a, b;
		do {
			a = Math.ceil(Math.random() * this.maxInt);
			b = Math.ceil(Math.random() * this.maxInt);
		} while (!(op.isValid(a) && op.isValid(b)));
		return [a, b];
	}


}

module.exports = Mathletics;
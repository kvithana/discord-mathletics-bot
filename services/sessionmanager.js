const _ = require('lodash');
const GameMaster = require('./gamemaster');

class SessionManager {
	constructor() {
		this.sessions = {};
	}

	getSession(channel) {
		const session = _.get(this.sessions, channel, false);
		if (!session) {
			const newSession = new GameMaster();
			_.set(this.sessions, channel, newSession);
			return newSession;
		}
		else {
			return session;
		}
	}
}

module.exports = SessionManager;
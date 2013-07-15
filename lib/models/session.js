var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Trace Schema
 * @type {Schema}
 */
var SessionSchema = new Schema({
	sessionId: { type: String, default: '' },
	createAt: { type: Date, default: new Date() }
});

/**
 * Validations
 */

/**
 * Methods
 */
SessionSchema.methods = {

	add: function (sessionId, callback) {

		this.sessionId = sessionId;
		this.save(callback);

	}

};

/**
 * Statics
 */
SessionSchema.statics = {

	list: function (options, callback) {

		var criteria = options.criteria || {};

		this.find(criteria)
			.sort({'createAt': -1})
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(callback);

	}

};

console.log('weee');
mongoose.model('Session', SessionSchema);



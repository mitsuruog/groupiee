var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Trace Schema
 * @type {Schema}
 */
var TraceSchema = new Schema({
	sessionId: { type: String, default: '' },
	type: { type: String, default: '' },
	position: {
		x: { type: Number, default: 0 },
		y: { type: Number, default: 0 }
	},
	image: { type: String, default: '' },
	createAt: { type: Date, default: new Date() }
});

/**
 * Validations
 */

/**
 * Methods
 */
TraceSchema.methods = {

	addMousePosition: function (sessionId, position, callback) {

		this.sessionId = sessionId;
		this.type = 'mouse position';
		this.position.x = position.x;
		this.position.y = position.y;

		this.save(callback);

	},

	addClickPosition: function (sessionId, position, callback) {

		this.sessionId = sessionId;
		this.type = 'click position';
		this.position.x = position.x;
		this.position.y = position.y;

		this.save(callback);

	},

	addScreenImage: function (sessionId, imageDataUri) {

		this.sessionId = sessionId;
		this.type = 'image';
		this.image = imageDataUri;

		this.save(callback);

	}

};

/**
 * Statics
 */
TraceSchema.statics = {

	list: function (options, callback) {

		var criteria = options.criteria || {};

		this.find(criteria)
			.sort({'createAt': -1})
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(callback);

	}

};

mongoose.model('Trace', TraceSchema);



var mongoose = require('mongoose');

var flightBookingschema = new mongoose.Schema({
	userId : {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	fligtId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'flightDetails'
	},
	location: {
		location_1: String,
		location_2: String
	},
	time: { type: Date },
	maxPrice: Number,
	maxBudget: Number,
	status: Boolean

})

module.exports = mongoose.model('flightDetails', flightDetailsschema);

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CodeSessionSchema = new Schema({
	users: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'users',
				required: true
			},
			name: {
				type: String,
				required: true
			}
		}
	],
	data: {
		type: [String]
	},
	sessionId: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
})

const CodeSession = mongoose.model('CodeSession', CodeSessionSchema)

module.exports = CodeSession
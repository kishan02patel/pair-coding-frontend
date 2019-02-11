const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.Promise = global.Promise

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		enum: ['admin', 'user', 'moderator'],
		required: true,
		default: 'user'
	}
})

const User = mongoose.model('users', userSchema)

module.exports = {
	User
}
const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

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

userSchema.pre('save', function (next) {
	if (this.isNew) {
		bcrypt.genSalt(10)
			.then(salt => {
				return bcrypt.hash(this.password, salt)
			})
			.then(hashedPassword => {
				this.password = hashedPassword
				next()
			})
			.catch(err => {
				console.log(err)
			})
	}
	else
		next()
})

const User = mongoose.model('users', userSchema)

module.exports = {
	User
}
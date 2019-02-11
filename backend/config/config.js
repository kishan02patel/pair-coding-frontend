const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/pair-coding'

module.exports = {
	PORT, DB_URL
}
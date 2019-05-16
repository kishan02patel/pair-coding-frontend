const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.static('build'))

app.get('*', (req, res) => {
	res.redirect('/')
})

app.listen(PORT, () => console.log('Server started on port ', PORT))
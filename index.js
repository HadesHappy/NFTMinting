const express = require('express')
const app = express()

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send()
  next()
})

const path = require('path')

const PORT = 5003

app.use(express.static(path.join(__dirname, '/build')))
app.set('build', path.join(__dirname, 'build'))
app.set('view engine', 'html')

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

var http = require('http').createServer(app)

let io = http.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`)
})
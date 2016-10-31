var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var reactRender = require('react-render')
var url = require('url')

// Ensure support for loading files that contain ES6+7 & JSX
require('babel-register')({
	plugins: [
		[
			'babel-plugin-transform-require-ignore',
			{
				extensions: ['.sass']
			}
		]
	]
})

server = url.parse(process.env.RENDER_SERVER)

var app = express()
var server = http.Server(app)

app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.end('React render server')
})

app.post('/render', function(req, res) {
	reactRender(req.body, function(err, markup) {
		if (err) {
			res.json({
				error: {
					type: err.constructor.name,
					message: err.message,
					stack: err.stack
				},
				markup: null
			})
		} else {
			res.json({
				error: null,
				markup: markup
			})
		}
	})
})

server.listen(server.port, server.hostname, function() {
	console.log('React render server listening at ' + server.href)
})

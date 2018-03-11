'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');
var socketio = require('socket.io');
/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
//plugin para paginacion , ordenacion y proyeccion
require('mongoose-middleware').initialize(mongoose);

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(config.port);
app.get('server').listen(config.port);

var io = socketio.listen(app.get('server'));
//var datosBascula=14.65;
		app.set('socketio', io);
/*var io = app.get('socketio');


*/
io.sockets.on('connection',function(socket)
	{
	 	var address = socket.handshake.address;
		console.log('Usuario conectado IP:' + address);

	
	    socket.on('disconnect', function(){
			var address = socket.handshake.address;
	   	    console.log('Usuario desconectado' + address);
	    });
			
//escuchamos el hardware
		socket.on('bascula1',function(data)
		{ 	
			console.log('escuche el commando1',data.Bascula1);
			var datosBascula= data.Bascula1.toString();
			//io.sockets.emit('datosBascula',data.Bascula1);//le comunica a todos los clientes conectados
			//emitimos al cliente
			io.sockets.emit('datosbascula1',datosBascula);
			console.log(datosBascula);
		});

		socket.on('bascula2',function(data)
		{ 	
			console.log('escuche el commando2',data.Bascula2);
			//datosBascula= data.Bascula2;
			var datosBascula= data.Bascula2.toString();
			//io.sockets.emit('datosBascula',data.Bascula1);//le comunica a todos los clientes conectados
			//emitimos al cliente
			io.sockets.emit('datosbascula2',datosBascula);
			console.log(datosBascula);
		});

		socket.on('bascula3',function(data)
		{ 	
			console.log('escuche el commando3',data.Bascula3);
			var datosBascula= data.Bascula3.toString();
			//io.sockets.emit('datosBascula',data.Bascula1);//le comunica a todos los clientes conectados
			//emitimos al cliente
			io.sockets.emit('datosbascula3',datosBascula);
			console.log(datosBascula);
		});

		socket.on('bascula4',function(data)
		{ 	
			console.log('escuche el commando4',data.Bascula4);
			var datosBascula= data.Bascula4.toString();
			//io.sockets.emit('datosBascula',data.Bascula1);//le comunica a todos los clientes conectados
			//emitimos al cliente
			io.sockets.emit('datosbascula4',datosBascula);
			console.log(datosBascula);
		});

		


});


// Expose app
exports = module.exports = app;

// Logging initialization
console.log('INDUEVA Web Server : ' + config.port);

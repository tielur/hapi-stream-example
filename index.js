

var Hapi = require('hapi');
var fs = require('fs');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            index: true
        }
    }
});

server.route({
   method: 'POST',
   path: '/create',
   config: {
      payload:{
            maxBytes: 209715200,
            output:'stream',
            parse: true
      }, 
      handler: function (request, reply) {
          request.payload["file1"].pipe(fs.createWriteStream("test.txt"));
          reply('Done!');
      }
  }
});

// Start the server
server.start();
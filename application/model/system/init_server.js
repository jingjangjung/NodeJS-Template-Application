var http = require("http");
var url = require("url");

function launch( port ) {
  function Request( request, response ) {
    var requestURL = url.parse( request.url ).pathname;
    var queryData = url.parse(request.url, true).query;
    
    require('./route').request( requestURL, queryData, function( output ){
    
    
      response.writeHead( output.code, {
                                "Content-Length": output.html.length,
                                "Content-Type": output.type
                                });
      response.write( output.html );
      response.end();
      
    });
  }

  http.createServer(Request).listen(port);
  console.log("Server has been launched");
  
}

exports.launchAt = launch;
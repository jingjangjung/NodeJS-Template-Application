
function Request( requestedURL, queryData, callback ) {
    
    var fs = require('fs');
    var basepath = require('path').dirname( require.main.filename );
    var output = { code:200, type:"text/html", html:'' }
    
    
    if ( requestedURL.substr(0,8) == "/assets/" ) {
        
        fs.exists( basepath+'/'+requestedURL , function( exists ) {
          
          if (exists)
          {
            fs.readFile(basepath+'/'+requestedURL, 'utf8', function(err, data) {
                if (err) throw err;
                var tEnd = requestedURL.substr(-3,3);
                if ( tEnd == 'png') output['type'] = "image/png";
                else if ( tEnd == 'jpg') output['type'] = "image/jpeg";
                else if ( tEnd == 'svg') output['type'] = "image/svg+xml";
                else if ( tEnd == '.js') output['type'] = "application/javascript";
                else if ( tEnd == 'eot') output['type'] = "application/vnd.ms-fontobject";
                else if ( tEnd == 'ttf') output['type'] = "application/x-font-ttf";
                else if ( tEnd == 'woff') output['type'] = "application/x-font-woff";
                else output['type'] = "text/plain";
                output['html'] = data;
                callback( output );
            });
          }
          else
          {
            output['code'] = 404;
            output['html'] = "404 FILE NOT FOUND";
            callback( output );
          }
          
        });
        
    } else {
        
        if ( requestedURL == '/' ) requestedURL = "/index";
        
        fs.exists( basepath+'/application/controller/requests'+requestedURL+'.js' , function( exists ) {
            
            if ( exists ) {
                
                output['html'] = require(basepath+'/application/controller/requests'+requestedURL+'.js').request(queryData);
                
                callback( output );
            }
            else
            {
                fs.exists( basepath+'/application/controller/pages'+requestedURL+'.js' , function( exists ) {
                  
                    if (!exists) requestedURL = '/index';
                    
                    require(basepath+'/application/controller/pages'+requestedURL+'.js').page(queryData, function(responseData){
                        output['html'] = responseData;
                        callback( output );
                    });
                    
                });
            }
        });
        
    }
    
    
    
    
}

exports.request = Request;
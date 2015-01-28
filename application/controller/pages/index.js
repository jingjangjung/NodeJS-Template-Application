
function page( queryData, callback ){
    
    var fs = require('fs');
    var basepath = require('path').dirname(require.main.filename);
    require('./../../model/system/ui.js').ui(function( ui ){
        
        
        fs.readFile(basepath+'/application/view/pages/index.htm', 'utf8', function(err, data) {
            if (err) throw err;
            
            
            callback( ui.header + data + ui.footer);
            
        });
        
    });
    
}



exports.page = page;

function ui( callback ){
    
    var fs = require('fs');
    var basepath = require('path').dirname(require.main.filename);
    var ui = {header:'',footer:''};
    
    fs.readFile(basepath+'/application/view/tmpl/header.htm', 'utf8', function(err, data) {
        ui.header = data;
        fs.readFile(basepath+'/application/view/tmpl/footer.htm', 'utf8', function(err, data) {
            ui.footer = data;
            callback(ui);
        });
    });
    
}



exports.ui = ui;
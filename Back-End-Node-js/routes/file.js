var express = require('express');
var fs = require('fs');
var path = require("path");
var multer = require('multer');
var router = express.Router();

var upload = multer({ dest: './public/cookies' });

router.get('/list', function(req, res, next) {
    var files_json = Array();
    var dest_dir = "";
    if(req.query.dir !== undefined)
        dest_dir = req.query.dir;
    var directory = path.join(__dirname, "./../public/uploads", dest_dir);
    var menu = fs.readdirSync(directory);
    menu.forEach(function(ele, index){
        var info = fs.statSync(directory + "/" + ele);
        if(info.isDirectory()){
            var dir_json = {
                type: "directory",
                file_name: ele,
                file_size: (info.size / 1024).toFixed(2),
                last_modify_time: info.mtime.toLocaleString(),
                file_full_path: "//" + req.headers.host + "/uploads/" + dest_dir + "/" + ele
            };
            files_json.push(dir_json);
        }else{
            var file_json = {
                type: "file",
                file_name: ele,
                file_size: (info.size / 1024).toFixed(2),
                last_modify_time: info.mtime.toLocaleString(),
                file_full_path: "//" + req.headers.host + "/uploads/" + dest_dir + "/" + ele
            };
            files_json.push(file_json);
        }
    });
    res.send(files_json);
});

router.post('/upload', upload.array('file', 99), function(req, res, next){
    for (var i = 0; i < req.files.length; i++) {
        fs.rename(req.files[i].path, "./public/uploads/" + req.body.dir + "/" + req.files[i].originalname, function(err) {
            if (err) {
                res.send({ret_code: '-1', err: err});
            } else {
                res.send({ret_code: '0'});
            }
        })
    }
});

router.post('/delete', function(req, res, next){
    fs.exists("./public/uploads/"+ req.body.dir + "/"  + req.body.filename, function(exist) {
        if(exist) {
            fs.unlink("./public/uploads/"+ req.body.dir + "/"  + req.body.filename, function(err) {
                if(err) {
                    res.send({ret_code: '-1', err: err});
                }else{
                    res.send({ret_code: '0'});
                }
            });
        }
    });
});

module.exports = router;

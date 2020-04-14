var copydir = require('copy-dir');
var dest = "C:/Games/test-folder"; //Counter Strike Clean\cstrike";
var fs = require('fs')
var readdirSync = fs.readdirSync.bind(fs);
var getDirectories = function(source){ 
   return readdirSync(source, { withFileTypes: true }).filter(function(dirent){return dirent.isDirectory()}).map(function(dirent){ return dirent.name})
}

var dirs = getDirectories("./");
dirs.forEach(function(name){
	console.log("process", name);
	if (fs.existsSync("./"+name+"/cstrike")) { 
 	console.log("cstrike found"); 
	copydir(".\\"+name+"\\cstrike", dest, {
 	 utimes: true,  // keep add time and modify time
	  mode: true,    // keep file mode
	  cover: true    // cover file when exists, default is true
	}, function(){})
	} else { 
	 console.log("cstrike not found");
	 copydir("./"+"he_acuarium", dest, {
 	 utimes: true,  // keep add time and modify time
	  mode: true,    // keep file mode
	  cover: true    // cover file when exists, default is true
	}, function(){})
	}
     })

    
if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' FOLDER_PATH');
	process.exit(1);
};

var fs = require("fs"), folder = process.argv[2];
if (!fs.existsSync(folder)) {
	console.log('FOLDER_PATH is invalid!');
	process.exit(1);
}

var total = 0;
fs.readdirSync(folder).forEach(file => {
	total++;
});
var pace = require('pace')(total);
const util = require('util');

fs.readdirSync(folder).forEach(file => {
	pace.op();
	var filePath = util.format('%s/%s', folder, file);
	var arr = file.split(".");
	fs.readFile(filePath, 'utf-8', function(err, buff) {
		if (err) throw err;
		var outputFolder = "./output_folder";
		if (!fs.existsSync(outputFolder)) {
			fs.mkdirSync(outputFolder);
		}
		const buffStrArray = buff.toString().split("\n");
		var i = 1;
		buffStrArray.forEach((buffStr) => {
			if (buffStr) {
				var fileName = util.format("%s/%s_%d.%s", outputFolder, arr[0], i, arr[1]);
				fs.writeFile(fileName, buffStr, function(err, buffStr) {
					if (err) console.log(err);
				});
				i++; 
			}
		});
	});
});

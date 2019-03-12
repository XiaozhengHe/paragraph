if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' FOLDER_PATH');
	process.exit(1);
};

var fs = require("fs"), folder = process.argv[2];
if (!fs.existsSync(folder)) {
	console.log('FOLDER_PATH is invalid!');
	process.exit(1);
}

var minwords = 20;  //每一段最小字数

var total = 0;
fs.readdirSync(folder).forEach(file => {
	total++;
});
var pace = require('pace')(total);
const util = require('util');

function isEndSymbol(ch) {
	return ch == "." ||
		   ch == "。" ||
		   ch == "]" ||
		   ch == "】" ||
		   ch == ")" ||
		   ch == "）"||
		   ch == "}" ||
		   ch == "」" ||
		   ch == "\"" || 
		   ch == "'" ||
		   ch == "!" ||
		   ch == "！"||
		   ch == "”" ||
		   ch == "’" ||
		   ch == "?" ||
		   ch == "？" ||
		   ch == " "
}

function isEndColon(ch) {
	return ch == ":" ||
           ch == "："
}

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
		var j = 1;
		let buffTem = "";
		for (var buffStr of buffStrArray) {
			buffStr = buffTem + buffStr;
			if (buffStr) {
				if (j == 1) {  //第一行，视作标题，剔除
					j++;
					continue;
				}
				if (buffStr.length < minwords) {  //段落字数小于20,与下一段连接在一起
					buffTem = buffTem+buffStr;
					continue;
				}
				else if (isEndSymbol(buffStr[buffStr.length - 1])) {    // 结尾是标点符号，视作完整的一段
					var fileName = util.format("%s/%s_%d.%s", outputFolder, arr[0], i, arr[1]);
					fs.writeFile(fileName, buffStr, function(err, buffStr) {
						if (err) console.log(err);
					});
					i++; 
				}
				else if (isEndColon(buffStr[buffStr.length - 1])) {  //结尾是冒号的情况，与下一段连接在一起
					buffTem = buffStr;
					continue;
				}
				else {
					var fileName = util.format("%s/%s_%d.%s", outputFolder, arr[0], i, arr[1]);
					fs.writeFile(fileName, buffStr, function(err, buffStr) {
						if (err) console.log(err);
					});
					i++;
				}
				buffTem = "";
			}
		}
	});
});

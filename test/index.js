var fs = require("fs");

var postcss = require("postcss");
var customMedia = require("postcss-custom-media");
var slayout = require("../");

// css to be processed
var css = fs.readFileSync("./test/test.css", "utf8");

// process css using postcss-custom-media
postcss()
	.use(slayout())
	.use(customMedia())
	.process(css)
	.then(function(result){
		fs.writeFileSync("./test/test-result.css", result.css);
	})
	.catch(function(err){
		console.log(err.stack);
	});
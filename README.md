postcss-slayout
===============

> A [PostCSS](https://github.com/postcss/postcss) plugin to transform [Slayout](https://github.com/rasmusfl0e/slayout) custom properties into CSS.

## Basic usage

```
var fs = require("fs");
var postcss = require("postcss");
var slayout = require("postcss-slayout");

var css = fs.readFileSync("input.css", "utf8");

postcss()
	.use(slayout())
	.process(css)
	.then(function(result){
		console.log(result.css);
	});
```


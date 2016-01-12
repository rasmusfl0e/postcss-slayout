var postcss = require("postcss");
var slayout = require("slayout");

module.exports = postcss.plugin("slayout", function (options) {
	
	options = options || {};
	
	return function (css) {
		
		css.walkDecls("slayout", function (decl) {
			
			var root = decl.root();
			
			var data = {
				selector: decl.parent.selector,
				value: decl.value
			};
			
			console.log(typeof slayout, JSON.stringify(slayout, null, "\t"));
			var output = slayout(data);
		
			output.rules.forEach(function (rule) {
				if (rule.selector === decl.parent.selector) {
					objectToDecls(rule.props, decl.before).forEach(function (prop) {
						decl.parent.append(prop);
					});
				}
				else {
					root.append(
						postcss.rule({
							selector: rule.selector,
							nodes: objectToDecls(rule.props, decl.before)
						})
					);
				}
			});
		
			output.atRules.forEach(function (atRule) {
				
				root.append(
					postcss.atRule({
						name: "media",
						params: atRule.media,
						nodes: atRule.rules.map(function(rule){
							return postcss.rule({
								selector: rule.selector,
								nodes: objectToDecls(rule.props, decl.before + "\t"),
								before: decl.before,
								after: decl.before
							});
						})
					})
				);
			});
			
			decl.removeSelf();
			
		});
		
	};
	
});

function objectToDecls(object, before) {
	return Object.keys(object).map(function (prop) {
		return postcss.decl({prop: prop, value: object[prop], before: before});
	});
}
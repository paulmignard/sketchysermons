module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "png",
        "jpg",
        "gif",
        "js",
        "liquid",
        "html",
        "otf",
        "md",
        "css" // css is not yet a recognized template extension in Eleventy
    ]);

    let liquidJs = require("liquidjs");
    let options = {
        extname: ".liquid",
        dynamicPartials: true,
        strict_filters: true,
        root: ["_includes"]
    };

    eleventyConfig.setLibrary("liquid", liquidJs(options))
  };
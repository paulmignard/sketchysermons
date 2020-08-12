module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
        "liquid",
        "html",
        "otf",
        "md",
        "css" // css is not yet a recognized template extension in Eleventy
    ]);
  };

module.exports = function(eleventyConfig) {
    
    eleventyConfig.addCollection("latestPost", function(collectionApi) {
        console.log(collectionApi.getAll()[0].data.title)
        let collections = collectionApi.getAll();
        return collections.slice(0,1);
    });

    eleventyConfig.setTemplateFormats([
        "png",
        "jpg",
        "jpeg",
        "gif",
        "js",
        "liquid",
        "njk",
        "html",
        "otf",
        "md",
        "css" // css is not yet a recognized template extension in Eleventy
    ]);

    // Let's set up liquid!
    let liquidJs = require("liquidjs");
    let options = {
        extname: ".liquid",
        dynamicPartials: true,
        strict_filters: true,
        root: ["_includes"]
    };
    eleventyConfig.setLibrary("liquid", liquidJs(options))

    // Let's add our rss feed!
    // https://www.11ty.dev/docs/plugins/rss/
    const pluginRss = require("@11ty/eleventy-plugin-rss");
        module.exports = function(eleventyConfig) {
        eleventyConfig.addPlugin(pluginRss);
    };
    
    // Let's sort for year
    /*
    eleventyConfig.addCollection("byYear", function(collectionApi) {

        let yearArray = [];
        collectionApi.getAll().forEach(function(a){
            let t = new Date(a.date);
            console.log(t.getFullYear());
        });

        return collectionApi.getAll();

    });*/

  };

module.exports = function(eleventyConfig) {
  
    eleventyConfig.setQuietMode(false);

    eleventyConfig.addCollection("latestPost", function(collectionApi) {
        console.log(collectionApi.getAll()[0].data.title)
        let collections = collectionApi.getAll();
        return collections.slice(0,1);
    });

    eleventyConfig.addCollection("getLatestPostCluster", function(collectionApi) {
      
      // TODO: The number of posts here should be configurable
      let postCount = 6;
      
      // Let's sort this by date
      let collections = collectionApi.getAll().sort(function(a, b) {
        return b.date - a.date;
      });

      return collections.slice(1,postCount + 1);
    });

    eleventyConfig.setTemplateFormats([
        "html",
        "liquid",
        "md"
    ]);

    eleventyConfig.addPassthroughCopy("img");

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
  };
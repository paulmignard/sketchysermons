const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  
    eleventyConfig.setQuietMode(false);

    // Alright, let's resize some images!
    eleventyConfig.addLiquidShortcode("responsiveImage", async function(src, alt, size) {
      
      if(alt === undefined) {
        // You bet we throw an error on missing alt (alt="" works okay)
        throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
      }

      src = "images/posts/" + src;
      
      // Let's figure out our width strategy here:
      let widthArray = [];
      if(typeof size == 'string'){
        // This should be an array of strings, let's separate them here
        let s = size.split(",");
        s.forEach(function(element){
          widthArray.push(Number(element));
        });
      }else if(typeof size == 'number'){

        widthArray.push(size);
      }

      let options = {
        // Array of widths
        // Optional: use falsy value to fall back to native image size
        widths: widthArray,
      
        // Pass any format supported by sharp
        formats: ["webp", "jpeg","png"], 
      }

      let stats = await Image(src, options);
      let lowestSrc = stats.jpeg[0];
      let sizes = "100vw"; // Make sure you customize this!
  
      // Iterate over formats and widths
      return `<picture>
        ${Object.values(stats).map(imageFormat => {
          return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
        }).join("\n")}
          <img
            alt="${alt}"
            src="${lowestSrc.url}"
            width="${lowestSrc.width}"
            height="${lowestSrc.height}">
        </picture>`;

      
    });


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
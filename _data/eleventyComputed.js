module.exports = {
    eleventyComputed: {
      postYears: data => {
          let oldestPost = 2017;
          let years = [oldestPost]
          // We need to get every year between now and the oldest post...
          let currentYear = new Date().getFullYear();

          // This is bad right? I dunno, let' go with it
          do{
            oldestPost++;
            years.push(oldestPost);
          }while(oldestPost != currentYear)

          return years.reverse();
      }
    }
  };
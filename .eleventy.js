
module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markDownAttr = require('markdown-it-attrs');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options).use(markDownAttr);

  eleventyConfig.setLibrary("md", markdownLib);
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    markdownTemplateEngine: 'njk',
  }
}
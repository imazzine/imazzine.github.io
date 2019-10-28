const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { sanitize } = require('dompurify');

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
//   highlight: function(code) {
//     return require('highlight.js').highlightAuto(code).value;
//   },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: true,
  sanitizer: sanitize,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

// Compile
fs.writeFileSync(
  path.resolve(__dirname, '../.html/readme.html'),
  marked(fs.readFileSync(path.resolve(__dirname, '../readme.md'), 'utf8'))
);
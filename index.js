'use strict';
const parser = require('./lib/parser');

module.exports = {

  hooks: {
    'config': function (config) {
      let opts = 'pluginsConfig.pagenotes.' + this.output.name;
      parser.initialise(this.config.get(opts));
      return config;
    },
    'page': function (page) { // <--- non-indexed
      let content = page.content;
      if (content.length > 0) {
        page.content = parser.parse(content);
      }
      return page;
    }
  },
  parser: parser
};

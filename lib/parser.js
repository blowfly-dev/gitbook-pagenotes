'use strict';
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const cheerio = require('cheerio');
const pug = require('pug');
const config = require('./config');
let options = {};
let renderSection;
let renderFootnotes;
let renderMarker;

function initialise(opts) {
  options = Object.assign(options, config, opts || null);

  renderSection = compileTemplate(resolveFilePath(options.sectionTemplate));
  renderFootnotes = compileTemplate(resolveFilePath(options.footnotesTemplate));
  renderMarker = compileTemplate(resolveFilePath(options.markerTemplate));
}

/* Force HTMLParser2 to handle parsing so that cheerio doesn't 
unescape HTML entities in rendered content. The default parser5 
distributed in cheerio 1.0.0 release candidates doesn't appear 
to honour the value set for decodeEntities option. (See Issue
#1198 <https://github.com/cheeriojs/cheerio/issues/1198>.)
*/
function parse(content) {
  let _$ = cheerio.load(content, {
    _useHtmlParser2:true,
    decodeEntities: false
  }, false); // don't add html boilerplate

  let $footnotes = _$('blockquote[id^=fn_]');
  if ($footnotes.length === 0) { // nothing to render
    return content;
  }
  let items = $footnotes.map(function (i) {
    let $item = _$(this).remove();
    let $ref = $item.find('sup')
      .first()
      .remove();
    $item.find('a')
      .last()
      .remove();
    let id = !options.disableNumbering
      ? i + 1
      : $ref.text()
        .replace(/[.\s]+$/, '')
        .trim();
    let body = $item.html()
      .replace(/^[.\s]+/, '')
      .trim();
    return {
      id: id, 
      body: body
    };
  }).get();
  resolveContext(_$)
    .append(renderFootnotes({
      items: items
    }));

  let $markers = _$('[id^=reffn_]');
  $markers.each(function (i, elem) {
    let $marker = _$(elem);
    let id = (!options.disableNumbering) 
      ? i + 1
      : $marker.text();
    $marker.parent()
      .replaceWith(renderMarker({
        id: id
      }));
  });
  return _$.root().html();
}

function compileTemplate(file) {
  return pug.compileFile(file);
}

function resolveFilePath(file) {
  let filePathArr = file.split('/');
  // working directory
  let rootPathArr = [cwd];
  let filePath = path.join
    .apply(null, rootPathArr.concat(filePathArr));
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  // module directory
  let localPathArr = [__dirname, '/../'];
  filePath = path.join
    .apply(null, localPathArr.concat(filePathArr));
  if (!fs.existsSync(filePath)) {
    throw Error('Pagenotes cannot resolve ' + file);
  }
  return filePath;
}

function resolveRoot(_$) {
  let $root = _$('body').first();
  return ($root.length > 0) ? $root : _$.root();
}

function findTokens(name, $context) {
  let pattern = new RegExp('[\\s\\S]*?\\{' + name + '\\}[\\s\\S]*?', 'i');
  return $context.contents().filter(function (i, elem) {
    return (elem.type === 'comment') && (pattern.test(elem.data));
  });
}
/* When resolving context for endnote insertion, select 
the first occurrence of a block variable or html placeholder, 
prioritising the former. Otherwise, append endnotes to root
element in cheerio data structure or to topmost valid DOM 
block-level element in content, e.g., body.
*/
function resolveContext(_$) {
  let $root = resolveRoot(_$);
  let $token = findTokens(options.tokenName, $root).first();
  let $context = _$(renderSection());

  if ($token.length > 0) {
    $token.replaceWith($context);
    return $context;
  }
  let $placeholder = _$('#' + options.sectionID, $root).first();
  if ($placeholder.length > 0) {
    return $placeholder;
  }
  $context.appendTo($root);
  return $context;
}

module.exports = {
  initialise,
  parse
}

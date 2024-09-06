const assert = require('chai').assert;
const expect = require('chai').expect;
const parser = require('../').parser;
const fs = require('fs');

// -----------------------------------------
// Assertions (chai)
// -----------------------------------------

describe('parser() options:defaults', function () {
  let fixture,
    result;

  before(function () {
    fixture = fs.readFileSync('test/fixtures/gitbook.html', { encoding: 'utf8' });
    parser.initialise();
    result = parser.parse(fixture);
  });
  it('renders footnotes container', function () {
    expect(result).to.have.string(
      '<section class="footnotes" id="footnotes" role="doc-endnotes">'
    );
  });
  it('renders footnote marker', function () {
    expect(result).to.have.string(
      '<sup class="footnote-marker" role="doc-noteref"><a href="#fn_1" '
      + 'id="reffn_1">1</a></sup>'
    );
  });
  it('renders footnote ordered list type', function () {
    expect(result).to.have.string(
      '<ol><li class="footnote" id="fn_1" role="doc-endnote">'
    );
  });
  it('renders footnote back link', function () {
    expect(result).to.have.string(
      '<a class="footnote-back" href="#reffn_1" title="Link to footnote 1" '
      + 'role="doc-backlink">&#x21A9;</a>'
    );
  });
  it('preserves html character entities', function () {
    expect(result).to.have.string(
      '‘faisait monter la pression’'
    );
    expect(result).to.have.string(
      'Prête'
    );
    expect(result).to.not.have.string(
      '&#x2018;faisait monter la pression&#x2019;'
    );
    expect(result).to.not.have.string(
      'Pr&#xEA;te'
    );
  });
  it('resolves block token', function () {
    expect(result).to.not.have.string(
      '<!--{pagenotes}-->'
    );
  });
  it('prioritises block token over html placeholder', function () {
    expect(result).to.have.string(
      '<section class="footnotes" id="footnotes" role="doc-endnotes-placeholder"></section>'
    );
  });
});

describe('parser() options:defaults', function () {
  let fixture,
    no_token_result;

  // First remove block token in fixture so that the parser can reach html placeholder
  before(function () {
    fixture = fs.readFileSync('test/fixtures/gitbook.html', { encoding: 'utf8' });
    parser.initialise();
    let no_token_fixture = fixture.replace('<!--{pagenotes}-->', '');
    no_token_result = parser.parse(no_token_fixture);
  });
  it('resolves html placeholder', function () {
    expect(no_token_result).to.have.string(
      '<section class="footnotes" id="footnotes" role="doc-endnotes-placeholder"><ol>'
    );
  });
  // Arbitrary test that ensures content remains intact
  it('preserves content without footnotes', function () {
    let html = '<section><blockquote></blockquote></p></section>';
    let no_footnotes = parser.parse(html);
    assert.equal(no_footnotes, html);
  });
});

describe('parser() footnotes-style-1.pug template}', function () {
  let fixture,
    result;

  before(function () {
    fixture = fs.readFileSync('test/fixtures/gitbook.html', { encoding: 'utf8' });
    parser.initialise({ footnotesTemplate: 'templates/footnotes-style-1.pug' });
    result = parser.parse(fixture);
  });
  it('renders footnote style 1', function () {
    expect(result).to.have.string(
      '<div class="footnote" id="fn_1" role="doc-endnote">'
      + '<sup class="footnote-ref-counter">1</sup>'
    );
  });
});

describe('parser() <html> dom', function () {
  let fixture,
    result;

  before(function () {
    fixture = fs.readFileSync('test/fixtures/dom.html', { encoding: 'utf8' });
    parser.initialise();
    result = parser.parse(fixture);
  });
  it('parses full html document', function () {
    expect(result).to.not.have.string(
      '<!--{pagenotes}-->'
    );
    expect(result).to.have.string(
      '<section class="footnotes" id="footnotes" role="doc-endnotes">'
    );
  });
});

describe('parser() {disableNumbering: true} footnotes-style-1.pug template', function () {
  let fixture,
    result;

  before(function () {
    fixture = fs.readFileSync('test/fixtures/gitbook.html', { encoding: 'utf8' });
    parser.initialise({ disableNumbering: true, footnotesTemplate: 'templates/footnotes-style-1.pug' });
    result = parser.parse(fixture);
  });
  it('preserves gitbook footnote reference', function () {
    expect(result, 'Failed to render footnote marker with unique id reffn_note1').to.have.string(
      '<a href="#fn_note1" id="reffn_note1">note1</a>'
    );
    expect(result, 'Failed to render div element with unique id fn_note1').to.have.string(
      '<div class="footnote" id="fn_note1" role="doc-endnote">'
    );
    expect(result, 'Failed to render footnote counter with text content note1').to.have.string(
      '<sup class="footnote-ref-counter">note1</sup>'
    );
    expect(result, 'Failed to render back link with url #reffn_note1').to.have.string(
      '<a class="footnote-back" href="#reffn_note1" title="Link to footnote note1" role="doc-backlink">'
    );
  });
});

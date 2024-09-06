## Options

The plugin exposes a number of configurations so that endnotes can be adapted to suit the design of your website or ebook. You can override a default option using a `pluginsConfig` configuration in `book.json`:

```json
{
  "plugins": [
    "pagenotes"
  ],
  "pluginsConfig": {
    "pagenotes": {
      "website": {
        "tokenName": "PAGENOTES",
        "sectionID": "footnotes",
        "disableNumbering": false,
        "sectionTemplate": "templates/section.pug",
        "footnotesTemplate": "templates/footnotes.pug",
        "markerTemplate": "templates/marker.pug"
      },
      "ebook": {
        "tokenName": "PAGENOTES",
        "sectionID": "footnotes",
        "disableNumbering": false,
        "sectionTemplate": "templates/section.pug",
        "footnotesTemplate": "templates/footnotes-style-1.pug",
        "markerTemplate": "templates/marker.pug"
      }
    }
  }
}
```

### tokenName

Type: `string`  
Default: `PAGENOTES`

Set the identifier to use for template block variable.

```json
/* book.json */
{
  "pagenotes": {
    "website": {
      "tokenName": "PAGENOTES"
    }
  }
}
```

See [Block token](#block-token).

### sectionID

Type: `string`  
Default: `footnotes`

Set the unique id for the endnotes container element.

```html
<section id="footnotes">…</section>
```

### disableNumbering

Type: `boolean`  
Default: `false`  

Disable numbered reference markers and counters.

This option will preserve Markdown footnote identifiers — the words and numbers demarcated from the text using brackets ([^shortmemo]).

Markdown:

```markdown
There are ~~not~~[^error] many reasons to use footnotes 
in good academic writing practice.[^credit]

[^error]: They add information to a discussion.
[^credit]: And give credit where credit is due.
```

Rendered output:

<section role="figure">
<p>There are <strike>not</strike><sup><a href="#">error</a></sup> many reasons 
    to use footnotes in good academic writing practice.<sup>
    <a href="#">correct</a></sup></p>

<div>
  <div><sup>error</sup> They can add information to a discussion. 
      <a href="#">&#x21A9;</a></div>
  <div><sup>correct</sup> And give credit where credit is due. 
      <a href="#">&#x21A9;</a></div>
</div>
</section>

Note: identifiers will not be preserved for templates that render endnotes to an HTML list.

### sectionTemplate

Type: `string`  
Default: `section.pug`

Select the local path to section pug template

See [Section](#section)

### footnotesTemplate

Type: `string`  
Default: `footnotes.pug`

Select the local path to footnotes pug template.

See [Footnotes](#footnotes)

### markerTemplate

Type: `string`  
Default: `marker.pug`

Select the local path to footnote reference pug template.

See [Marker](#marker)


## Pug templates

Endnotes are written and compiled in [pug](https://pugjs.org/), an HTML template engine implemented with JavaScript. As well as the default templates provided, you can add your own custom templates using a `pluginsConfig` configuration in [`book.json`](#options). 

### Section

The section pug template produces the outer HTML element for endnotes.

Here is the default template `section.pug`:
```pug
section.footnotes(id='footnotes', role='doc-endnotes')
```

The template is transformed to a generic block-level `<section>` HTML element:
```html
<section class="footnotes" id="footnotes" role="doc-endnotes"></section>
```

### Footnotes

The footnotes pug template defines the HTML markup for endnotes.

Pug injects the template with a data set (a Javascript array of objects) representing a collection of all footnotes in the current page. Here is a data set representing the three footnotes from the [previous example](#examples):
```js
[
  {id: '1',  body: "Québecois French: ‘working up steam.’"},
  {id: '2',  body: "‘Homestyle. Ready to Serve.’"},
  {id: '3',  body: "‘Pursuit of happiness.’"}
]
```

Pug iterates over this array, replacing template variables (`${}` or `!{}`) that correspond to properties in the data set. Here is the default `footnotes.pug` template:
```pug
ol
  each item in items
    li.footnote(
        id=`fn_${item.id}`
        role='doc-endnote')
      | !{item.body}
      a.footnote-back(
        href=`#reffn_${item.id}`
        title=`Link to footnote ${item.id}`
        role='doc-backlink')
        | &#x21A9;
```

Pug transforms the above to:
```html
<ol>
  <li class="footnote" id="fn_1" role="doc-endnote">Québecois French: 
      ‘working up steam.’ <a href="#reffn_1" title="link to footnote 1" 
      role="doc-backlink" class="footnote-back">&#x21A9;</a></li>
  <li class="footnote" id="fn_2" role="doc-endnote">‘Homestyle. Ready 
      to Serve.’ <a href="#reffn_2" title="Link to footnote 2" 
      role="doc-backlink" class="footnote-back">&#x21A9;</a></li>
  <li class="footnote" id="fn_3" role="doc-endnote">‘Pursuit of 
      happiness.’ <a href="#reffn_3" title="Link to footnote 3" 
      role="doc-backlink" class="footnote-back">&#x21A9;</a></li>
</ol>
```

### Marker

This pug template compiles the footnote marker. It receives the string variable `id`, representing the footnote reference (a number or string).

Here is the default template `marker.pug`:
```pug
sup.footnote-marker(role='doc-noteref')
  a(href=`#fn_${id}`, id=`reffn_${id}`)
    | #{id}
```

The template is transformed to:
```html
<sup class="footnote-marker" role="doc-noteref"><a href="#fn_1" 
    id="reffn_1">1</a></sup>
```

For more information on templating in pug, visit [Getting Started](https://pugjs.org/api/getting-started.html).


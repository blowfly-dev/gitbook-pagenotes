## Safeguarding reference number in footnotes

By default, this plugin renders endnotes to an [HTML ordered list](https://www.w3.org/TR/html52/grouping-content.html#the-ol-element) element, entrusting the browser or third-party ebook converter to display an ascending counter for list items. If reference numbers are not displaying correctly in endnotes, then a CSS property value declared elsewhere in your gitbook may have a higher specificity. 

You can increase the weight applied to plugin style declarations with the `#footnotes` selector, which will target the endnotes container specifically:

```css
/* website.css, ebook.css */
#footnotes ol {
  list-style: decimal;
}

#footnotes ol li {
  list-style-type: decimal;
}
```


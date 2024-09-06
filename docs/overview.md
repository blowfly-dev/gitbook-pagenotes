## Overview

Pagenotes removes footnotes in the current Markdown and groups them together into a list (referred to as 'endnotes' herein), ready to be inserted back into the rendered page. By default, the plugin retains some of the original structure of Gitbook footnotes, while taking advantage of additional semantic elements to improve accessibility.

The plugin attempts to find one of the following, in this order:

- block token
- HTML placeholder
- last HTML element

When it encounters a block token, pagenotes replaces the token with the detached endnotes. If the page contains an HTML placeholder, the endnotes are appended to the placeholder. (In situations where a page might contain both, tokens takes priority over placeholders.) 

If the document contains neither token nor placeholder, then endnotes are inserted after the last HTML element in the rendered page — providing a convenient way to render endnotes without having to update the Markdown.

### Block token

A block token looks like this:

```markdown
<!--{PAGENOTES}-->
```

Note that the token is wrapped in comments so that it remains hidden should the document be published without the plugin installed.

By default, the token will be parsed into a standalone `<section>` HTML element, providing the outer HTML container for endnotes. You can add your own template for the container using [sectionTemplate](#sectiontemplate) option.

### HTML placeholder

Endnotes can be appended to an existing HTML DOM element. Use [sectionID](#sectionid) config to specify the classname of the target element (the default value is `footnotes`). Alternatively, add a generic block-level container with the correct classname attribute.

Adding HTML placeholder in Markdown:

```markdown
<section class='footnotes'>
<!-- Appended endnotes -->
</section>
```

The plugin will also preserve child elements:

```markdown
<section class='footnotes'>
  <h2>Footnotes</h2>
  <!-- Appended endnotes -->
</section>
```


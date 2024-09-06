## Examples

The following example shows a standard Markdown document with footnotes, the compiled HTML with endnotes, and a typical rendering within the browser:

Markdown:

```markdown
#### My research
He was ‘faisait monter la pression’:[^note1] ‘The little things. 
[…] A tall lemonade on a squeak-free porch swing.’ 

‘But yes. French-Canadian-type pea soup. Produit du Montreal. 
Saveur Maison. Prête a Servir.’[^note2]

[^note1]: Québecois French: ‘working up steam.’
[^note2]: ‘Homestyle. Ready to Serve.’

By the U.S.A. genius of for each “pursuivre le bonheur,”[^note3] 
then, who can decide who may receive this soup?’

[^note3]: ‘Pursuit of happiness.’

#### Footnotes
<!--{PAGENOTES}-->

#### Bibliography
- WALLACE, D.F., (1997) _Infinite Jest: a Novel_. London: Abacus.
```

HTML:

```html
<h4>My research</h4>
<p>He was ‘faisait monter la pression’:<sup class="footnote-marker" 
    role="doc-noteref"><a href="#fn_1" id="reffn_1">1</a></sup> ‘The little 
    things.[&#x2026;] A tall lemonade on a squeak-free porch swing.’</p>

<p>‘But yes. French-Canadian-type pea soup. Produit du Montreal. 
    Saveur Maison. Prête a Servir.’<sup class="footnote-marker" 
    role="doc-noteref"><a href="#fn_2" id="reffn_2">2</a></sup></p>

<p>By the U.S.A. genius of for each “pursuivre le bonheur,”<sup 
    class="footnote-marker" role="doc-noteref"><a href="#fn_3" 
    id="reffn_3">3</a></sup> then, who can decide who may receive this 
    soup?’</p>

<h4>Footnotes</h4>
<section class="footnotes" id="footnotes" role="doc-endnotes">
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
</section>

<h4>References</h4>
<ul>
  <li>WALLACE, D.F., (1997) <em>Infinite Jest: a Novel</em>. London: 
      Abacus.</li>
</ul>

```

Rendered output:

<section role="figure">
<h4>My research</h4>
<p>He was ‘faisait monter la pression’:<sup><a href="#">1</a></sup> ‘The little things. [&#x2026;] A tall lemonade on a squeak-free porch swing.’</p>
<p>‘But yes. French-Canadian-type pea soup. Produit du Montreal. Saveur Maison. Prête a Servir.’<sup><a href="#">2</a></sup></p>
<p>By the U.S.A. genius of for each “pursuivre le bonheur,”<sup><a href="#">3</a></sup> then, who can decide who may receive this soup?’</p>
<h4>Footnotes</h4>
<ol>
  <li>Québecois French: ‘working up steam.’ <a href="#">&#x21A9;</a></li>
  <li>‘Homestyle. Ready to Serve.’ <a href="#">&#x21A9;</a></li>
  <li>‘Pursuit of happiness.’ <a href="#">&#x21A9;</a></li>
</ol>
<h4>References</h4>
<ul>
  <li>WALLACE, D.F., (1997) <em>Infinite Jest: a Novel</em>. London: Abacus.</li>
</ul>
</section>


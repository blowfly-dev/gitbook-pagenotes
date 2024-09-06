## Limitations

Block tokens declared inside HTML elements will not be parsed:

```html
Success
<!--{PAGENOTES}-->

Fail
<div><!--{PAGENOTES}--></div>
```


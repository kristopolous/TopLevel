TopLevel
========

TopLevel allows you to template your html at the top level, like so:

    <!--% if ( browser() == "broken" ) { -->
      <link rel="stylesheet" href="broken.css">
    <!--% } -->

The stuff inside the blocks **will not load** unless the branch is run.

This is not the old solution of injecting stuff **after** a page load.

This is also not a solution of **downloading and then removing** ... the block above will never render unless
the function `browser()` returns the string `"broken"`.

Here is another simple example:

    <!doctype html>
    <html>
      <head>
        <script src="toplevel.js"></script>
      </head>

      <body>
    
        <!--% for(var ix = 0; ix < 10; ix++) { -->
          <p><!--= ix --></p>
        <!--% } -->

      </body>

    </html>

When you load the page in the browser and then go into the inspector you will sure enough see 10 paragraph blocks with numbers inside of them.

### This is a total game-changer.

You can put toplevel stanzas inside of css, html, even tags.
Take this for example:

    <div id="header">
      <img src="logo_<!--= (isMobile() ? "50x50" : "200x200") -->.jpg">
    </div>

Only one image will load - the right one for the browser.  

There will be no broken "flash" of html --- this is instant.

### All your JS still works.

JQuery CSS selectors, underscore, everything stays in tact.  TopLevel is fast, transparent, and totally rewrites the rules of how you can create webpages.

## It works everywhere and takes up 0.8 KB.

Opera, Chrome, Firefox, IE, Safari, Dolphin, Seamonkey, Chromium --- it's all in and it's all there.

### Add this massive functionality in a single include with under a kilobyte of gzipped code.

## Syntax

toplevel takes its templating right from [underscore](http://underscorejs.org/). The functionality is identical with a slight change of syntax.

> Template functions can both interpolate variables, using `<!--= … -->`, as well as execute arbitrary JavaScript code, with `<!--% … -->`. If you wish to interpolate a value, and have it be HTML-escaped, use `<!--- … -->`.

That is to say, a regular html comment block with the first character being either `=`, `%`, or `-`.  Keep this in mind, and refer to the [underscore documentation](http://underscorejs.org/#template) for further information!

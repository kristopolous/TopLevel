TopLevel
========

TopLevel enables you to template your HTML, CSS, and Javascript at the Top Level like so:

    <!doctype html>
    <html>
      <head>
        <script src="YourBrowserCheckCode.js"></script>
        <script src="toplevel.js"></script>

        <!--% if ( CheckBrowser() == "broken" ) { -->
          <link rel="stylesheet" href="broken.css">
        <!--% } else { -->
          ...
        <!--% } -->
        ...

The stylesheet above **will never load** unless the branch is satisfied.

 * This Is Not a solution of injecting stuff *after a page load*.
 * This Is Not a solution of *downloading and then removing* things from the DOM.

**The HTML code including the stylesheet will never be interpreted by the browser unless the function `CheckBrowser()` returns the string `"broken"`. ... seriously ...**

<hr>

Another example:

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

When you load the page in the browser you will see 10 paragraph blocks with numbers inside of them.

### This Is A Total Game-Changer.

You can put TopLevel stanzas inside of CSS, HTML blocks, even HTML attributes.
Take this for example:

    <div id="header">
      <img src="logo_<!--= (isMobile() ? "50x50" : "200x200") -->.jpg">
    </div>

Only one image will load - the right one for the browser.  

There will be no broken looking "flash" --- the delivery is smooth and polished.

### All Your JS Still Works.

 * `$(document).ready`
 * CSS selectors
 * Underscore
 * AMD Loaders, CoffeeScript, Knockout, Angular, Socket.io, Backbone, D3, yes --- all of them.

TopLevel is fast, transparent, and totally rewrites the rules of how you will create webpages.

## Works Everywhere And Is 0.8 KB.

Tested And Works On:

 * Opera
 * Chrome
 * Firefox
 * Safari
 * IE 
 * Dolphin
 * Seamonkey
 * Chromium 
 
They're all in and all the features are there.

#### Add this massive functionality in a single include with under a kilobyte of gzipped code.

### Uses Underscore's Templating Engine

TopLevel takes its templating right from [underscore](http://underscorejs.org/). The functionality is identical with a slight change of syntax.

> Template functions can both interpolate variables, using `<!--= … -->`, as well as execute arbitrary JavaScript code, with `<!--% … -->`. If you wish to interpolate a value, and have it be HTML-escaped, use `<!--- … -->`.

That is to say, a regular HTML comment block with the first character being either `=`, `%`, or `-`.  Keep this in mind, and refer to the [underscore documentation](http://underscorejs.org/#template) for further information!

### Easily Enable TopLevel to Use Any Third-Party Library

Everything after the `<script src="toplevel.js"></script>` gets interpreted.  If you want TopLevel to use a say, an MV* framework, simply include it before TopLevel, at the top of the HTML file like so:

    <!doctype html>
    <html>
      <head>
        ... dependencies you want to expose to TopLevel ...
        <script src="toplevel.js"></script>
        ...

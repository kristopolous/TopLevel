//
// toplevel.js
//
// TopLevel enables you to template your HTML, CSS, and Javascript at the Top Level
// (c) 2014 chris mckenzie. see LICENSE for more details.
// https://github.com/kristopolous/TopLevel for the latest version.
//
// Parts of this code use Jeremy Ashkenas' underscore library, available at 
// https://github.com/jashkenas/underscore and protected by the license specified
// therein.
//

//
// This tag has been deprecated since HTML 1.1 - June 1993. 
// http://tools.ietf.org/html/draft-ietf-iiir-html-00
//
// Happy 21st Birthday 
//   < plaintext >
//                   .-.
//    .  :  .  ,    /#  \
//    :  ^  ^  ^   :#    :
//   _i__i__i__i_   \   /
//  ( Deprecated )   `/'
//  |~.~.~.~.~.~.|   ( 
//  (,,21,Years,,)    \
//
// All the browsers still love you because 
// you're just such a cinch to implement.
//
// This is the magic sauce, btw.
//
document.write('<plaintext style=display:none>');

(function(){

// The following is excerpted from underscore.js 1.6.0 {{
// Of course various things have been changed...
  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  function WaveWand(text) {
    var 
      render,
      // Combine delimiters into one regular expression via alternation.
      matcher = new RegExp([
       // escape
       '<!---([\\s\\S]+?)-->',

       // interpolate
       '<!--=([\\s\\S]+?)-->',

       // evaluate
       '<!--%([\\s\\S]+?)-->'
     ].join('|') + '|$', 'g'),

     // Compile the template source, escaping string literals appropriately.
     index = 0,

     source = "__p+='";

    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function('obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    return render();
  };
// end of underscore - Thanks, Jeremy!

  // This will make sure that we call our load events on the 
  // eventually loaded JS file.  We take this function, emit it
  // as a string, and then append it to the end of the rendered
  // document.
  var alakazam = function() {
    var 
      DOMContentLoaded_event = document.createEvent("Event"),
      load_event = document.createEvent("Event");

    // These are the two events in ready.js part of jquery that
    // get hooked into $(document).ready ... look at 
    //
    // https://github.com/jquery/jquery/blob/master/src/core/ready.js#L85
    //
    // The logic here is that the base that jquery covers should
    // be good enough for me.
    DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
    load_event.initEvent("load", true, true);

    document.dispatchEvent(DOMContentLoaded_event);
    window.dispatchEvent(load_event);
  }
   
  // Abracadabra is called after all the HTML loads
  function abracadabra() {
    var 
      // At this point, all the code we need to intepret is in one giant
      // <plaintext> blob.  We can just read it in and remove the node.
      ordinaryText = document.body.removeChild(document.body.lastChild).textContent,

      // Then we pass it all off to underscore's templating library and append
      // our payload to the end.
      presto = WaveWand(ordinaryText) + "<script>(" + alakazam.toString() + ")();</script>";

    // For the curious:
    // console.log(presto);
    
    // emit it.
    document.write(presto);

    // stop the spinner in ff
    document.close();

    // and deregister ourselves.
    document.removeEventListener("DOMContentLoaded", abracadabra);
  }

  document.addEventListener("DOMContentLoaded", abracadabra);

})();

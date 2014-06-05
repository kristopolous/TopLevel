document.write('<plaintext style=display:none>');

(function(){

// The following is excerpted from underscore.js
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
  function template(text, data) {
    var render, settings = {
      evaluate    : /<!--%([\s\S]+?)-->/g,
      interpolate : /<!--=([\s\S]+?)-->/g,
      escape      : /<!---([\s\S]+?)-->/g 
    };

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
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
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data);
    var template = function(data) {
      return render.call(this, data);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };
// end of underscore

  var payload = function() {
    var 
      DOMContentLoaded_event = document.createEvent("Event"),
      load_event = document.createEvent("Event");

    DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true)
    load_event.initEvent("load", true, true)

    document.dispatchEvent(DOMContentLoaded_event);
    window.dispatchEvent(load_event);
  }
   
  // we need to double fire the event
  function dispatch(){
    var 
      raw = document.body.removeChild(document.body.lastChild).textContent,
      copy = template(raw, {}) + "<script>(" + payload.toString() + ")();</script>";

    document.write( copy );
    document.removeEventListener("DOMContentLoaded", dispatch);
  }

  document.addEventListener("DOMContentLoaded", dispatch);

})();

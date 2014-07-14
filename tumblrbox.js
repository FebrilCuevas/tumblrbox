/*
 * tumblrbox - Lightbox effect for Tumblr
 * using FancyBox
 *
 * Copyright (c) 2011 Picuous
 * Forked and edited by @FebrilCuevas
 *
 * Version: 2
 *
 * Licensed under the MIT license
 *   http://www.opensource.org/licenses/mit-license.php
 */

;(function() {

  if(typeof(window.console) === "undefined" || typeof(window.console.log) === "undefined") {
    window.console = {
      debug: function() {},
      log: function() {},
      warn: function() {},
      error: function() {}
    }
  }
  console.debug('tumblrbox');

  // Global variables
  var otherlib = false;

  if(typeof jQuery != 'undefined') {
    //console.debug('This page is already using jQuery v'+jQuery.fn.jquery);
  } else if (typeof $ == 'function') {
    //console.debug('This page is using another $ library');
    otherlib = true;
  }

  // more or less stolen form jquery core and adapted by paul irish
  function load_file(url, success) {
    var script;
    if(url.match(/\.js$/)) {
      script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
    } else {
      script = document.createElement('link');
      script.rel = 'stylesheet';
      script.type = 'text/css';
      script.href = url;
    }
    var head = document.getElementsByTagName('head')[0],
        done = false;
    // Attach handlers for all browsers
    script.onload=script.onreadystatechange = function() {
      if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
        done = true;
        if(success) {
          success();
        }
        script.onload = script.onreadystatechange = null;
        //head.removeChild(script);
      }
    };
    head.appendChild(script);
  }
  load_file('http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function() {
    if(typeof jQuery=='undefined') {
      console.debug('Sorry, but jQuery wasn\'t able to load');
    } else {
      $ = jQuery.noConflict();
      console.debug('loaded '+$.fn.jquery);
      load_file('//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js', function() {
        console.debug('loaded fancybox');

        var $tumblr_pics = $('a[href*=".media.tumblr.com/"]>img[src*=".media.tumblr.com/"]').parent();
        $tumblr_pics.fancybox({
    helpers : {
        overlay : {
            css : {
                'background' : 'rgba(0, 0, 0, 0.85)'
                  }
                  }
              }
        });
        $tumblr_pics.fancybox({
          'type': 'image',
          'padding': 0,
          'closeBtn': false,
          'autoCenter': true,
          'autoResize': true,
          'autoSize': true
          });

        console.debug($tumblr_pics.length+' tumblr pictures tumblrboxed');


        // Flickr doesn't allow displaying its content as in an iframe
        /*var $flickr_pics = $('a[href*="http://www.flickr.com/photos"]>img[src*="media.tumblr.com"]').parent();
        $flickr_pics.fancybox({
          'type': 'iframe',
          'transitionIn': 'elastic',
          'transitionOut': 'elastic',
          'opacity': true,
          'titleShow': false,
          'padding': 0,
          'overlayShow': true
        });
        console.debug($flickr_pics.length+' flickr pictures tumblrboxed');*/
      });
    }
  });

  // Add CSS
  load_file('//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css');

})();

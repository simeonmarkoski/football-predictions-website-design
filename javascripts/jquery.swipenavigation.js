/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 *  Howto:

    $('.js-swipenavigation').swipenavigation();
*/

;(function(jQuery) {

  var pluginName = 'swipenavigation';
  $[pluginName] = function(element, options) {

    var defaults = {
        pluginName: pluginName
    }
    var plugin = this;
    plugin.settings = {}

    plugin.init = function() {
        plugin.settings = $.extend({}, defaults, options);
        plugin.initListner();
    },

    //----------------------------------------------------------------------

    plugin.initListner = function(e) {

      var $target = $(element);
      var hasTapEvent = ('ontouchstart' in window);

      if(hasTapEvent) {
        $target.find('a').each(function(index, el) {
          var $el = $(el);
          $el.addClass('hover-disabled');
          $el.on('touchstart', function(event) {
            $el.addClass('touch');
          });
          $el.on('touchend', function(event) {
            $el.removeClass('touch');
          });
        });
      } else {
        $target.on('mousewheel', function(event) {
          event.preventDefault();
          var $el = $target.find('ul');
          $el.scrollLeft($el.scrollLeft()-event.deltaY);
        });
      }

    },

    //----------------------------------------------------------------------

    plugin.init();
  }

  $.fn[pluginName] = function(options) {if(!options) options = {};options.items = [];return this.each(function(i) {options.id = i;options.items.push($(this));if (undefined == $(this).data(pluginName)) {var plugin = new $[pluginName](this, options);$(this).data(pluginName, plugin);}});}

})(jQuery);
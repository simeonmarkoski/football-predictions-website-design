// This is where it all goes :)

$(document).on('ready', function() {
  var $target = $('.js-swipenavigation');
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
    //mousewheel
    $target.on('mousewheel', function(event) {
      event.preventDefault();
      var $el = $target.find('ul');
      $el.scrollLeft($el.scrollLeft()-event.deltaY);
      updateScroll();
    });

    //next/back
    $(window).on('load resize', _.throttle(checkScroll, 100));
    $target.find('.next').on('click', function(event) {
      event.preventDefault();
      var $el = $target.find('ul');
      $el.scrollLeft($el.scrollLeft()+30);
      updateScroll();
    });
    $target.find('.back').on('click', function(event) {
      event.preventDefault();
      var $el = $target.find('ul');
      $el.scrollLeft($el.scrollLeft()-30);
      updateScroll();
    });
  }

  function updateScroll() {
    var $el = $target.find('ul');
    if(parseInt($el.scrollLeft()) == 0) {
      $target.find('.back').addClass('is-hidden');
    } else {
      $target.find('.back').removeClass('is-hidden');
    }

    var width = 0;
    $target.find('ul').find('li').each(function(index, el) {
      width += $(el).width();
    });

    if(parseInt($el.scrollLeft()) + parseInt($target.find('ul').width()) == width) {
      $target.find('.next').addClass('is-hidden');
    } else {
      $target.find('.next').removeClass('is-hidden');
    }
  }

  function checkScroll() {
    if($target.find('ul')[0].clientHeight == $target.find('ul')[0].offsetHeight) {
      $target.removeClass('has-scroll');
    } else {
      $target.addClass('has-scroll');
    }
    updateScroll();
  }

});


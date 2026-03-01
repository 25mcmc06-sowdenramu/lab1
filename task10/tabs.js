(function($) {
  $.fn.tabs = function(options) {
    var settings = $.extend({
      activeClass: 'active',
      animationSpeed: 500,
      defaultTab: null
    }, options);

    return this.each(function() {
      var $tabs = $(this);
      var $tabLinks = $tabs.find('a');
      var $tabContents = $('.tab-content');

      $tabLinks.each(function() {
        var $link = $(this);
        var tabId = $link.attr('href');
        if (tabId === '#' + settings.defaultTab || (settings.defaultTab === null && $link.is(':first-child'))) {
          $link.addClass(settings.activeClass);
          $(tabId).addClass(settings.activeClass);
        }
      });

      $tabLinks.on('click', function(event) {
        event.preventDefault();
        var $link = $(this);
        var tabId = $link.attr('href');
        $tabLinks.removeClass(settings.activeClass);
        $link.addClass(settings.activeClass);
        $tabContents.removeClass(settings.activeClass);
        $(tabId).addClass(settings.activeClass).fadeIn(settings.animationSpeed);
      });

      $(window).on('hashchange', function() {
        var hash = window.location.hash;
        if (hash) {
          var $link = $tabLinks.filter('[href="' + hash + '"]');
          if ($link.length) {
            $link.trigger('click');
          }
        }
      });

      $tabs.on('keydown', function(event) {
        if (event.keyCode === 37) { 
          var $activeLink = $tabs.find('.' + settings.activeClass);
          var $prevLink = $activeLink.prev('li').find('a');
          if ($prevLink.length) {
            $prevLink.trigger('click');
          }
        } else if (event.keyCode === 39) { 
          var $activeLink = $tabs.find('.' + settings.activeClass);
          var $nextLink = $activeLink.next('li').find('a');
          if ($nextLink.length) {
            $nextLink.trigger('click');
          }
        }
      });
    });
  };
})(jQuery);
(function() {
    $(function() {
      var collision, end_movement, mario, mario_event_listener, move_degree, move_mario, move_times, start_movement, window_width, x_movement, x_movement_dir, x_movement_on, y_movement;
      mario = {
        element: $('.mario'),
        bottom: 40,
        left: 100
      };
      move_times = 10;
      x_movement = null;
      x_movement_on = false;
      x_movement_dir = 0;
      y_movement = null;
      window_width = $(window).width();
      move_degree = function(d) {
        return d * move_times;
      };
      collision = function($div1, $div2) {
        var b1, b2, h1, h2, r1, r2, w1, w2, x1, x2, y1, y2;
        x1 = $div1.offset().left;
        y1 = $div1.offset().top;
        h1 = $div1.outerHeight(true);
        w1 = $div1.outerWidth(true);
        b1 = y1 + h1;
        r1 = x1 + w1;
        x2 = $div2.offset().left;
        y2 = $div2.offset().top;
        h2 = $div2.outerHeight(true);
        w2 = $div2.outerWidth(true);
        b2 = y2 + h2;
        r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
          return false;
        } else {
          return true;
        }
      };
      mario_event_listener = function() {
        return $('.menu .option').each(function(index) {
          if (collision($('.mario'), $(this)) && !$(this).hasClass('touch')) {
            $('.menu .option.touch').removeClass('touch');
            $(this).addClass('touch');
            $(".content .show").removeClass('show');
            return $(".content .content-index-" + index).addClass('show');
          }
        });
      };
      move_mario = function(x, y) {
        var new_x, new_y;
        new_x = mario.left + x;
        if (new_x < 5) {
          new_x = 5;
        }
        new_y = mario.bottom + y;
        if (new_y < 40) {
          new_y = 40;
        }
        if (new_y > 190) {
          new_y = 190;
        }
        mario_event_listener();
        mario.bottom = new_y;
        mario.left = new_x;
        return mario.element.css({
          bottom: mario.bottom,
          left: mario.left
        });
      };
      start_movement = function(x, y) {
        if (x !== 0 && x_movement_on && x_movement_dir !== x) {
          end_movement('x');
        }
        if (x !== 0 && !x_movement_on) {
          if (x < 0) {
            mario.element.addClass('left');
          }
          if (x > 0) {
            mario.element.addClass('right');
          }
          x_movement_dir = x;
          x_movement = setInterval(function() {
            return move_mario(move_degree(x), 0);
          }, 100);
          return x_movement_on = true;
        } else if (y !== 0) {
          return y_movement = setInterval(function() {
            return move_mario(0, move_degree(y));
          }, 100);
        }
      };
      end_movement = function(axis) {
        if (axis === 'x') {
          mario.element.removeClass('left');
          mario.element.removeClass('right');
          clearInterval(x_movement);
          return x_movement_on = false;
        } else if (axis === 'y') {
          return clearInterval(y_movement);
        }
      };
      $(window).keydown(function(e) {
        if (e.which === 65 || e.which === 37) {
          return start_movement(-4, 0);
        } else if (e.which === 68 || e.which === 39) {
          return start_movement(4, 0);
        } else if (e.which === 32) {
          if (mario.bottom === 40) {
            return move_mario(0, move_degree(20));
          }
        }
      });
      $('.content').click(function() {
        if ($('.first-screen').hasClass('show')) {
          $('.first-screen').removeClass('show');
          return $('.getting-started').addClass('show');
        }
      });
      $(window).keyup(function(e) {
        if (e.which === 65 || e.which === 37) {
          if (!(x_movement_dir > 0)) {
            return end_movement('x');
          }
        } else if (e.which === 68 || e.which === 39) {
          if (!(x_movement_dir < 0)) {
            return end_movement('x');
          }
        }
      });
      setInterval(function() {
        if (mario.bottom !== 40) {
          return move_mario(0, move_degree(-2));
        }
      }, 40);
      return setInterval(function() {
        if (mario.element.hasClass('alternate')) {
          return mario.element.removeClass('alternate');
        } else {
          return mario.element.addClass('alternate');
        }
      }, 80);
    });
  
  }).call(this);
  
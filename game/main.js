$(function () {


  // Element cache
  var c = {};
  c.$window = $(window);
  c.$document = $(document);
  c.$body = $('body');
  c.$container = $('body');
  c.$canvas = $('#stage');
  c.canvas = c.$canvas.get(0);

  var stage = c.canvas.getContext('2d');

  // Resize the body to move the canvas
  ps.on('v:resize', function () {
    c.$container.height(c.$window.height());
  });

  // Load the game
  ps.on('g:load', function () {
    ps.emit('v:resize');
    ps.emit('g:loop:init', c.canvas, stage);
    ps.emit('g:loop:go');
  });

  // Event handlers
  c.$window.on('resize', ps.emit.bind(this, 'v:resize'));
  
  c.$document.on('keydown', ps.emit.bind(this, 'u:keydown'));

  // Kick this off!
  ps.emit('g:load');

});
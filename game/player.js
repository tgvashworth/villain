(function () {

  var size = {
    hand: 6
  };

  var player = {
    name: 'Player',
    loc: V(400, 20),
    vel: V(0, 0)
  };

  player.update = function (forces) {

    this.vel.add(forces);
    this.loc.add(this.vel);

    if( this.loc.y >= 500 && this.vel.y > 0 ) {
      this.vel.y = -25;
    }

    if( this.loc.x <= 0 ) {
      this.vel.x = 10;
    }
    if( this.loc.x + 20 >= 800 ) {
      this.vel.x = -10;
    }

    this.vel.x *= 0.9;

  };

  player.draw = function (ctx, t) {

    ctx.save();

    // Hands
    ctx.fillStyle = "hsla("+(t%360)+",50%, 44%,1)";
    ctx.fillRect(this.loc.x - 7 + 3 * Math.cos((t + 2) / 3), this.loc.y + 5, size.hand, size.hand);
    
    ctx.fillStyle = "hsla("+(t%360)+",50%, 44%,1)";
    ctx.fillRect(this.loc.x + 20 + 3 * Math.cos(t / 3), this.loc.y + 5, size.hand, size.hand);

    
    // Feet
    ctx.fillStyle = "hsla("+(t%360)+",50%,40%,1)";
    ctx.fillRect(this.loc.x + 5, this.loc.y + 0.5 * Math.sin(t / 10) + 14, 10, 10);

    // Body shadow
    ctx.fillStyle = "hsla("+(t%360)+",50%,40%,1)";
    ctx.fillRect(this.loc.x, this.loc.y - 3, 20, 20);
    
    // Body
    ctx.fillStyle = "hsla("+(t%360)+",50%,50%,1)";
    ctx.fillRect(this.loc.x, this.loc.y, 20, 20);

    // Eye
    ctx.fillStyle = "hsla(0,0%, 100%,.3)";
    ctx.fillRect(this.loc.x + 5, this.loc.y + 3, 10, 5);

    ctx.fillStyle = "hsla(0,0%, 0%,.3)";
    ctx.fillRect(this.loc.x + Math.cos(t / 100) + 8, this.loc.y + 4, 4, 4);

    ctx.restore();

  };

  window.player = player;

}());
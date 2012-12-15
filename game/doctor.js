(function () {

  var size = {
    hand: 6
  };

  var doctor = {
    name: 'doctor'
  };

  doctor.init = function (loc, vel) {
    this.loc = loc;
    this.vel = vel;
    return this;
  };

  doctor.revive = function () {
    this.dead = false;
    this.ghost = true;
    setTimeout(function () {
      this.ghost = false;
    }.bind(this), 1000);
  };

  doctor.update = function (forces) {

    if( this.dead ) setTimeout(this.revive.bind(this), 3000);

    this.vel.add(forces);
    this.loc.add(this.vel);

    if( this.loc.y >= 500 && this.vel.y > 0 ) {
      this.vel.y = -15;
    }

    if( this.loc.x <= 0 ) {
      this.vel.x =  Math.random() * 5;
    }
    if( this.loc.x + 20 >= 800 ) {
      this.vel.x = Math.random() * -5;
    }

    // this.vel.x *= 0.9;

  };

  doctor.draw = function (ctx, t) {

    if( this.dead ) return;

    ctx.save();

    // Hands
    ctx.fillStyle = "hsla(0,0%, 95%, 1)";
    ctx.fillRect(this.loc.x - 6, this.loc.y + 5, size.hand, size.hand + 3);
    
    ctx.fillRect(this.loc.x + 20, this.loc.y + 5, size.hand, size.hand + 3);

    
    // Feet
    ctx.fillStyle = "hsla(0,0%,70%,1)";
    ctx.fillRect(this.loc.x + 5, this.loc.y + 0.5 * Math.sin(t / 10) + 14, 10, 10);

    // Body shadow
    ctx.fillStyle = "hsla(0,0%,90%,1)";
    ctx.fillRect(this.loc.x, this.loc.y - 3, 20, 20);
    
    // Body
    ctx.fillStyle = "hsla(0,0%,100%,1)";
    ctx.fillRect(this.loc.x, this.loc.y, 20, 20);

    // Eye
    ctx.fillStyle = "hsla(0,0%, 50%,.3)";
    ctx.fillRect(this.loc.x + 5, this.loc.y + 3, 10, 5);

    ctx.fillStyle = "hsla(0,0%, 0%,.3)";
    ctx.fillRect(this.loc.x + Math.cos(t / 100) + 8, this.loc.y + 4, 4, 4);

    ctx.restore();

  };

  window.doctor = doctor;

}());
(function () {

  var key={left:37,up:38,right:39,down:40,space:32,
        alt:18,ctrl:17,shift:16,tab:9,enter:13,escape:27,backspace:8,
        zero:48,one:49, two:50,three:51,four:52,
        five:53,six:57,seven:58,eight:59,nine:60,
        a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,
        l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,
        w:87,x:88,y:89,z:90};

  var canvas, $canvas, ctx
    , t = 0
    , div = 10
    , speed = 50;

  var score = 0;

  // Characters
  var villain;
  var doctors = [];

  // User events
  ps.on('u:keydown', function (event) {
    console.log(event);
    if( event.keyCode === key.left ) {
      player.vel.add(V(-10, 0));
    }
    if( event.keyCode === key.right ) {
      player.vel.add(V(10, 0));
    }
  });

  ps.on('g:score', function () {
    score += Math.floor(20 * Math.random());
    ps.emit('g:update_score', score);
  });

  // Update
  ps.on('g:tick:update', function (t) {

    doctors.forEach(function (doc, i) {

      if( !doc.dead && !doc.ghost && player.loc.to(doc.loc) < 20 ) {
        if( player.vel.y > 0 ) {
          doc.loc.y = 500;
          doc.dead = true;
          ps.emit('g:score');
        } else {
          player.dead = true;
        }
      }

      doc.update(V(0, 1));
    });

    if( player.dead ) return;
    player.update(V(0, 1));

  });

  // Draw
  ps.on('g:tick:draw', function (t) {

    $canvas.css({
      top: 40 * Math.sin(t / 19),
      left: 100 * Math.sin(t / 23)
    });

    ctx.fillStyle = "rgba(0,0,0,.3)";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    var i = 0, max = canvas.width / div;
    for(; i < max; i++) {
      var seed = 100 * Math.sin((t+i) / 10.323423423) * Math.cos((t+i) / 51.23423) * Math.sin((t+i) / 50);
      if( seed > 40 ) {
        ctx.fillStyle = "rgba(255,255,255,.8)";
        ctx.fillRect(i * div, 300 * Math.sin((i+t) * 11.242342), 1, 600);
      }
      if( seed > 10 && seed < 20 ) {
        ctx.fillStyle = "rgba(255,0,0,.8)";
        ctx.fillRect(i * div, 300 * Math.sin((i+t) * 9.234), 1, 600);
      }
      if( seed > -20 && seed < 0 ) {
        ctx.fillStyle = "rgba(0,255,0,.8)";
        ctx.fillRect(i * div, 360 * Math.sin((i+t) * 10.2342), 1, 600);
      }
    }

    ctx.fillStyle = "rgba(20,20,20,.8)";
    ctx.fillRect(0, canvas.height * 0.75, canvas.width, canvas.height * 0.25);

    doctors.forEach(function (doc) {
      doc.draw(ctx, t);
    });

    villain.draw(ctx, t);

  });

  var retick = function () {
    if( player.dead ) return;
    requestAnimationFrame(tick);
  };

  var tick = function () {

    setTimeout(retick, 0);

    t += 1;

    ps.emit('g:tick:update', t);

    ps.emit('g:tick:draw', t);

  };

  ps.on('g:loop:go', function () {
    tick();
  });

  ps.on('g:loop:init', function (elem, stage) {
    canvas = elem;
    $canvas = $(elem);
    ctx = stage;
    villain = Object.create(player);
    var i = 5, d;
    while(i--) {
      d = Object.create(doctor).init(
        V(Math.random() * canvas.width, canvas.height / 2 +  Math.random() * canvas.height / 3),
        V(-5 + Math.random() * 10, 0));
      doctors.push(d);
    }
  });

}());
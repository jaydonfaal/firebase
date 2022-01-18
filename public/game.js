let App = {
  colours: ['blue', 'red', 'yellow', 'green'],
  gamePattern: [],
  userClickedPattern: [],
  level: 0,
  start: false,
  nextSequence: function() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = this.colours[randomNumber];
    this.gamePattern.push(randomColour);
  },
  animatePress: function(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(function() {
      $("#" + colour).removeClass("pressed");
    }, 300);
  },
  showGamePattern: function() {
    let s = 0;
    let pattern = setInterval(() => {
      if (s < this.gamePattern.length) {
        var currentColour = this.gamePattern[s];
        this.animatePress(currentColour);
        s++;
      } else {
        clearInterval(pattern);
      }
    }, 1000);
  },
  subList: function() {
    for (var i = 0; i < this.userClickedPattern.length; i++) {
      if (this.userClickedPattern[i] != this.gamePattern[i]) return false;
    }
    return true;
  },
  gameOver: function() {
    this.level = 0;
    this.userClickedPattern = [];
    this.gamePattern = [];
    this.start = false;
    document.getElementById("red").disabled = true;
    document.getElementById("blue").disabled = true;
    document.getElementById("green").disabled = true;
    document.getElementById("yellow").disabled = true;

    $('body').addClass("lose");
    $(".header").text("Game Over!!");

    setTimeout(function() {
      $('body').removeClass("lose");
      $(".header").text("Press any key to restart");
    }, 1000);
  }
}

if (window.localStorage.highScore == undefined) {
  $(".score").text("High Score 0");
} else {
  $(".score").text("High Score " + window.localStorage.highScore);
}
$(document).on("keypress", function(event) {
  document.getElementById("red").disabled = false;
  document.getElementById("blue").disabled = false;
  document.getElementById("green").disabled = false;
  document.getElementById("yellow").disabled = false;
  if (!App.start) {
    App.start = true;
    App.nextSequence();
    App.showGamePattern();
    $(".header").text("Level " + App.level);
    console.log(App.gamePattern);
  }
})
$('.btn').on("click", function(event) {
  if (App.start) {
    var userClickedButtonColour = event.target.id;
    App.animatePress(userClickedButtonColour);
    App.userClickedPattern.push(userClickedButtonColour);
    if (App.subList() && App.userClickedPattern.length === App.gamePattern.length) {
      App.level++;
      App.userClickedPattern = [];
      App.nextSequence();
      App.showGamePattern();
      $(".header").text("Level " + App.level);
      if (window.localStorage.highScore < App.level) {
        window.localStorage.highScore = App.level;
        $(".score").text("High Score " + window.localStorage.highScore);
      }
      console.log(window.localStorage.highScore = App.level);
    } else if (!App.subList()) {
      App.gameOver();
    }
  }
})


function initializeAnimation() {
  window.requestAnimationFrame(draw);
}

let posX = -30;
let speed = 1;

function drawArt(ctx) {

  // Draw triangle
  ctx.beginPath();
  ctx.moveTo(-190, -80);
  ctx.lineTo(170, -80);
  ctx.lineTo(40, 185);
  ctx.lineTo(-190, -80);
  ctx.stroke();



  ctx.beginPath();
  ctx.moveTo(40, 185);
  ctx.lineTo(85, 240);
  ctx.lineTo(12, 240);
  ctx.lineTo(40, 185);
  ctx.stroke();

  // ctx.beginPath();
  // ctx.moveTo(-190, -120);
  // ctx.stroke();
  //

  // var time2 = new Date();
  // ctx.translate(time2.getSeconds()*10, 0);
  ctx.save();

  ctx.translate(posX,0);
  ctx.beginPath();
  ctx.arc(-30, -80, 90, 0, Math.PI * 2, false);
  ctx.stroke();

  let time = new Date();
  ctx.translate(-30,-80);
  ctx.rotate(time.getSeconds() + time.getMilliseconds() / 1000);

  ctx.beginPath();
  ctx.translate(-31,-31);
  ctx.rect(0, 0, 62, 62);

  ctx.stroke();

  ctx.restore();

  // ctx.save();
  // var time = new Date();
  // ctx.rotate(time.getSeconds() + time.getMilliseconds() / 1000);
  // ctx.beginPath();
  // ctx.moveTo(-100, -180);
  // ctx.stroke();
  // ctx.restore();
}

function moveCircle() {
  posX += speed;
  if (posX < -140 || posX > 120) {
    speed = speed * -1;
  }
}

function draw() {
  let ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 900, 700); // clear canvas

  // Figure out what pen we wanna draw with
  ctx.fillStyle = 'rgba(0, 153, 255, 1)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 1)';

  ctx.save();
  ctx.lineWidth = 6;
  ctx.translate(450, 400);
  moveCircle();
  drawArt(ctx);
  ctx.restore();


  // Call draw when the website is ready
  window.requestAnimationFrame(draw);

}

initializeAnimation();
// draw();

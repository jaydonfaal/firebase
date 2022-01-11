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
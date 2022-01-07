
const colours = ['blue', 'red', 'yellow', 'green']
var gamePattern = []
var userClickedPattern = []
var level = 0
var start = false


$(".score").text("High Score " + window.localStorage.highScore)

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4)
  var randomColour = colours[randomNumber]
  gamePattern.push(randomColour)
}


function animatePress(colour) {
  $("#" + colour).addClass("pressed")

  setTimeout(function() {
    $("#" + colour).removeClass("pressed")
  }, 300)
}


function showGamePattern() {
  document.getElementById("red").disabled = true;
  document.getElementById("blue").disabled = true;
  document.getElementById("green").disabled = true;
  document.getElementById("yellow").disabled = true;
  let start = 0
  let pattern = setInterval(thisFunction, 1000)

  function thisFunction() {

    if (start < gamePattern.length) {
      var currentColour = gamePattern[start]
      animatePress(currentColour)
      start++
    }

    else {
      clearInterval(pattern)
    }

  }
  document.getElementById("red").disabled = false;
  document.getElementById("blue").disabled = false;
  document.getElementById("green").disabled = false;
  document.getElementById("yellow").disabled = false;
}


function subList() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] != gamePattern[i]) return false
  }

  return true
}


function gameOver() {
  level = 0
  userClickedPattern = []
  gamePattern = []
  start = false
  document.getElementById("red").disabled = true;
  document.getElementById("blue").disabled = true;
  document.getElementById("green").disabled = true;
  document.getElementById("yellow").disabled = true;

  $('body').addClass("lose")
  $(".header").text("Game Over!!")

  setTimeout(function() {
    $('body').removeClass("lose")
    $(".header").text("Press any key to restart")
  }, 1000)
}


$(document).on("keypress", function(event) {
  document.getElementById("red").disabled = false;
  document.getElementById("blue").disabled = false;
  document.getElementById("green").disabled = false;
  document.getElementById("yellow").disabled = false;

  if (!start) {

    start = true
    nextSequence()
    showGamePattern()
    $(".header").text("Level " + level)
    console.log(gamePattern)
  }
})



$('.btn').on("click", function(event) {
  if (start) {


    var userClickedButtonColour = event.target.id


    animatePress(userClickedButtonColour)

    userClickedPattern.push(userClickedButtonColour)


    if (subList() && userClickedPattern.length === gamePattern.length) {


      level++
      userClickedPattern = []
      nextSequence()
      showGamePattern()
      $(".header").text("Level " + level)

      if(window.localStorage.highScore < level)
      {
        window.localStorage.highScore = level
        $(".score").text("High Score " + window.localStorage.highScore)
      }
      console.log(window.localStorage.highScore = level)
    }


    else if (!subList()) {


      gameOver()
    }
  }
})


const colours = ['blue', 'red', 'yellow', 'green']
var gamePattern = []
var userClickedPattern = []
var level = 0
var start = false

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomColour = colours[randomNumber]
  gamePattern.push(randomColour)
}


function animatePress(colour) {
  $("#" + colour).addClass("pressed"+colour)

  setTimeout(function() {
    $("#" + colour).removeClass("pressed"+colour)
  }, 300)
}



function showGamePattern() {

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

  $('body').addClass("lose")
  $(".header").text("Game Over!!")

  setTimeout(function() {
    $('body').removeClass("lose")
    $(".header").text("Press Play Game to restart")
  }, 1000)
}


document.getElementById("play").addEventListener("click", function() {
  if (!start) {
    start = true
    nextSequence()
    showGamePattern()
    $(".header").text("Level " + level)
    console.log(gamePattern)
  }
});


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
    }


    else if (!subList()) {

      gameOver()
    }
  }
})

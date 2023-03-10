var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level++;
  userClickedPattern = [];
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor);

  $('#' + chosenColor)
    .fadeOut('100')
    .fadeIn('100');

  playSound(chosenColor);
}
$('.btn').click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  if (userClickedPattern.length == gamePattern.length) {
    setTimeout(checkAnswer(level), 1000);
  }
});

function playSound(name) {
  var audio = new Audio('/sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $('.' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('.' + currentColor).removeClass('pressed');
  }, 100);
}

$(document).keydown(function () {
  var pressed = level === 0;
  if (pressed === true) {
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  var count = 0;
  for (var i = 0; i < currentLevel; i++) {
    if (userClickedPattern[i] == gamePattern[i]) {
      count++;
      console.log(count);
    } else {
      console.log('Wrong!');
    }
  }

  if (count === currentLevel) {
    setTimeout(function () {
      $('#bottom-text').text('Right!');
      nextSequence();
    }, 1000);
  } else {
    setTimeout(function () {
      $('#bottom-text').text('Wrong!');
    }, 1000);
    var gameover = new Audio('sounds/wrong.mp3');
    gameover.play();
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    level = 0;
    gamePattern = [];
  }
}

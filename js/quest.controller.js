'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null


$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ ans: 'yes' }, onUserResponse)
$('.btn-no').click({ ans: 'no' }, onUserResponse)
$('.btn-add-guess').click(onAddGuess)

function init() {
  console.log('Started...')
  createQuestsTree()
}

function onStartGuessing() {

 
    $('.game-start').hide()

  // gCurrQuest = getInitialQuest()
  
  renderQuest()

  $('.quest').show()
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update

  $('.quest h2').text(gCurrQuest.txt)

}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!')
      // TODO: improve UX
      onRestartGame()
    } else {
      alert('I dont know...teach me!')
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // Set the last response before moving to the next question
    gLastRes = res
    // Move to the next question
    moveToNextQuest(res)
    // Render the next question
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // TODO: Get the inputs' values
  addGuess(newGuess, newQuest, gLastRes)
  // TODO: Call the service addGuess
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastRes = null

  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

$('.btn-no').click(function() {
  $('.img').addClass('rotate');
  setTimeout(function() {
    $('.img').removeClass('rotate');
  }, 1000); 
});
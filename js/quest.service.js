'use strict'

///QTree
var gQuestsTree
var gCurrQuest
var gPrevQuest = null

//LS
const STORAGE_KEY = 'Game Question'


function createQuestsTree() {
  const storeQuestsTree = loadFromStorage(STORAGE_KEY)

  if (storeQuestsTree) {
    gQuestsTree = storeQuestsTree
  } else {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
  }
  
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest

  gPrevQuest[lastRes] = newQuest

  gCurrQuest = gQuestsTree
  gPrevQuest = null
  _saveQuestToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}


function _saveQuestToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}
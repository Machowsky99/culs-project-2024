const mainElements = Array.from(document.querySelectorAll("main"));
const sectionLists = mainElements.map((mainEl) => {
  return Array.from(mainEl.querySelectorAll("section"));
});
let slideIndex = 0;
let deckIndex = 0;

document
  .getElementById("next-slide")
  .addEventListener("click", handleNextSlide);
document
  .getElementById("previous-slide")
  .addEventListener("click", handlePrevSlide);
document.getElementById("next-deck").addEventListener("click", handleNextDeck);
document
  .getElementById("previous-deck")
  .addEventListener("click", handlePrevDeck);

function refreshAll(updateDeckFlag = true) {
  if (updateDeckFlag) refreshDeck();
  refreshSlide();
  refreshCounters();
}

function refreshDeck() {
  mainElements.forEach((mainEl) => (mainEl.style.display = "none"));
  mainElements[deckIndex].style.display = "flex";
}

function refreshSlide() {
  mainElements[deckIndex].style.transform = `translateX(${
    slideIndex * window.innerWidth * -1
  }px)`;
}

function refreshCounters() {
  document.getElementById("slide-count").innerText = `Slide: ${
    slideIndex + 1
  }/${sectionLists[deckIndex].length}`;
  document.getElementById("deck-count").innerText = `Deck: ${
    deckIndex + 1
  }/${mainElements.length}`;
}

function handleNextSlide() {
  if (slideIndex < sectionLists[deckIndex].length - 1) {
    slideIndex++;
    refreshAll(false);
  } else if (deckIndex < mainElements.length - 1) {
    deckIndex++;
    slideIndex = 0;
    refreshAll();
  }
}

function handlePrevSlide() {
  if (slideIndex > 0) {
    slideIndex--;
    refreshAll(false);
  } else if (deckIndex > 0) {
    deckIndex--;
    slideIndex = sectionLists[deckIndex].length - 1;
    refreshAll();
  }
}

function handleNextDeck() {
  if (deckIndex < mainElements.length - 1) {
    deckIndex++;
    slideIndex = 0;
    refreshAll();
  }
}

function handlePrevDeck() {
  if (deckIndex > 0) {
    deckIndex--;
    slideIndex = 0;
    refreshAll();
  }
}

refreshAll();

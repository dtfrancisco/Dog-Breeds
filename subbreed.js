function returnToMain() {
  localStorage.removeItem("breed");
  localStorage.removeItem("breedUrl");
  localStorage.removeItem("subbreed");
  localStorage.removeItem("subbreedUrl");
  document.location.href = 'index.html';
}

function returnToBreed() {
  localStorage.removeItem("subbreed");
  localStorage.removeItem("subbreedUrl");
  document.location.href = 'breed.html';
}

var breed = localStorage.getItem("breed");
var breedUrl = localStorage.getItem("breedUrl");
var subbreed = localStorage.getItem("subbreed");
var subbreedUrl = localStorage.getItem("subbreedUrl");

window.location.hash = breed + "#" + subbreed;

const subbreedImg = document.createElement('img');
subbreedImg.src = subbreedUrl;
subbreedImg.width = "366.6666666";
const breedImg = document.createElement('img');
breedImg.src = breedUrl;
breedImg.width = "366.6666666";
initApp();
var card1 = createCard(subbreed);
card1.appendChild(subbreedImg);
var card2 = createCard(breed);
card2.appendChild(breedImg);

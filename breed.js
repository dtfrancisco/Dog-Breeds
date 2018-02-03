function returnToMain() {
  localStorage.removeItem("breed");
  localStorage.removeItem("breedUrl");
  document.location.href = 'index.html';
}

function goToSubbreedPage() {
  var props = event.target.id.split('~');
  localStorage.setItem("subbreed", props[0]);
  localStorage.setItem("subbreedUrl", props[1]);
  document.location.href = 'subbreed.html';
}

var breed = localStorage.getItem("breed");
var url = localStorage.getItem("breedUrl");
// Append breed name to end of url
window.location.hash = breed;

var subbreeds = loadBreedNames(breed);
console.log(subbreeds.length);

const img = document.createElement('img');
img.src = url;
img.width = "366.6666666";
initApp();
var card = createCard(breed);
card.appendChild(img);

for (var i = 0; i < subbreeds.length; i++) {
  loadBreedImage(breed, subbreeds[i]);
}

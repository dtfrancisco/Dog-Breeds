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

function getBreedUrl(breed) {
  var url;
  var request = new XMLHttpRequest();
  request.open('GET', "https://cors-anywhere.herokuapp.com/http://en.wikipedia."
    +"org/w/api.php?action=opensearch&format=json&search="+breed, false);
  request.onload = function() {
    var data = JSON.parse(this.response);
    //console.log(data);
    //data[3] contains Wikipedia links returned by API request
    if (data[3].length == 1) {
      url = data[3][0];
    }
    else {
      for (var i = 0; i < data[3].length; i++) {
        // Check title name
        if (breed === "brabancon" || breed === "kelpie" || breed === "pomeranian") {
          url = data[3][1];
        }
        else if (breed === "corgi" || breed === "malamute") {
          url = data[3][0];
        }
        else if (breed === "dane") {
          url = "Great_Dane";
        }
        else if (breed === "eskimo") {
          url = "American_Eskimo_Dog";
        }
        else if (breed === "mountain") {
          url = "Mountain_Dog";
        }
        else if (breed === "pyrenees") {
          url = "Great_Pyrenees";
        }
        else if (breed === "ridgeback") {
          url = "Rhodesian_Ridgeback";
        }
        else if (breed === "springer") {
          url = "English_Springer_Spaniel";
        }
        else if (descriptionChecker(data[2][i])) {
          // let url overwrite previous ones in case it was a disambiguation
          url = data[3][i];
          break;
        }

      }
    }
    console.log(url);
  }
  request.send();
  return url;
}

function getBreedContent(breed) {
var description;
var request = new XMLHttpRequest();
request.open('GET', "https://cors-anywhere.herokuapp.com/http://en.wikipedia."+
  "org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles="
  +breed, false);
request.onload = function() {
  var data = JSON.parse(this.response);
  console.log(data);
  var pageId = Object.keys(data.query.pages) [0];
  description = data.query.pages[pageId].revisions[0]['*'];
}
request.send();
return description;
}

var breed = localStorage.getItem("breed");
var url = localStorage.getItem("breedUrl");
// Append breed name to end of url
window.location.hash = breed;

var subbreeds = loadBreedNames(breed);

const img = document.createElement('img');
img.src = url;
img.width = "366.6666666";
initApp();
var card = createCard(breed);
card.appendChild(img);

var url = getBreedUrl(breed);
if (url) {
  // Removes en.wikipedia part of url and gets title with _ replacing spaces
  var nameAndUnderscore = url.lastIndexOf('/');
  nameAndUnderscore = url.substring(nameAndUnderscore + 1, url.length);
  var description = getBreedContent(nameAndUnderscore);
}
//TODO: clean up createCard
const p = document.createElement('p');
p.textContent = description;
// Brabancon, corgi, deerhound, kelpie, malamute, mountain dog
if (p.textContent.includes("#REDIRECT")) {
  p.textContent = "The Wikipedia information for this breed: " + breed +
  " is on another link.";
}
container.appendChild(p);

for (var i = 0; i < subbreeds.length; i++) {
  loadBreedImage(breed, subbreeds[i]);
}

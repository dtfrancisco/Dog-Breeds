var app;
var container;

function initApp() {
  // Initialize app
  app = document.getElementById('root');
  container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.appendChild(container);
}

function createCard(breed) {
  breed = capitalize(breed);
  var parsedBreed = parsed(breed);
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('id', 'main');

  const h1 = document.createElement('h1');
  h1.textContent = parsedBreed;

  container.appendChild(card);
  card.appendChild(h1);
  return card;
}

function loadBreedNames(breed) {
  var breeds = [];
  var request = new XMLHttpRequest();
  if (breed.length == 0) {
    request.open('GET', 'https://dog.ceo/api/breeds/list', false);
  }
  else {
    request.open('GET', `https://dog.ceo/api/breed/${breed}/list`, false);
  }

  request.onload = function () {
    var data = JSON.parse(this.response);
    if (data.status == "success") {
      breeds = data.message;
    }
    else {
      const errorMessage = document.createElement('h1');
      errorMessage.textContent = "404: Page doesn't seem to be working";
      app.appendChild(errorMessage);
    }
  }
  request.send();
  return breeds;
}

function loadBreedImage(breed, subbreed) {
  var request = new XMLHttpRequest();
  if (!subbreed) {
    request.open('GET', `https://dog.ceo/api/breed/${breed}/images/random`, true);
  }
  else {
    request.open('GET', `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`, true);
  }
  request.onload = function () {
    var data = JSON.parse(this.response);

    if (data.status == "success") {
      //console.log(data);
      const img = document.createElement('img');
      img.src = data.message;
      img.width = "366.666666";

      const button = document.createElement('button');

      if (!subbreed) {
        //Store breed name and image URL in button
        button.setAttribute('id', breed+"~"+img.src);
        button.addEventListener('click', goToBreedPage);
        card = createCard(breed);
      }
      else {
        button.setAttribute('id', subbreed+"~"+img.src);
        button.addEventListener('click', goToSubbreedPage);
        card = createCard(subbreed);
      }

      card.appendChild(img);
      card.appendChild(button);
    }
    else {
      const errorMessage = document.createElement('h1');
      errorMessage.textContent = "404: Page doesn't seem to be working";
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function parsed(breed) {
  // Primary breeds
  if(breed == "Bullterrier") {
    return "Bull Terrier";
  }
  else if (breed == "Germanshepherd") {
    return "German Shepherd";
  }
  else if (breed == "Leonberg") {
    return "Leonberger";
  }
  else if (breed == "Mexicanhairless") {
    return "Mexican Hairless";
  }
  else if (breed == "Stbernard") {
    return "St. Bernard";
  }
  //TODO: Add Secondary/subbreeds
  return breed;
}

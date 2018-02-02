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

function loadBreedNames() {
  var breeds = [];
  var request = new XMLHttpRequest();
  request.open('GET', 'https://dog.ceo/api/breeds/list/all', false);

  request.onload = function () {
    var data = JSON.parse(this.response);
    if (data.status == "success") {
      var dogs = data.message;
      for (var breed in dogs) {
        breeds.push(breed);
      }
    }
    else {
      const errorMessage = document.createElement('error');
      errorMessage.textContent = "404: Page doesn't seem to be working";
      app.appendChild(errorMessage);
    }
  }
  request.send();
  return breeds;
}

function loadBreedImage(breed) {
  var request = new XMLHttpRequest();
  request.open('GET', `https://dog.ceo/api/breed/${breed}/images/random`, true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    if (data.status == "success") {
      const img = document.createElement('img');
      img.src = data.message;
      img.width = "366.666666";

      breed = capitalize(breed);
      var parsedBreed = parsed(breed);

      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      const h1 = document.createElement('h1');
      h1.textContent = parsedBreed;
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(img);
    }
    else {
      const errorMessage = document.createElement('error');
      errorMessage.textContent = "404: Page doesn't seem to be working";
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

// Initialize app
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

var breeds = loadBreedNames();
for (var i = 0; i < breeds.length; i++) {
  loadBreedImage(breeds[i]);
}

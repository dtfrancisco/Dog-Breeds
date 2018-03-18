var app;
var container;
var button;
var wikibox;

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

  const h1 = document.createElement('h1');
  h1.textContent = parsedBreed;

  container.appendChild(card);
  card.appendChild(h1);
  return card;
}

function createWikibox(description) {
  const wikibox = document.createElement('div');
  wikibox.setAttribute('class', 'wikibox');

  //const p = document.createElement('p');
  //p.textContent = description;

  var iframe = document.createElement('iframe');
  container.appendChild(wikibox);
  wikibox.appendChild(iframe);
  iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(description);
  iframe.contentWindow.document.open();
  iframe.contentWindow.document.write(description);
  iframe.contentWindow.document.close();

  return wikibox;
}

function loadBreedNames(breed) {
  console.log(breed);
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

      button = document.createElement('button');
      button.setAttribute('class', 'button');

      if (!subbreed) {
        //Store breed name and image URL in button
        button.setAttribute('id', breed+"~"+img.src);
        button.addEventListener('click', goToBreedPage);
        var card = createCard(breed);
      }
      else {
        button.setAttribute('id', subbreed+"~"+img.src);
        button.addEventListener('click', goToSubbreedPage);
        var card = createCard(subbreed);
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

function descriptionChecker(string) {
  if (string.includes("film")) {
  }
  else if (string.includes("dog") || string.includes("hound")) {
    return true;
  }
  return false;
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

// A concise summary of the Wikipedia article
//request.open('GET', "https://cors-anywhere.herokuapp.com/http://en.wikipedia."+
  //"org/w/api.php?action=query&prop=revisions&rvprop=content&prop=extracts&" +
  //"exintro=&explaintext=&format=json&titles="+breed, false);

request.open('GET', "https://cors-anywhere.herokuapp.com/http://en.wikipedia."+
    "org/w/api.php?action=query&prop=revisions&rvprop=content&rvparse&format=json&titles="+breed, false);
request.onload = function() {
  var data = JSON.parse(this.response);
  console.log(data);
  var pageId = Object.keys(data.query.pages) [0];
  description = data.query.pages[pageId].revisions[0]['*'];
  // Brabancon, corgi, deerhound, kelpie, malamute, mountain dog
  if (description.includes("#REDIRECT")) {
    //12 is index after second [. String appears as #REDIRECT [[
    if (description.includes('#REDIRECT ')) {
      var dog = description.slice(12, description.indexOf("]"));
    }
    // When space is not after redirect. Mountain dog had this case
    else {
      var dog = description.slice(11, description.indexOf("]"));
    }
    dog = dog.replace(' ', '_');
    description = getBreedContent(dog);
  }
  else {
    var wikibox = createWikibox(description);
  }
}
request.send();
return description;
}

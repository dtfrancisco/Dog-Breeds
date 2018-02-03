function goToBreedPage() {
  var props = event.target.id.split('~');
  localStorage.setItem("breed", props[0]);
  localStorage.setItem("breedUrl", props[1]);
  // Change HTML to dog.html
  document.location.href = 'breed.html';
}

initApp();
var breed = "";
var breeds = loadBreedNames(breed);
for (var i = 0; i < breeds.length; i++) {
  loadBreedImage(breeds[i]);
}

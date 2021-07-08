//Business Logic for PlacesBook ---------
function PlacesBook() {
  this.place = {};
  this.currentId = 0;
}

PlacesBook.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.place[place.id] = place;
};

PlacesBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

PlacesBook.prototype.findPlace = function(id) {
  if (this.places[id] != undefined) {
    return this.places[id];
  }
  return false;
};

PlacesBook.prototype.deletePlace = function(id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
};

//Business Logic for Contacts --------
function Place(place, time, notes) {
  this.place = place;
  this.time = time;
  this.notes = notes;
}

Place.prototype.placeTime = function() {
  return this.place + " " + this.time;
};

// User Interface Logic ------------
let placesBook = new PlacesBook();

function displayPlaceDetails(placesBookToDisplay) {
  let placeList = $("ul#places");
  let htmlForPlaceInfo = "";
  Object.keys(placesBookToDisplay.places).forEach(function(key) {
    const places = placesBookToDisplay.findPlace(key);
    htmlForPlaceInfo += "<li id=" + places.id + ">" + places.place + " " + places.time + "</li>";
  });
  placeList.html(htmlForPlaceInfo);
}

function showPlaces(placesId) {
  const places = placesBook.findPlace(placesId);
  $("#show-place").show();
  $(".place").html(places.place);
  $(".time").html(places.time);
  $(".notes").html(places.notes);
  let buttons = $("buttons");
  buttons.empty();
  buttons.append("<buttons class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachPlacesListeners() {
  $("ul#places").on("click", "li", function() {
    showPlaces(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    placesBook.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(placesBook);
  });
}

$(document).ready(function() {
  attachPlacesListeners();
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    const inputtedPlace = $("input#new-place").val();
    const inputtedTime = $("input#new-time").val();
    const inputtedNotes = $("input#new-notes").val();

    $("input#new-place").val("");
    $("input#new-time").val("");
    $("input#notes").val("");

    let newPlace = new Place(inputtedPlace, inputtedTime, inputtedNotes);
    placesBook.addPlace(newPlace);
    displayPlaceDetails(placesBook);
  });
});
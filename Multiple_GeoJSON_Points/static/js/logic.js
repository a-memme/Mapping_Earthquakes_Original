// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
//  Having tileLayer() before accessing large datasets ensures that the map gets loaded before data is added to it 

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
// Names of street/dark variables will represent what we see when opening the index.html file in order to toggle between different map layers 
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with a center and zoom level.
// layers:[streets] offers streets map as the default map
let map = L.map("mapid", {
    center: [40.7, -94.5],
    zoom: 4,
    layers: [streets]
  });

// Pass our map layers into our layers control and add the layers control to the map.
// baseMaps argument passed - allowing us to have the two different styles of map to be shown on the index.html file 
L.control.layers(baseMaps).addTo(map);

//  Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/a-memme/Mapping_Earthquakes/Second_Branch/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);

  // .bindPopup("<h2> Airport Code: " + data.icao + "</h2> <hr> <h3>Airport Name: " + data.name + "</h3>")

});

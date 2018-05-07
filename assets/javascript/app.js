$(document).ready(function () {




  mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ';


  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9",
    zoom:12.4,
    center: [-97.74155,30.26645]
 });



map.on("load", function () {
  /* Image: An image is loaded and added to the map. */
  map.loadImage("https://i.imgur.com/AfGZuH3.png", function(error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "markers",
        type: "symbol",
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features:[{"type":"Feature","geometry":{"type":"Point","coordinates":["-97.7314611111","30.2700861111"]}}]}
            
        },
        layout: {
          "icon-image": "custom-marker",
        }
        
      });
    });
});


  $.getJSON("resturants.json", function (data) {

    var citycoordx = data.location.latitude;
    var citycoordy = data.location.longitude;
    var citycoords = data.location.latitude+", "+data.location.longitude;

    console.log(data);

    console.log(data.nearby_restaurants[0]);
    console.log(typeof data.nearby_restaurants);



    for (i = 0; i < data.nearby_restaurants.length; i++) {
      // set vars to x and y for coord use
      var xcoord = data.nearby_restaurants[i].restaurant.location.latitude;
      var ycoord = data.nearby_restaurants[i].restaurant.location.longitude;
     
    }



    console.log(data.location.latitude);


  });


});
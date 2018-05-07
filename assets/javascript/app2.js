$(document).ready(function () {

  var mymap = L.map('mapid').setView([51.505, -0.09], 13);


  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
}).addTo(mymap);



  $.getJSON("resturants.json", function (data) {
    var citycoordx = data.location.latitude;
    var citycoordy = data.location.longitude;

    mymap.flyTo(new L.LatLng(citycoordx, citycoordy));
  
  
  

    console.log(data);

    console.log(data.nearby_restaurants[0]);
    console.log(typeof data.nearby_restaurants);



    for (i = 0; i < data.nearby_restaurants.length; i++) {
      // set vars to x and y for coord use
      var xcoord = data.nearby_restaurants[i].restaurant.location.latitude;
      var ycoord = data.nearby_restaurants[i].restaurant.location.longitude;
      var marker = L.marker([xcoord, ycoord]).addTo(mymap)
      ;
      marker.bindPopup("<b>"+data.nearby_restaurants[i].restaurant.name+"</b>"+"<br>"+
        data.nearby_restaurants[i].restaurant.location.address
        +"<br>"+"Cuisine:"+data.nearby_restaurants[i].restaurant.cuisines+"<br>"+"<img id='thumb' src="+data.nearby_restaurants[i].restaurant.thumb+"</img>");
    }



    console.log(data.location.latitude);


  });


});
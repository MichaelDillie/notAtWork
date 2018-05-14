$(document).ready(function () {

    $(".dn").on("click", function() {
        // $(".mapid").toggleID("toggle-mapid");
        $(".no-gutters").toggleClass("toggle-no-gutters");
        $("body").toggleClass("toggle-body");
        $(".main-row").toggleClass("toggle-main-row");
        $(".menu-url").toggleClass("toggle-menu-url");
        $(".head").toggleClass("toggle-head");
        $(".main-body").toggleClass("toggle-main-body");
        $(".restaurant-name").toggleClass("toggle-restaurant-name");
        $(".time-open-close").toggleClass("toggle-time-open-close");
        $(".distance").toggleClass("toggle-distance");

        
        // $("#mapid").toggleClass("#mapbox.light","mapbox.drak");
        // $("#mapid").toggleClass("background","#000");
        
        
      });
  //Makes variable Map and sets center to USA coords
  // Stays at a zoom of 6
  var mymap = L.map('mapid').setView([37.0902, -95.7129], 6);

  // API token and Map data Contribution footer
 
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
    maxZoom: 18,
    type: "raster",
    // background: "#000",
    // id: 'mapbox.dark',
    background: "#eee",
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
  }).addTo(mymap);


//   $(".dn").on("click", function(){

//     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//         attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
//         maxZoom: 18,
//         type: "raster",
//         background: "black",
//         id: 'mapbox.dark',
//         // background: "white",
//         // id: 'mapbox.light',
//         accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
//       }).addTo(mymap);

     
//       });
      


  //Ajax Json request

  $.getJSON("assets/javascript/resturants.json", function (data) {

    //magic button simulates the enter from a searchbox 
    // or a "search nearby" button
    $(".magicButton").click(function () {
 

      //Takes first Coord from Json and "flyTo" after entry of data with a zoom factor of 15 ( local level )
      var citycoordx = data.location.latitude;
      var citycoordy = data.location.longitude;
      mymap.flyTo(new L.LatLng(citycoordx, citycoordy), 15);

        // TODO: ADD OTHER ICONS FOR NUMBERED ITERATIONS MARKERS

      //Creates Yellow Icon for use in markers
      var greenIcon = L.icon({
        iconUrl: 'assets/images/markerYellow.png',
        shadowUrl: 'assets/images/markerYellowShadowLighter.png',

        iconSize: [32, 40], // size of the icon
        shadowSize: [32, 40], // size of the shadow
        iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
        shadowAnchor: [19, 42], // the same for the shadow
        popupAnchor: [-5, -10] // point from which the popup should open relative to the iconAnchor
      });


      //Loops through Json to Create Markers, Labels, and Icons
      for (i = 0; i < data.nearby_restaurants.length; i++) {
        // set vars to x and y for coord use
        var xcoord = data.nearby_restaurants[i].restaurant.location.latitude;
        var ycoord = data.nearby_restaurants[i].restaurant.location.longitude;

        //Chooses the icons for the Markers
        var marker = L.marker([xcoord, ycoord], {
          icon: greenIcon
        }).addTo(mymap);

        // CREATES THE POPUP LABEL
        marker.bindPopup("<b>" + data.nearby_restaurants[i].restaurant.name + "</b>" + "<br>" +
          data.nearby_restaurants[i].restaurant.location.address +
          "<br>" + "Cuisine:" + data.nearby_restaurants[i].restaurant.cuisines + "<br>" + "<img id='thumb' src=" + data.nearby_restaurants[i].restaurant.thumb + "</img>");
      }





    });

  });

  //EVERYTHING ABOVE THIS IS DAVID



    var sectionContainer = $(".section-container");

    function ajaxOne() {
        $.ajax({
            headers: {
                "user-key": "465c36f62f7c99a289666a2388692476"
            },
            url: "https://developers.zomato.com/api/v2.1/locations?query=austin&count=5"
        }).then(function (response) {
            var lat = response.location_suggestions[0].latitude;
            var lon = response.location_suggestions[0].longitude;
            var cityId = response.location_suggestions[0].entity_id;
            // console.log("lat " + lat + " | " + "lon " + lon + " | City ID " + cityId);
            ajaxTwo(lat, lon);
        });
    }

    function ajaxTwo(lat, lon) {
        $.ajax({
            headers: {
                "user-key": "465c36f62f7c99a289666a2388692476"
            },
            url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon + "&count=30"
        }).then(function (response) {
            for (var i = 0; i < response.nearby_restaurants.length; i++) {
                var restaurantImgData = response.nearby_restaurants[i].restaurant.featured_image;
                var restaurantNameData = response.nearby_restaurants[i].restaurant.name;
                var ratingData = response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating;
                var restaurantMenuUrlData = response.nearby_restaurants[i].restaurant.menu_url;
                var restaurantAddressData = response.nearby_restaurants[i].restaurant.location.address;
                var restaurantIdData = response.nearby_restaurants[i].restaurant.R.res_id;


                // Creating the main row
                var mainRow = $("<div>");
                mainRow.addClass("row main-row");

                // Creating col One
                var colOne = $("<div>");
                colOne.addClass("col-md-1 col-one");
                var restaurantImg = $("<img>");
                restaurantImg.addClass("restaurant-img");
                restaurantImg.attr("src", restaurantImgData);
                colOne.append(restaurantImg);

                // Creating col Two
                var colTwo = $("<div>");
                colTwo.addClass("col-md-6 col-two");
                // Restaurant Name
                var restaurantNameRow = $("<div>");
                restaurantNameRow.addClass("row");
                colTwo.append(restaurantNameRow);
                var restaurantName = $("<div>");
                restaurantName.addClass("col-md-12 restaurant-name");
                restaurantName.text(restaurantNameData);
                restaurantNameRow.append(restaurantName);
                // Time open-close
                var timeOpenCloseRow = $("<div>");
                timeOpenCloseRow.addClass("row");
                colTwo.append(timeOpenCloseRow);
                var timeOpenClose = $("<div>");
                timeOpenClose.addClass("col-sm-12 time-open-close");
                timeOpenClose.text("Open 8AM - 10PM");
                timeOpenCloseRow.append(timeOpenClose);
                // Distance
                var distanceRow = $("<div>");
                distanceRow.addClass("row");
                colTwo.append(distanceRow);
                var distance = $("<div>");
                distance.addClass("col-sm-12 distance");
                distance.text("1.3 miles");
                distanceRow.append(distance);

                // Creating col Three
                var colThree = $("<div>");
                colThree.addClass("col-md-5 col-three");
                // Rating
                var ratingRow = $("<div>");
                ratingRow.addClass("row");
                colThree.append(ratingRow);
                var rating = $("<div>");
                rating.addClass("col-md-2 rating");
                rating.text(ratingData);
                ratingRow.append(rating);
                // Menu URL
                var menuUrlRow = $("<div>");
                menuUrlRow.addClass("row");
                colThree.append(menuUrlRow);
                var menuUrl = $("<a>");
                menuUrl.addClass("col-sm-12 menu-url");
                menuUrl.attr("href", restaurantMenuUrlData);
                menuUrl.text(" Menu");
                menuUrlRow.append(menuUrl);
                // Address
                var addressRow = $("<div>");
                addressRow.addClass("row");
                colThree.append(addressRow);
                var address = $("<div>");
                address.addClass("col-sm-12 address");
                address.text(restaurantAddressData);
                addressRow.append(address);


                //  Creating the section
                mainRow.append(colOne);

                mainRow.append(colTwo);

                mainRow.append(colThree);

                sectionContainer.append(mainRow);

            }
        });
    }
    ajaxOne();

    // for changing modes
    mapboxgl.accessToken = 'undefined';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/basic-v9',
        zoom: 13,
        center: [4.899, 52.372]
    });
    
    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');
    
    function switchLayer(layer) {
        var layerId = layer.target.id;
        map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
    }
    
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = switchLayer;
    }

    // changing mode 
    

});
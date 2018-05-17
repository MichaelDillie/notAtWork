$(document).ready(function () {
    
    var mapBuildCoords;
    

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
        $("footer").toggleClass("toggle-footer");
        $("i").toggleClass("toggle-i");
        $("L.tileLayer.mapbox.light").toggleClass("id","L.tileLayer.mapbox.dark");


      });
  //Makes variable Map and sets center to USA coords
  // Stays at a zoom of 6
  var mymap = L.map('mapid').setView([37.0902, -95.7129], 6);

  // API token and Map data Contribution footer

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
    maxZoom: 18,
    type: "raster",
    background: "#000",
    // id: 'mapbox.dark',
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
  }).addTo(mymap);

  var isLight = true;
  $(".dn").on("click", function(){
      if(isLight === true){
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
        maxZoom: 18,
        type: "raster",
        background: "#000",
        id: 'mapbox.light',
        // id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
      }).remove(mymap);


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
        maxZoom: 18,
        type: "raster",
        background: "#000",
        id: 'mapbox.dark',
        // id: 'mapbox.light',
        accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
      }).addTo(mymap);
      isLight = false;
    } else {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
            maxZoom: 18,
            type: "raster",
            background: "#000",
            id: 'mapbox.dark',
            // id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
          }).remove(mymap);


        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: ' <a href="https://www.openstreetmap.org/">&copy;OpenStreetMap </a><a href="https://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, <a href="https://www.mapbox.com/">Imagery © Mapbox</a>',
            maxZoom: 18,
            type: "raster",
            background: "#000",
            id: 'mapbox.light',
            // id: 'mapbox.light',
            accessToken: 'pk.eyJ1IjoiZGF2aWRvZmxvcmVzIiwiYSI6ImNqZ3NjdmVvbTAxaHcyenF0cWViOXA1cWsifQ.oVUanCyMScIkw_DKQWxGpQ'
          }).addTo(mymap);
          isLight = true;
    }
  });






  //Ajax Json request

  $.getJSON("assets/javascript/resturants.json", function (data) {

    //magic button simulates the enter from a searchbox
    // or a "search nearby" button
    $(".magicButton").click(function () {

        navigator.geolocation.getCurrentPosition(success, error);

        function success(pos) {
            var crd = pos.coords;

            console.log("Current position is:");
            console.log("Latitude :" +  (crd.latitude));
            console.log("Longitude:" +  (crd.longitude));
            ajaxOne(crd.latitude, crd.longitude);
          }

          function error(err) {
            console.warn("ERROR(${err.code}): ${err.message}");
          }




    });

  });

  var bounds = [];
  function mapBuilder(mapBuildCoords) {
    //Takes first Coord from Json and "flyTo" after entry of data with a zoom factor of 15 ( local level )
    data = mapBuildCoords;
    var citycoordx = data.location.latitude;
    var citycoordy = data.location.longitude;
    mymap.flyTo(new L.LatLng(citycoordx, citycoordy), 15);

      // TODO: ADD OTHER ICONS FOR NUMBERED ITERATIONS MARKERS

      // Grabs cords from map and inputs them to Zamoto
      // ajaxOne(citycoordx, citycoordy);

    //Creates Yellow Icon for use in markers
    var greenIcon = L.icon({
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
        markerNum = i+1;
      //Chooses the icons for the Markers
      greenIcon.options.iconUrl = 'assets/images/markerYellow'+markerNum+'.png';
      var marker = L.marker([xcoord, ycoord], {
        icon: greenIcon
      }).addTo(mymap);
      construct = xcoord+", "+ycoord;
      bounds.push(construct);
      console.log(bounds);
    
      // CREATES THE POPUP LABEL
      marker.bindPopup("<b>" + data.nearby_restaurants[i].restaurant.name + "</b>" + "<br>" +
        data.nearby_restaurants[i].restaurant.location.address +
        "<br>" + "Cuisine:" + data.nearby_restaurants[i].restaurant.cuisines + "<br>" + "<img id='thumb' src=" + data.nearby_restaurants[i].restaurant.thumb + "</img>");

   
        
    }}
  
        
   

  //EVERYTHING ABOVE THIS IS DAVID



    var sectionContainer = $(".section-container");

    function ajaxOne(cordx, cordy) {
        $.ajax({
            headers: {
                "user-key": "465c36f62f7c99a289666a2388692476"
            },
            url: "https://developers.zomato.com/api/v2.1/locations?query=austin&count=5"
        }).then(function (response) {
            var lat = cordx;
            var lon = cordy;
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
            mapBuilder(response);
            
            


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

});
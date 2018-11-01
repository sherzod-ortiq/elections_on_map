function takeScope(scope) {
  $scope = scope;
}

var rect1Coord = [[57.63, 43.26],[51.93, 59.265]],
    rect2Coord = [[56.63, 47.26],[53.93, 54.265]],
    myPlacemark1;

var manualSearch = function(addressData,$scope){
  var adminArea,firstGeoObject,coords,bounds,i,distNumber;
    ymaps.geocode(addressData, {
      boundedBy: rect2Coord,
      strictBounds: false,         
      results: 1
    }).then(function (res) {
        firstGeoObject = res.geoObjects.get(0),
        adminArea = firstGeoObject.getAdministrativeAreas();

        if(adminArea[0] == "Республика Татарстан" && adminArea[1] != null){
          coords = firstGeoObject.geometry.getCoordinates();  
          bounds = firstGeoObject.properties.get('boundedBy');

          for(i in myData.districts) {
            if(myData.districts[i].distName == adminArea[1]){
              distNumber = i;
		          break;
            }
          }                

          $scope.displayCondid(distNumber,"manualSearch",adminArea[1]);

          if(myPlacemark1){           
            myPlacemark1.geometry.setCoordinates(coords);
            myPlacemark1.properties.set('iconContent', adminArea[1])
            mmap.setBounds(bounds, {
                  checkZoomRange: true
                });
            mmap.geoObjects.add(myPlacemark1);
          }else{
            myPlacemark1 = new ymaps.Placemark(coords,
              {
               iconContent: adminArea[1],
               hasHint: false,
               hasBalloon: false
              }, 
              {
               preset: 'islands#redStretchyIcon'
              }
            );

            mmap.geoObjects.add(myPlacemark1);
            mmap.setBounds(bounds, {
                  checkZoomRange: true
                });
          }             
        }
        else{
          if(myPlacemark1){
            mmap.geoObjects.remove(myPlacemark1);
          }

          mmap.setBounds(rect2Coord, {
                checkZoomRange: true
              });

          $scope.displayError("manualSearch");
        }
      },
      function(err){}
    );
}

var geolocationSearch = function($scope){
  var adminArea,firstGeoObject,coords,bounds,i,distNumber;
    ymaps.geolocation.get({
    }).then(function (res) {
        firstGeoObject = res.geoObjects.get(0),
        adminArea = firstGeoObject.getAdministrativeAreas();

        if(adminArea[0] == "Республика Татарстан" && adminArea[1] != null){
          coords = firstGeoObject.geometry.getCoordinates();  
          bounds = firstGeoObject.properties.get('boundedBy');

          for(i in myData.districts) {
            if(myData.districts[i].distName == adminArea[1]){
              distNumber = i;
              break;
            }
          }                

          $scope.displayCondid(distNumber,"geolocationSearch",adminArea[1]);

          if(myPlacemark1){           
            myPlacemark1.geometry.setCoordinates(coords);
            myPlacemark1.properties.set('iconContent', adminArea[1])
            mmap.setBounds(bounds, {
                 checkZoomRange: true
                 });
            mmap.geoObjects.add(myPlacemark1);
          }
          else{
            myPlacemark1 = new ymaps.Placemark(coords,
              {
                iconContent: adminArea[1],
                hasHint: false,
                hasBalloon: false
              }, 
              {
                preset: 'islands#redStretchyIcon'
              }
            );

            mmap.geoObjects.add(myPlacemark1);
            mmap.setBounds(bounds, {
                  checkZoomRange: true
                });
          }             
        }
        else{
          if(myPlacemark1){
            mmap.geoObjects.remove(myPlacemark1);
          }

          mmap.setBounds(rect2Coord, {
                checkZoomRange: true
              });

          $scope.displayError("geolocationSearch");
        }
      },
      function(err){}
    );   
}


var clickSearch = function(addressData){
  var adminArea,firstGeoObject,coords,bounds,i,distNumber;
    ymaps.geocode(addressData, {
      boundedBy: rect2Coord,
      strictBounds: false,         
      results: 1
    }).then(function (res) {
        firstGeoObject = res.geoObjects.get(0),
        adminArea = firstGeoObject.getAdministrativeAreas();

          coords = firstGeoObject.geometry.getCoordinates();  
          bounds = firstGeoObject.properties.get('boundedBy');

          for(i in myData.districts) {
            if(myData.districts[i].distName == adminArea[1]){
              distNumber = i;
              break;
            }
          }                

          $scope.displayCondid(distNumber,"clickSearch",adminArea[1]);

          if(myPlacemark1){           
            myPlacemark1.geometry.setCoordinates(coords);
            myPlacemark1.properties.set('iconContent', adminArea[1])
            mmap.setBounds(bounds, {
                  checkZoomRange: true
                });
            mmap.geoObjects.add(myPlacemark1);
          }else{
            myPlacemark1 = new ymaps.Placemark(coords,
              {
               iconContent: adminArea[1],
               hasHint: false,
               hasBalloon: false
              }, 
              {
               preset: 'islands#redStretchyIcon'
              }
            );

            mmap.geoObjects.add(myPlacemark1);
            mmap.setBounds(bounds, {
                  checkZoomRange: true
                });
          }             
      },
      function(err){}
    );
}



    
ymaps.ready(init);

function init(){
  mmap = new ymaps.Map("map", 
    {
      center: [55.32533355,50.680037182393], 
      zoom: 6,
      type: 'yandex#satellite',
      controls: ['zoomControl']
    },
    {
      maxZoom: 9,
      minZoom: 5,
      restrictMapArea: rect1Coord
    }
  );

  myRectangle1 = new ymaps.Rectangle(
      rect1Coord,
    {
    },
    {
      zIndex: 2,
      fillColor: '#FEFEFE',
      hasBalloon: false,
      hasHint: false,
      outline: false,
      cursor: false
    }
  );

  myRectangle2 = new ymaps.Rectangle(
     rect2Coord,
   {
   },
   {
      fillImageHref: 'mapImage.jpg',
      zIndex: 3,
      hasBalloon: false,
      hasHint: false,
      outline: false
    }
  );

  myRectangle2.events.add('click', function (event){
    var coords = event.get('coords');
    var adminArea,firstGeoObject,coords;

    ymaps.geocode(coords, {
      boundedBy: rect2Coord,
      strictBounds: false,         
      results: 1
    }).then(function (res) {
        firstGeoObject = res.geoObjects.get(0),
        adminArea = firstGeoObject.getAdministrativeAreas();

        if(adminArea[0] == "Республика Татарстан" && adminArea[1] != null){
          clickSearch(adminArea[1],$scope);
        }
        else{
          if(myPlacemark1){
            mmap.geoObjects.remove(myPlacemark1);
          }

          $scope.displayError("clickSearch");
        }
      },
      function(err){}
    );
});

  mmap.geoObjects
      .add(myRectangle1)
      .add(myRectangle2);
}
 

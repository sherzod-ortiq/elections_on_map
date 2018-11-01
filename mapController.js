var app = angular.module("myApp", ['ngMaterial']);
  app.controller("myController", function($scope) {
    $scope.myObject = myData;
    $scope.visibleBox = "none";
    $scope.errorVisibleBox = "none";
    $scope.distNumber = "";
    $scope.adminArea = "";
    $scope.warningMessage = "";
    $scope.errorMessage = "";
    $scope.choise1 = "";
    $scope.choise2 = ["","","","",""];
    $scope.checkboxVal =  [false,false,false,false,false];
    $scope.choise2Visibility = ["none","none","none","none","none"];
    $scope.radioVal = false;
    $scope.confirmedChoise = {"firstTypeChoise":"","secondTypeChoise":[]};
    $scope.confirmChoiseError="";
    $scope.index = "";

    $scope.sendScope = function(){
      takeScope($scope);
    };

    $scope.sendScope();

    $scope.NgManualSearch = function(data){
      manualSearch(data,$scope);
    };

    $scope.NgGeolocationSearch = function(){
      geolocationSearch($scope);
    };

    $scope.displayCondid = function(distNumber,searchType,adminArea){
      $scope.distNum = distNumber;
      $scope.adminArea = adminArea;

      if(searchType == "manualSearch"){
        $scope.warningMessage = "";
      }
      else if(searchType == "geolocationSearch"){
        $scope.warningMessage = "Применяйте ручной поиск если результаты не правильные";
      }
      else if(searchType == "clickSearch"){
        $scope.warningMessage = "Применяйте ручной поиск если результаты не правильные";
      }

      $scope.visibleBox = "initial";
      $scope.errorVisibleBox = "none";
      $scope.choise1 = "";
      $scope.choise2 = ["","","","",""];
      $scope.checkboxVal =  [false,false,false,false,false];
      $scope.choise2Visibility = ["none","none","none","none","none"];
      $scope.confirmedChoise = {"firstTypeChoise":"","secondTypeChoise":[]};
      $scope.confirmChoiseError="";
      $scope.index = "";
      $scope.$apply();
    };

    $scope.displayError = function(searchType){
      if(searchType == "manualSearch"){
        $scope.errorMessage = "По вашему запросу ничего не найдено, попробуйте еше раз.";
      }
      else if(searchType == "geolocationSearch"){
        $scope.errorMessage = "Ваше место расположения не принадлежит Татарстану, попробуйте ручной поиск.";        
      }
      else if(searchType == "clickSearch"){
        $scope.errorMessage = "Не кликайте на реку и за пределы карты Татарстана";        
      }


      $scope.errorVisibleBox = "initial";
      $scope.visibleBox = "none";
      $scope.choise1 = "";
      $scope.choise2 = ["","","","",""];
      $scope.checkboxVal =  [false,false,false,false,false];
      $scope.choise2Visibility = ["none","none","none","none","none"];
      $scope.confirmedChoise = {"firstTypeChoise":"","secondTypeChoise":[]};
      $scope.confirmChoiseError="";
      $scope.index = "";
      $scope.$apply();
    };

    $scope.displayChoise1 = function(object){
      $scope.choise1 = object;
      $scope.confirmChoiseError="";
    };

    $scope.displayChoise2 = function(index,object){
      if($scope.checkboxVal[index] == true){
        $scope.choise2[index] = object;
        $scope.choise2Visibility[index] = "initial";
      }else{
        $scope.choise2[index] = "";
        $scope.choise2Visibility[index] = "none";
      }
      $scope.confirmChoiseError="";
      $scope.$apply();
    };

    $scope.confirmChoise = function(){
      if($scope.choise1 != ""){
        for(x in $scope.choise2){
          if($scope.choise2[x] != ""){
            $scope.confirmedChoise.firstTypeChoise = $scope.choise1;
            $scope.index = 0;
              for(i in $scope.choise2){
                if($scope.choise2[i] != ""){
                  $scope.confirmedChoise.secondTypeChoise[$scope.index] = $scope.choise2[i];
                  $scope.index ++;
                }
              }
            break;
          }
        }
      }
        if($scope.index == ""){
          $scope.confirmChoiseError="Вы выбрали недостаточное количество кандидатов";          
        }else{
          $scope.confirmChoiseError="";
        }
    };

/*Konstantin Vladimirovich:
  $scope.confirmedChoise = {"firstTypeChoise":"","secondTypeChoise":[]}; this is the object which you can send to server in JSON format
  and extract the list of condidates
*/


});

var map;
    angular.module('todoApp', [])
    .directive("draggable", function(){
	    return {
	        restrict: "A",
	        link: function (scope, element, attrs) {
	            $(element).draggable();
	        }
	    };
	})
    .directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})
    .controller('TodoController', function($scope) {
        $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip(); 
        });

        $scope.transactionData = [
          {type: 'Reward Reservation Night', tcount: 0, mcount: 0, avg: 7},
          {type: 'Profile Change', tcount: 0, mcount: 0, avg: 8},
          {type: 'Fraudulent Email', tcount: 0, mcount: 0, avg: 9},
          {type: 'Phone Number Change', tcount: 0, mcount: 0, avg: 7},
          {type: 'Digital Signature', tcount: 0, mcount: 0, avg: 10},
        ];

        $scope.splitfiveNum = function(num){
          var spli = num/5;
          var subt = Math.floor(spli * 48 / 100);
          var eachv = spli - subt;
          var arr = [eachv,eachv,eachv,eachv,eachv];
          for(i=0;i<5;i++){
            var ind = Math.floor(Math.random() * 5);
            arr[ind] = arr[ind] + subt;
            }
          return arr;
        }

        $scope.search = function(){
            var arr = $scope.screen3Mock.map(function(a){
              return a.id;
            });

            var ind = arr.indexOf($scope.info.search);

            $scope.info.active_member = ind;
        };

        $scope.info = {active_member: 0, search: ''};

        $scope.popup = function(){
          $scope.info.active_member = 0;
          $("#myModal").modal('show');
        };

        $scope.pagetwo = function(ind, min, s){
          if(ind){
            $scope.selectedData = ind;
          }
          
          $scope.selectedDataTime = min;
          $scope.selectedWindow = [];

          var cnt1 = $scope.splitfiveNum($scope.selectedData.TRANSACTION_DATA[s]);
          var cnt2 = $scope.splitfiveNum($scope.selectedData.MEMBER_DATA[s]);

          angular.forEach($scope.transactionData, function(v,k){
            v.tcount = cnt1[k];
            v.mcount = cnt2[k];
          });
        };

          $scope.currentDate = new Date().getTime();

          $scope.selectedData = {};
          $scope.markers = [];

          $scope.selectedWindow = [];

          $scope.removeSelected = function(ind){
          	$scope.selectedWindow.splice(ind, 1);
          };

          $scope.getColorclass = function(name){
            if(!name) return;
            name = name.split('(')[1].split(')')[0];
            if(name >= 500){
                clr = 'red';
            } else if(name >= 100){
                clr = 'amber';
            } else{
                clr = 'green';
            }
            return clr+'_clr';
          }

          $scope.mockData = [
                  {
                    "MAINADDRESS_COUNTRY":"USA", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 7, "FIVEMIN":20, "ONEDAY":40, "ONEWEEK": 80, "ONEMONTH": 350, "THREEMONTH": 800, "LATITUDE": 37.588119, "LONGITUDE": -95.370119}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 7, "FIVEMIN":10, "ONEDAY":25, "ONEWEEK": 60, "ONEMONTH": 200, "THREEMONTH": 600, "LATITUDE": 42.948381, "LONGITUDE": -115.049012}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"South Africa", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 9, "FIVEMIN":60, "ONEDAY":140, "ONEWEEK": 250, "ONEMONTH": 500, "THREEMONTH": 600, "LATITUDE": -7.874265, "LONGITUDE": 16.377877}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 7,  "FIVEMIN":35, "ONEDAY":47, "ONEWEEK": 97, "ONEMONTH": 200, "THREEMONTH": 500, "LATITUDE": -8.570158, "LONGITUDE": 32.542681}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"India", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 9,  "FIVEMIN":105, "ONEDAY":170, "ONEWEEK": 240, "ONEMONTH": 500, "THREEMONTH": 800, "LATITUDE": 28.777289, "LONGITUDE": 76.117372}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 7,  "FIVEMIN":60, "ONEDAY":110, "ONEWEEK": 200, "ONEMONTH": 400, "THREEMONTH": 600, "LATITUDE": 14.445319, "LONGITUDE": 78.225824}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"China", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 9, "FIVEMIN":600, "ONEDAY":640, "ONEWEEK": 750, "ONEMONTH": 800, "THREEMONTH": 1600, "LATITUDE": 34.818313, "LONGITUDE": 88.334275}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 9,  "FIVEMIN":300, "ONEDAY":400, "ONEWEEK": 500, "ONEMONTH": 600, "THREEMONTH": 800, "LATITUDE": 30.377614, "LONGITUDE": 100.633583}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"Mexico", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 7, "FIVEMIN":100, "ONEDAY":150, "ONEWEEK": 200, "ONEMONTH": 500, "THREEMONTH": 800, "LATITUDE": 23.634501, "LONGITUDE": -102.552788}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 7, "FIVEMIN":60, "ONEDAY":140, "ONEWEEK": 170, "ONEMONTH": 300, "THREEMONTH": 600, "LATITUDE": 23.110681, "LONGITUDE": -101.143643}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"Canada", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 7,"FIVEMIN":90, "ONEDAY":150, "ONEWEEK": 200, "ONEMONTH": 500, "THREEMONTH": 800, "LATITUDE": 56.130367, "LONGITUDE": -106.346771}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 5, "FIVEMIN":70, "ONEDAY":100, "ONEWEEK": 180, "ONEMONTH": 300, "THREEMONTH": 500, "LATITUDE": 56.078167, "LONGITUDE": -122.842410}
                  },
                  {
                    "MAINADDRESS_COUNTRY":"Italy", 
                    "TRANSACTION_DATA":
                      {"FRAUDSCORE": 27,  "FIVEMIN":200, "ONEDAY":400, "ONEWEEK": 500, "ONEMONTH": 600, "THREEMONTH": 800, "LATITUDE": 41.871941, "LONGITUDE": 12.567380}, 
                    "MEMBER_DATA":
                      {"FRAUDSCORE": 9, "FIVEMIN":100, "ONEDAY":150, "ONEWEEK": 400, "ONEMONTH": 500, "THREEMONTH": 1000, "LATITUDE": 42.452088, "LONGITUDE": 11.983245}
                  }
              ];


          $scope.screen3Mock = [
                {
                      id: 'XAT-1101',
                      score: 9,
                      similar_pattern: 10,
                      is_fraud: true,
                      score_details : {
                        'email': 
                          {
                            ts: '03-21-2019 18:21 EST',
                            transaction: 3,
                            member: 4
                          },
                        'password': 
                          {
                            ts: '03-21-2019 19:21 EST',
                            transaction: 5,
                            member: 6
                          },
                        'address': 
                          {
                            ts: '03-21-2019 19:51 EST',
                            transaction: 7,
                            member: 7
                          },
                        'rewards': 
                          {
                            ts: '04-21-2019 12:21 EST',
                            transaction: 8,
                            member: 9
                          }
                        }
                },
                {
                      id: 'XAT-1102',
                      score: 8,
                      similar_pattern: 18,
                      is_fraud: false,
                      score_details : {
                        'email': 
                          {
                            ts: '03-21-2019 17:21 EST',
                            transaction: 3,
                            member: 3
                          },
                        'password': 
                          {
                            ts: '03-21-2019 19:21 EST',
                            transaction: 4,
                            member: 5
                          },
                        'address': 
                          {
                            ts: '03-21-2019 19:51 EST',
                            transaction: 6,
                            member: 7
                          },
                        'rewards': 
                          {
                            ts: '04-21-2019 12:21 EST',
                            transaction: 9,
                            member: 8
                          }
                        }
                },
                {
                      id: 'XAT-1103',
                      score: 9,
                      similar_pattern: 10,
                      is_fraud: true,
                      score_details : {
                        'email': 
                          {
                            ts: '03-21-2019 18:25 EST',
                            transaction: 2,
                            member: 4
                          },
                        'password': 
                          {
                            ts: '03-21-2019 19:20 EST',
                            transaction: 5,
                            member: 5
                          },
                        'address': 
                          {
                            ts: '03-21-2019 19:55 EST',
                            transaction: 6,
                            member: 7
                          },
                        'rewards': 
                          {
                            ts: '04-21-2019 12:20 EST',
                            transaction: 8,
                            member: 9
                          }
                        }
                },
                {
                      id: 'XAT-1104',
                      score: 9,
                      similar_pattern: 5,
                      is_fraud: false,
                      score_details : {
                        'email': 
                          {
                            ts: '03-21-2019 18:21 EST',
                            transaction: 3,
                            member: 4
                          },
                        'password': 
                          {
                            ts: '03-21-2019 19:21 EST',
                            transaction: 5,
                            member: 6
                          },
                        'address': 
                          {
                            ts: '03-21-2019 19:51 EST',
                            transaction: 7,
                            member: 7
                          },
                        'rewards': 
                          {
                            ts: '04-21-2019 12:21 EST',
                            transaction: 8,
                            member: 9
                          }
                        }
                },
                {
                      id: 'XAT-1105',
                      score: 9,
                      similar_pattern: 8,
                      is_fraud: false,
                      score_details : {
                        'email': 
                          {
                            ts: '03-21-2019 18:21 EST',
                            transaction: 3,
                            member: 4
                          },
                        'password': 
                          {
                            ts: '03-21-2019 19:21 EST',
                            transaction: 5,
                            member: 6
                          },
                        'address': 
                          {
                            ts: '03-21-2019 19:51 EST',
                            transaction: 7,
                            member: 7
                          },
                        'rewards': 
                          {
                            ts: '04-21-2019 12:21 EST',
                            transaction: 8,
                            member: 9
                          }
                        }
                }
          ];

          $scope.filters = {transaction: 7, member: 7};

          $scope.filterMap = function(){
            for (var i = 0; i < $scope.markers.length; i++) {
              $scope.markers[i].setMap(null);
            }
            $scope.markers = [];
            $scope.plotMarker();
          };

          $scope.topTransaction = [];
          $scope.topMember = [];

          $scope.resetMap = function(){
            map.setCenter(new google.maps.LatLng(38.694085,-1.710901));
            map.setZoom(2);
          };

          $scope.plotMarker = function(){
              $scope.topTransaction = [];
              $scope.topMember = [];
              var labelAnchor = new google.maps.Point(10, 48);
              var zoomMap =false;
              var zoomFlag = true;
              /*if($scope.filters.transaction > 7 || $scope.filters.member > 7){
                var zoomMap = true;
                labelAnchor = new google.maps.Point(15, 75);
                $("body").addClass('zoommap');
              } else {
                map.setCenter(new google.maps.LatLng(38.694085,-1.710901));
                map.setZoom(2);
                $("body").removeClass('zoommap');
              }*/

              angular.forEach($scope.mockData, function(v,i){

                    var labelColor;

                    if($scope.filters.transaction >= 7 && $scope.filters.transaction <= v.TRANSACTION_DATA.FRAUDSCORE){
                        
                        if(zoomMap && zoomFlag){
                            map.setCenter(new google.maps.LatLng(v.TRANSACTION_DATA.LATITUDE, v.TRANSACTION_DATA.LONGITUDE));
                            map.setZoom(5);
                            zoomFlag = false;
                        }

                        $scope.topTransaction.push(v.MAINADDRESS_COUNTRY+' ('+v.TRANSACTION_DATA.FIVEMIN+')');

                        if(v.TRANSACTION_DATA.FIVEMIN >= 500){
                            labelColor = '#d9534f';
                            v.labelClass = "red_color";
                        } else if(v.TRANSACTION_DATA.FIVEMIN >= 100){
                            labelColor = '#ffbf00';
                            v.labelClass = "amber_color";
                        } else{
                            labelColor = '#5cb85c';
                            v.labelClass = "green_color";
                        }

                        var marker = new MarkerWithLabel({
                            position: new google.maps.LatLng(v.TRANSACTION_DATA.LATITUDE, v.TRANSACTION_DATA.LONGITUDE),
                            map: map,
                            ind: v,
                            selType: "TRANSACTION_DATA",
                            labelContent: v.TRANSACTION_DATA.FIVEMIN,
                            labelAnchor: labelAnchor,
                            labelClass: "labels", // the CSS class for the label
                            labelInBackground: false,
                            icon: pinSymbol(labelColor, zoomMap ? 2 : 1.3)
                        });

                        $scope.markers.push(marker);

                        google.maps.event.addListener(marker, "click", function (e) {
                            //$("#myModal").modal('show');
                            //$scope.selectedData = this;
                            $scope.selectedWindow.push(this);
                            $scope.$apply();
                        });
                    }

                    var labelColor2;
                    if($scope.filters.member >= 7 && $scope.filters.member <= v.MEMBER_DATA.FRAUDSCORE){
                        
                        if(zoomMap && zoomFlag){
                            map.setCenter(new google.maps.LatLng(v.MEMBER_DATA.LATITUDE, v.MEMBER_DATA.LONGITUDE));
                            map.setZoom(5);
                            zoomFlag = false;
                        }

                        $scope.topMember.push(v.MAINADDRESS_COUNTRY+' ('+v.MEMBER_DATA.FIVEMIN+')');

                        if(v.MEMBER_DATA.FIVEMIN >= 500){
                            labelColor2 = '#d9534f';
                            v.labelClass = "red_color";
                        } else if(v.MEMBER_DATA.FIVEMIN >= 100){
                            labelColor2 = '#ffbf00';
                            v.labelClass = "amber_color";
                        } else{
                            labelColor2 = '#5cb85c';
                            v.labelClass = "green_color";
                        }

                        var marker2 = new MarkerWithLabel({
                            position: new google.maps.LatLng(v.MEMBER_DATA.LATITUDE, v.MEMBER_DATA.LONGITUDE),
                            map: map,
                            ind: v,
                            selType: "MEMBER_DATA",
                            labelContent: v.MEMBER_DATA.FIVEMIN,
                            labelAnchor: labelAnchor,
                            labelClass: "labels", // the CSS class for the label
                            labelInBackground: false,
                            icon: pinSymbol(labelColor2, zoomMap ? 2 : 1.3)
                        });

                        $scope.markers.push(marker2);

                        google.maps.event.addListener(marker2, "click", function (e) {
                            //$("#myModal").modal('show');

                            //$scope.selectedData = this;
                            $scope.selectedWindow.push(this);
                            $scope.$apply();

                        });
                    }
              });

              $scope.topTransaction.sort(function(a1, b1){
                a = a1.replace("(", "").replace(")", "").split(" ").pop();
                b = b1.replace("(", "").replace(")", "").split(" ").pop();
                return b-a
              });

              $scope.topMember.sort(function(a1, b1){
                a = a1.replace("(", "").replace(")", "").split(" ").pop();
                b = b1.replace("(", "").replace(")", "").split(" ").pop();
                return b-a
              });


              if(!$scope.$$phase) {
                $scope.$apply();
              }
          };


          function initMap() {
              var latLng = new google.maps.LatLng(38.694085,-1.710901);

              map = new google.maps.Map(document.getElementById('googleMap'), {
                  zoom: 2,
                  center: latLng,
                  mapTypeId: google.maps.MapTypeId.ROADMAP,
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false
              });

              $scope.plotMarker();
          }

          function log(h) {
              document.getElementById("log").innerHTML += h + "<br />";
          }

          function pinSymbol(color, scale) {
              return {
                  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                  fillColor: color,
                  fillOpacity: 1,
                  strokeColor: '#000',
                  strokeWeight: 0.5,
                  scale: scale
              };
          }
          //google.maps.event.addDomListener(window, 'load', initMap);

          $scope.initMap = function(){
            initMap();
          };
    });
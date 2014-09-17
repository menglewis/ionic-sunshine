'use strict';

var weatherControllers = angular.module('weatherControllers', []);

weatherControllers.controller('WeatherListCtrl', ['$scope', '$timeout', 'Weather', 'Locations',
    function($scope, Weather, Locations, $ionicSideMenuDelegate, $timeout) {
        var createLocation = function(zipCode) {
            $scope.locations.push(zipCode);
            //Locations.save($scope.locations);
        };

        $scope.selectLocation = function(location, index) {
            $scope.activeLocation = location;
            //Locations.setActiveLocationIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
            $scope.getWeatherData(location);
        };

        $scope.toggleLocations = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.newLocation = function() {
            var location = prompt('Enter a zip code:');
            if (location) {
                createLocation(location);
            }
        };

        $scope.getWeatherData = function(zipCode) {
            Weather.week(zipCode).then(function(d) {
                $scope.locationName = d.data.city.name;
                $scope.weather = d.data.list;
            });
        };
        $scope.locations = [60608, 60601];
        /*$timeout(function() {
            if($scope.locations.length == 0) {
                while(true) {
                    var location = prompt("Enter a zip code:");
                    if (location) {
                        createLocation(location);
                        $scope.selectLocation(location, 0);
                        break;
                    }
                }
            }
        });*/
    }
]);
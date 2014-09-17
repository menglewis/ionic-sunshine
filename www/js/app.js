// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var weatherApp = angular.module('weatherApp', ['ionic'])

.factory('Weather', function($http) {
    return {
        week: function(location) {
            return $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&q=" + location);
        }
    }
})

.factory('Locations', function() {
    return {
        all: function () {
            var locationString = window.localStorage['locations'];
            if (locationString) {
                return angular.fromJson(locationString);
            }
            return [];
        },
        save: function (locations) {
            window.localStorage['locations'] = angular.toJson(locations);
        },
        getActiveLocationIndex: function () {
            return parseInt(window.localStorage['activeLocation']) || 0;
        },
        setActiveLocationIndex: function (index) {
            window.localStorage['activeLocation'] = index;
        }
    }
})

.controller('WeatherListCtrl',
    function($scope, Weather, Locations, $ionicSideMenuDelegate, $timeout) {
        var createLocation = function(location) {
            $scope.locations.push(location);
            Locations.save($scope.locations);
        };

        $scope.locations = Locations.all();

        $activeLocation = $scope.locations[Locations.getActiveLocationIndex()];

        $scope.selectLocation = function(location, index) {
            $scope.activeLocation = location;
            Locations.setActiveLocationIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
            $scope.getWeatherData(location);
        };

        $scope.toggleLocations = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.newLocation = function() {
            var location = prompt('Enter a Location:');
            if (location) {
                createLocation(location);
            }
        };

        $scope.getWeatherData = function(zipCode) {
            Weather.week(zipCode).then(function(d) {
                $scope.locationName = d.data.city.name;
                $scope.weather = d.data.list;
                for (var i in $scope.weather) {
                    var t = new Date($scope.weather[i].dt * 1000);
                    var formatted = t.toLocaleDateString();
                    $scope.weather[i].dt = formatted;
                }
            });
        };
        $timeout(function() {
            if($scope.locations.length == 0) {
                while(true) {
                    var location = prompt("Enter a Location:");
                    if (location) {
                        createLocation(location);
                        $scope.selectLocation(location, 0);
                        break;
                    }
                }
            }
        });
    }
);
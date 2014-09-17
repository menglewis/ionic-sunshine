'use strict';

var weatherServices = angular.module('weatherServices', []);

weatherServices.factory('Weather', function($http) {
    return {
        week: function(zipCode) {
            return $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=7&q=" + zipCode);
        }
    }
});

weatherServices.factory('Locations', function() {
    return {
        all: function() {
            var locationString = window.localStorage['locations'];
            if (locationString) {
                return angular.fromJson(locationString);
            }
            return [];
        },
        save: function(locations) {
            window.localStorage['locations'] = angular.toJson(locations);
        },
        getActiveLocationIndex: function() {
            return parseInt(window.localStorage['activeLocation']) || 0;
        },
        setActiveLocationIndex: function(index) {
            window.localStorage['activeLocation'] = index;
        }
    }
});
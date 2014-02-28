'use strict';
var photoControllers = angular.module('photoControllers', []);

photoControllers.controller('PhotoListCtrl', ['$scope', 'Photo','Listing', function($scope, Photo, Listing) {
	 
	  console.log('Inside Photo controller');
	  $scope.message = '';
	  $scope.layout = 'grid';
	  $scope.photos = [];
	  $scope.listingId = null;



     // handler for the for photo page initialization
	  $scope.init = function() {
		console.log("Listing Id: "+$scope.listingId);  
		if ($scope.listingId) {
			$scope.photos = Photo.query({
				id : $scope.listingId
			}, function(data, err) {
				if (err) {
					$scope.message = 'Error fetching data';
				} else {
					$scope.photos = data;
                    $scope.list_of_string = ['tag1', 'tag2'];
                    $scope.select2Options = {
                        'multiple': true,
                        'simple_tags': true,
                        'tags': ['tag6', 'tag7', 'tag8', 'tag9']  // Can be empty list.
                    };

				}
			});
		} else {
			$scope.listings = Listing.query(function(data, err) {
				if (err) {
					$scope.message = 'Error fetching data';
				} else {
					$scope.listings = data;
				}
			});
		}
	}; 

    // handler for the upload progress
	$scope.progress = function(percentDone) {
          console.log("progress: " + percentDone + "%");
    };

    // handler for the upload completion
    $scope.done = function(files, data) {
          console.log("upload complete");
          console.log("data: " + JSON.stringify(data));
          writeFiles(files);
    };

    // handlre for the sending of uoload data
    $scope.getData = function(files) { 
    	console.log('Inside get files');
    	//this data will be sent to the server with the files
    	// create an array of filenames to send to the server
    	//console.log(JSON.stringify(files));
        return {listingId:$scope.listingId, isPrivate:false};
    };

    // error handler for upload
    $scope.error = function(files, type, msg) {
          console.log("Upload error: " + msg);
          console.log("Error type:" + type);
          writeFiles(files);
    }

    function writeFiles(files) 
    {
          console.log('Files')
          for (var i = 0; i < files.length; i++) {
                console.log('\t' + files[i].name);
          }
    }
	  
	}]);



photoControllers.controller('LoginCtrl', ['$scope','$http', '$cookies', function($scope, $http, $cookies, User) {
	  console.log('Inside Login controller');
	  $scope.message = '';
	  $scope.user = null;
	  $scope.userCreds = null;
	  $scope.login = function () {
	    $http
	      .post('/rest/api/login', $scope.userCreds)
	      .success(function (data, status, header, config) {
	        $scope.message = 'Welcome ';
	        $scope.user = data;
	      })
	      .error(function (data, status, headers, config) {
	        $scope.message = 'Error: Invalid user or password';
	      });
	  };
	  
	  $scope.logout = function () {
		    $http
		      .get('/rest/api/logout')
		      .success(function (data, status, headers, config) {
		        $scope.message = ' ';
		        $scope.user = null;
		      })
		      .error(function (data, status, headers, config) {
		        $scope.message = 'Error during logout';
		      });
		  };
	  
	}]);

app.controller('orderCtrl', function($scope, $http) {
    $scope.date = ' ';

    // $scope.filter = myService.style();

    $scope.send = function () {
        console.log("inside send function");
        console.log($scope.data.date);

        var posting = $http({
            method: 'POST',
            /*posting to /post */
            url: '/orders',
            data: {'date' : $scope.data.date }
        }).then(function(response) {
          $scope.orders = response.data;
          console.log($scope.orders);
          $scope.sortField = 'userid';
          $scope.reverse = true;
          //console.log(response.data, "Response from post request!")
        })
      }
  });
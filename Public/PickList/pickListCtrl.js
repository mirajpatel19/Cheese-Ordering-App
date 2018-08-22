app.controller('pickListCtrl', function ($scope, $http) {
  //calling the service
  //$scope.num = myService.myFunc(255);

  $scope.date = ' ';

  $scope.send = function () {
    console.log("inside send function");
    console.log($scope.data.date);

    var posting = $http({
      method: 'POST',
      url: '/picklist',
      data: {
        'date': $scope.data.date
      }
    }).then(function (response) {
      $scope.orders = response.data;
      console.log($scope.orders);

      $scope.getOrder = function (index) {
        $scope.fullOrder = $scope.orders[index];
        console.log($scope.fullOrder);
        $scope.num = myService.myFunc($scope.fullOrder);
        //// TODO: send the data to orderlist for filter.
      };


      $scope.sortField = 'userid';
      $scope.reverse = true;
    })
  }
});
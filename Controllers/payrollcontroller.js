app.controller('payRollCtrl', function($scope, $http) {
    $scope.date = ' ';
    //$scope.dollarValue = ' ';

    $scope.send = function () {
        console.log("inside send function");
        console.log($scope.data.date);

        var posting = $http({
            method: 'POST',
            /*posting to /post */
            url: '/payRoll',
            data: {
                    'date': $scope.data.date,
                    //'dollarValue': $scope.dollarValue
                  }
        }).then(function(response) {
          $scope.orders = response.data;
          //console.log($scope.orders[0].totalpounds);
          //console.log($scope.orders.fname[1]);

          console.log("Object from the server for orders: ")
          console.log($scope.orders[0]);
          console.log('Dollar value enter: ' + $scope.dollarValue);

          angular.forEach($scope.orders, function(orders) {
            // console.log(orders);
            // console.log($scope.dollarValue);
            // console.log(orders.totalpounds);

            // $scope.myValue = $scope.dollarValue.length;
            // console.log($scope.myValue);

            if ($scope.dollarValue == undefined) {
              $scope.dollarValue = 0.00;
              alert("Dollar Value is not entered! Please enter the dollar value.");
            }
            $scope.calPounds = orders.totalpounds * $scope.dollarValue;
            console.log($scope.calPounds);

            $scope.orders[0].totalAmount = $scope.calPounds;
            console.log('Object after doing math: ')
            console.log($scope.orders);
          })

          $scope.sortField = 'userid';
          $scope.reverse = true;
          //console.log(response.data, "Response from post request!")
          /*
          [ { key : value}, { key2 :  value2 }  ]
            '1' == 1 = true
            '1' === 1 = false
          */
        })
      }
  });
app.controller('orderCtrl', function ($scope, $http) {
    $scope.date = ' ';

    // $scope.filter = myService.style();

    $scope.send = function () {
        console.log("inside send function");
        console.log($scope.data.date);

        // $scope.deleteOrder = function (index) {
        //     $scope.fullOrder = $scope.orders[index];
        //     console.log("To Delete!");
        //     console.log($scope.fullOrder);
        // };

        var posting = $http({
            method: 'POST',
            /*posting to /post */
            url: '/orders',
            data: {'date': $scope.data.date
            }
        }).then(function (response) {
            $scope.orders = response.data;

            $scope.addText = function (text) {
                console.log("here it comes");
                console.log(text);
                $scope.orders.push(text);
                console.log(orders);
            }
            $scope.removeText = function (text) {
                var i = $scope.orders.indexOf(text);
                $scope.orders.splice(i, 1);
            }
            console.log($scope.orders);
            $scope.sortField = 'userid';
            $scope.reverse = true;
            //console.log(response.data, "Response from post request!")
        })
    }
});
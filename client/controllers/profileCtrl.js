var HrApp = angular.module('HrApp');
HrApp.controller('profileCtrl', function($scope, $location, $http, toastr, $stateParams, $uibModal, $log, $rootScope) {
    console.log("inside profileCtrl");
    $rootScope.userName = $stateParams.param;
    $rootScope.id = $stateParams.id;
    $rootScope.attendance = [];
    var cdate = new Date();
    var cdatestr = cdate.toString();
    var cdateArray = cdatestr.split(" ");
    var currentDate = cdateArray[1] + "-" + cdateArray[2] + "-" + cdateArray[3];
console.log(currentDate);
    $rootScope.user = {
        'EnggId': $scope.id,
        'date': currentDate
    };


    /**
     * retrive the attendance of current month
     *
     * @param(json)-user
     *
     */
    $rootScope.retriveMonthAttendance = function(user) {
        $http.post('http://localhost:3000/retriveMonthAttendance', user).success(function(data) {

            $rootScope.attendance.length = 0;
            var keys = Object.keys(data.attendance);
            var len = keys.length;
            keys.sort();
            for (var i = 0; i < len; i++) {
                k = keys[i];
                $rootScope.attendance.push(data.attendance[k]);
            }
        });

    };

    $rootScope.retriveMonthAttendance($rootScope.user);//call method to retrive month attendane

    /**
     * open the modal according to input
     *
     * @param(number-no
     *
     */
    $rootScope.open = function(no) {
            console.log("hi");
            switch (no) {
                case 1:
                    $modalInstance = $uibModal.open({
                        //  controller: 'PopupCont',
                        templateUrl: './views/modalAdd.html',
                    });
                    break;
                case 2:
                    $modalInstance = $uibModal.open({
                        //  controller: 'PopupCont',
                        templateUrl: './views/modalEdit.html',
                    });
                    break;
                case 3:
                    $modalInstance = $uibModal.open({
                        //  controller: 'PopupCont',
                        templateUrl: './views/EditAttendance.html',
                    });
                    break;
            }
        }
        /**
         *close modal
         */
    $rootScope.close = function() {
        $modalInstance.dismiss('cancel');
    };

});

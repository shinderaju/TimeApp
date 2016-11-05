var HrApp = angular.module('HrApp');
HrApp.controller('editCtrl', function($scope, $location, $http, toastr, $rootScope, userService, timeDiff) {


    var editData = userService.getEditDate();
    console.log(editData);
    var date = editData.date.replace(/-/g, ' ');
    $scope.dt = new Date(date);
    $scope.inTime = new Date(date);
    var editInTime = editData.intime;
    var inTimeArray = editInTime.split(":");
    var inTimeMinArray = inTimeArray[1].split(" ");
    if (inTimeMinArray[1] == "pm") inTimeArray[0] = parseInt(inTimeArray[0]) + 12;
    if (inTimeArray[0] == 0 & inTimeMinArray[0] == 0) {
        $scope.inTime = null;
    } else {
        $scope.inTime.setHours(inTimeArray[0]);
        $scope.inTime.setMinutes(inTimeMinArray[0]);
    }

    $scope.outTime = new Date(date);
    var editOutTime = editData.outtime;
    var outTimeArray = editOutTime.split(":");
    var outTimeMinArray = outTimeArray[1].split(" ");
    if (outTimeMinArray[1] == "pm") outTimeArray[0] = parseInt(outTimeArray[0]) + 12;
     if (outTimeArray[0] == 0 & outTimeMinArray[0] == 0){
         $scope.outTime = null;
     }else {
       $scope.outTime.setHours(outTimeArray[0]);
       $scope.outTime.setMinutes(outTimeMinArray[0]);
     }

    var noOfhours = editData.no_of_hours.split(" ");
    $scope.diffTime = {
        "diffHour": noOfhours[0],
        "diffMin": noOfhours[2]
    };
    $scope.WorkingDay = ["Yes", "Co-holiday", "Personal leave"];
    $scope.selectedDay = editData.WorkingDay;
    $scope.reasonForAbsence = editData.reasonForAbsence;

    $scope.change = function() {
        // $scope.diffTime = $rootScope.changed($scope.inTime, $scope.outTime);
        $scope.diffTime = timeDiff.changed($scope.inTime, $scope.outTime);
        console.log($scope.diffTime);
    };
    $scope.submitdata = function() {
        var data = {
            'dt': $scope.dt,
            'diffTime': $scope.diffTime,
            'inTime': $scope.inTime,
            'outTime': $scope.outTime,
            'reasonForAbsence': $scope.reasonForAbsence,
            'selectedDay': $scope.selectedDay
        };
        $rootScope.submit(data);
    };
    $scope.selectWorkingDay = function() {
        console.log("inside selectWorkingDay");
        if ($scope.selectedDay != "Yes") {
            var timeJson = $rootScope.clear($scope.inTime, $scope.outTime);
            $scope.inTime = timeJson.inTime;
            $scope.outTime = timeJson.outTime;
            $scope.diffTime.diffHour = 0;
            $scope.diffTime.diffMin = 0;
        }
    }

});

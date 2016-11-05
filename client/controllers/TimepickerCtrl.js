var HrApp = angular.module('HrApp');
HrApp.controller('TimepickerCtrl', function($scope, $log, $rootScope, $http, $location, userService, timeDiff, timeAmPm, toastr) {
    $scope.inTime = new Date();
    $scope.inTime.setHours(8);
    $scope.inTime.setMinutes(30);

    $scope.outTime = new Date();
    $scope.outTime.setHours(19);
    $scope.outTime.setMinutes(30);

    $rootScope.hstep = 1;
    $rootScope.mstep = 15;
    $rootScope.diffHour = 0;
    $rootScope.diffMin = 0;
    $scope.diffTime = {};
    $rootScope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $rootScope.ismeridian = true;

    /**
     * change the meridian on the click
     *
     */
    $rootScope.toggleMode = function() {
        $rootScope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;

    };

    $scope.diffTime = {
        "diffHour": 11,
        "diffMin": 00,
    };

    /**
     * get the difference between time on the chnange of time
     *
     * @param(number-no
     *
     */
    $scope.change = function() {
        console.log(timeDiff.changed($scope.inTime, $scope.outTime));
        // $scope.diffTime = $rootScope.changed($scope.inTime, $scope.outTime);
        $scope.diffTime = timeDiff.changed($scope.inTime, $scope.outTime);

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
    $rootScope.clear = function(inTime, outTime) {
        inTime = null;
        outTime = null;
        var timeJson = {
            'inTime': inTime,
            outTime: outTime
        }
        return (timeJson);
    };

    // $rootScope.dt = "02/11/2016";
    $rootScope.today = function() {
        $scope.dt = new Date();
    };
    $rootScope.dateformat = "dd/MM/yyyy";
    $rootScope.today();

    $rootScope.showcalendar = function($event) {
        $rootScope.showdp = true;
        // console.log($rootScope.dt);
    };
    $rootScope.showdp = false;

    $scope.WorkingDay = ["Yes", "Co-holiday", "Personal leave"];
    $scope.selectedDay = 'Yes';
    $scope.reasonForAbsence = '';

    /**
     * submit data to the server
     *
     */
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
    }



    /**
     * submit data to the firebase
     *
     * @param(json) - data
     *
     */
    $rootScope.submit = function(data) {

        $rootScope.close();
        // $scope.close();
        var WorkingHours = data.diffTime.diffHour + " hr " + data.diffTime.diffMin + " min";
        var d = data.dt.toString();
        var d1 = d.split(" ");
        var date = d1[1] + "-" + d1[2] + "-" + d1[3];
        console.log(timeAmPm.format_time(data.inTime));
        console.log(timeAmPm.format_time(data.outTime));

        var jsonData = {
            'EnggId': $rootScope.id,
            'date': date,
            'intime': timeAmPm.format_time(data.inTime),
            'outtime': timeAmPm.format_time(data.outTime),
            'WorkingDay': data.selectedDay,
            'no_of_hours': WorkingHours,
            'reasonForAbsence': data.reasonForAbsence,
        }
        console.log(jsonData);
        $http.post('http://localhost:3000/saveAttendance', jsonData).success(function(data) {
            console.log("data save successfully");
            toastr.success('Data saved successfully');
            $rootScope.retriveMonthAttendance($rootScope.user);
        });

    }

    /**
     * retrive the attendance of the day
     *
     */
    $scope.retriveDayAttendance = function() {
        $rootScope.close();
        var cdatestr = $scope.dt.toString();
        var cdateArray = cdatestr.split(" ");
        $scope.currentDate = cdateArray[1] + "-" + cdateArray[2] + "-" + cdateArray[3];
        $rootScope.EditDate = $scope.dt
        $rootScope.user = {
            'EnggId': $scope.id,
            'date': $scope.currentDate
        };
        $http.post('http://localhost:3000/retriveDayAttendance', $rootScope.user).success(function(data) {
            console.log(data.attendance);
            if (data.attendance) {
                $scope.inTime = data.attendance.inTime;
                var d = new Date("Nov 06 2016");
                d.setHours(15);
                $rootScope.EditinTime = data.attendance;
                userService.setEditDate(data.attendance);
                $rootScope.open(3);
            } else {
                toastr.error('Entry for date is not available', 'Error');
            }
        });
    };

});

var HrApp = angular.module('HrApp');
HrApp.controller('TimepickerCtrl', function($scope, $log,$rootScope,$http,$location) {
    $scope.inTime = new Date();
    $scope.outTime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.changed = function() {
        $log.log('Time changed to: ' + $scope.inTime);
        console.log($scope.inTime);
        console.log($scope.dt);
        var inHour = $scope.inTime.getHours();
        var inMin = $scope.inTime.getMinutes();
        var outHour = $scope.outTime.getHours();
        var outMin = $scope.outTime.getMinutes();
        if(inHour > outHour){
          $scope.diffHour = (24 - inHour) + outHour ;
        }else {
          $scope.diffHour = outHour - inHour;
        }

        if(inMin > outMin){
          $scope.diffMin = 60 -(inMin - outMin);
          $scope.diffHour = $scope.diffHour - 1;
        }else {
          $scope.diffMin = outMin - inMin;
        }
        console.log($scope.diffHour);
        console.log($scope.diffMin);
    };

    $scope.clear = function() {
        $scope.mytime = null;
    };


    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.dateformat = "dd/MM/yyyy";
    $scope.today();
    $scope.showcalendar = function($event) {
        $scope.showdp = true;
        console.log($scope.dt);
    };
    $scope.showdp = false;


    $scope.WorkingDay = ["Yes", "Co-holiday", "Personal leave"];
    $scope.selectedDay = 'Yes';

    $scope.submit = function() {
        console.log($scope.dt);
        $rootScope.close();
        $scope.close();
        var WorkingHours = $scope.diffHour + " hr " + $scope.diffMin + " min";
        var inHour = $scope.inTime.getHours();
        var inMin = $scope.inTime.getMinutes();
        var inTime = inHour + ":" + inMin ;
        var outHour = $scope.outTime.getHours();
        var outMin = $scope.outTime.getMinutes();
        var outTime = outHour + ":" + outMin ;
        console.log(inTime);
        console.log(outTime);
        var d = $scope.dt.toString();
        var d1 = d.split(" ");
        var date = d1[1] + "-" + d1[2] + "-" + d1[3];
        var jsonData = {
            'EnggId': $rootScope.id,
            'date': date,
            'intime': inTime,
            'outtime': outTime,
            'WorkingDay': $scope.selectedDay,
            'no_of_hours': WorkingHours,
            'reasonForAbsence': $scope.reasonForAbsence,
        }
        console.log(jsonData);

        $http.post('http://localhost:3000/attendance', jsonData).success(function(data) {
            console.log("data save successfully");
            $http.post('http://localhost:3000/retrive', $rootScope.user).success(function(data) {
                $rootScope.attendane = data.attendance;
                var keys = Object.keys(data.attendance);
                console.log("trying to retrive new attendance");
                for (i = 0; i < keys.length; i++) {
                    $rootScope.attendance.push(data.attendance[keys[i]]);
                }
                console.log($rootScope.attendance);
                $location.path('profile');
            });
        });


    }




});

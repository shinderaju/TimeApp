angular.module('HrApp')
    .service('submitdata', function ($http) {

       this.submit = function (jsonData) {
        //  $rootScope.close();
        //  // $scope.close();
        //  var WorkingHours = data.diffTime.diffHour + " hr " + data.diffTime.diffMin + " min";
        //  var d = data.dt.toString();
        //  var d1 = d.split(" ");
        //  var date = d1[1] + "-" + d1[2] + "-" + d1[3];
        //  console.log(timeAmPm.format_time(data.inTime));
        //  console.log(timeAmPm.format_time(data.outTime));
        //  var jsonData = {
        //      'EnggId': $rootScope.id,
        //      'date': date,
        //      'intime': timeAmPm.format_time(data.inTime),
        //      'outtime': timeAmPm.format_time(data.outTime),
        //      'WorkingDay': data.selectedDay,
        //      'no_of_hours': WorkingHours,
        //      'reasonForAbsence': data.reasonForAbsence,
        //  }

         $http.post('http://localhost:3000/attendance', jsonData).success(function(data) {
             console.log("data save successfully");
            //  $rootScope.retrive($rootScope.user);
         });


        }
});

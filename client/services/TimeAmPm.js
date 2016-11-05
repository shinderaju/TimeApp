var HrApp = angular.module('HrApp');
HrApp.factory('timeAmPm', ['$rootScope', function($rootScope) {
    var diffTime = {};
    return {
        format_time: function(date_obj) {
            // formats a javascript Date object into a 12h AM/PM time string
            var hour = 0;
            var minute = 0;
            var amPM = "am";
            if (date_obj) {
                console.log(date_obj);
                console.log(date_obj.getHours());
                hour = date_obj.getHours();
                minute = date_obj.getMinutes();
                amPM = (hour > 11) ? "pm" : "am";
                if (hour > 12) {
                    hour -= 12;
                } else if (hour == 0) {
                    hour = "12";
                }
                if (minute < 10) {
                    minute = "0" + minute;
                }
                return hour + ":" + minute + " " + amPM;
            }else {
              return hour + ":" + minute + " " + amPM;
            }
        }
    }
}]);

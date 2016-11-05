var HrApp = angular.module('HrApp');
HrApp.factory('timeDiff',['$rootScope',function($rootScope){
  var diffTime = {};
  return {

  changed : function(inTime, outTime) {
      var diffTime = {};


      if(inTime.getHours()!==null){
        var inHour = inTime.getHours();
      }else {
        var inHour = 0;
      }
      if(inTime.getHours()){
        var outHour = outTime.getHours();
      }else {
        var outHour = 0;
      }

      var inMin = inTime.getMinutes();

      var outMin = outTime.getMinutes();
      if (inHour > outHour) {
          diffTime.diffHour = (24 - inHour) + outHour;
      } else {
          diffTime.diffHour = outHour - inHour;
      }

      if (inMin > outMin) {
          diffTime.diffMin = 60 - (inMin - outMin);
          diffTime.diffHour = diffTime.diffHour - 1;
      } else {
          diffTime.diffMin = outMin - inMin;
      }
      return (diffTime);
  }
}
}]);

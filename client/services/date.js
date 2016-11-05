var HrApp = angular.module('HrApp');
HrApp.factory('userService',['$rootScope',function($rootScope){
  var user = {};
  return {
  getEditDate : function () {
    return user.EditDate;
  },
  setEditDate : function (EditDate) {
    user.EditDate = EditDate;
  }
}
}]);

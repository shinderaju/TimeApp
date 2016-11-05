


var HrApp = angular.module('HrApp');
HrApp.controller('loginCtrl', function ($scope, $location, $http, toastr) {
  /**
   * Login Athentication
   * @cunstructor
   * @param(string)-email
   *
   */
  $scope.submit = function () {
    var email = this.email;
    console.log("hi");
    console.log($scope.email);
    var authData = { 'email': email };

    //sending user mail to server
    $http.post('http://localhost:3000/login', authData).success(function (data) {
      if (data == "invalid email") {
        toastr.error("Invalid email");
      } else {
        toastr.success('You have successfully logged in!');
        console.log("login successfully");
        console.log(data);
        $location.path('/profile').search({
          param: data.user,
          id : data.id
        });
      }
    });

  }//end of submit function

});

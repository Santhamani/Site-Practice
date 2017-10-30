

angular.module('myApp').controller('myCtrl',['$scope','$http',function($scope,$http){
    $scope.sendEmail = function(username,title,message){
        $http.post('/contact',{username:username,subject:title,content:message})
            .then(function(data){
                alert('Mail sent successfully');
            }).catch(function(err){
                console.log(err);
            });
    }
}]);
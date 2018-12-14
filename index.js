var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/welcome", {
        templateUrl : "welcome.html",
        controller: 'welcomeCtrl'
    })
    .when("/home", {
        templateUrl : "home.html",
        controller: 'homeCtrl'
    })
});
app.controller("homeCtrl", function ($scope, $http) {
    $scope.avatar = window.localStorage.getItem('avatar')
    $scope.id = window.localStorage.getItem('userId')
    $scope.username = window.localStorage.getItem('username')
    $scope.token = window.localStorage.getItem('authtoken')
    $http({
            method: 'GET',
            url: 'https://dev.sitemax.build/api/projects?schema=name,number',
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'browser',
                'X-Authtoken': $scope.token
             }
        }).then(function(res){
            console.log(res.data)
            $scope.projects = res.data
        })
});
app.controller("welcomeCtrl", function ($scope, $http) {
    $scope.pwd= ''
    $scope.email = ''
    var userInfo = {}
    $scope.handleLogin = function() {
        console.log('here')
        $http({
            method: 'POST',
            url: 'https://dev.sitemax.build/api/sign-in?schema=name,avatar',
            data: {
                "username": $scope.email,
                "password": $scope.pwd
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Client-Type': 'browser'
             }
        }).then(function(res){
            if(res.status> 200) {
                console.dir(res)
                userInfo = {
                    username: res.data.user.name,
                    userId: res.data.user.id,
                    avatar: res.data.user.avatar
                }

                window.location.href = window.location.origin + window.location.pathname + '#!/home'
                window.localStorage.setItem('username', res.data.user.name)
                window.localStorage.setItem('userId', res.data.user.id)
                window.localStorage.setItem('avatar', res.data.user.avatar)
                window.localStorage.setItem('authtoken',res.data.authtoken)
            }
        })
    }
});

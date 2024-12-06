angular.module("lifestyleApp", ['ngRoute']).controller("LoginController", function ($scope, $http, $window) {
    $scope.user = {}; // Initialize user object

    $scope.LoginUser = function () {
        $http
            .post('http://localhost:5000/api/auth/login', {
                email: $scope.user.email,
                password: $scope.user.password,
            })
                .then(function (response) {
                    alert("Login successful!");

                    // Simpan token ke localStorage atau sessionStorage
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('username', response.data.data.username);  // Ambil username dari response.data.data
                    localStorage.setItem('email', response.data.data.email);        // Ambil email dari response.data.data
                    localStorage.setItem('subscribe', response.data.data.subscribe); // Ambil subscribe dari response.data.data
                    
                    $scope.user = {}; // Reset form
                    $window.location.href = './../views/index.html'; // Redirect ke halaman dashboard
                })

            .catch(function (error) {
                alert("Error: " + (error.data.message || "Login failed"));
            });
    };
});

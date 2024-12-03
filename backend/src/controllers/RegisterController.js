      // Ensure this file is correctly linked and there are no syntax errors
      const app = angular.module("registerApp", []);

      app.controller("RegisterController", function ($scope, $http) {
        $scope.user = {}; // Initialize user object

        $scope.registerUser = function () {
          if ($scope.user.password !== $scope.user.confirmPassword) {
            alert("Passwords do not match!");
            return;
          }

          // Send HTTP POST request to API
          $http
            .post('http://localhost:5000/api/auth/register', {
              username: $scope.user.username,
              email: $scope.user.email,
              password: $scope.user.password,
              role: "user",
            })
            .then(
              function (response) {
                alert("Registration successful!");
                $scope.user = {}; // Reset form
              },
              function (error) {
                alert("Error: " + (error.data || "Registration failed"));
              }
            );
        };
      });
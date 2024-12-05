// ProfileController.js
angular.module("lifestyleApp")
    .controller("ProfileController", function($scope, $http, $window) {
        $scope.username = localStorage.getItem('username');  // Mengambil username dari localStorage
        $scope.user = {};  // Initialize form data
        
        // Fungsi untuk memperbarui password
        $scope.updatePassword = function() {
            if ($scope.user.newPassword !== $scope.user.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Kirim HTTP POST request untuk mengupdate password
            $http
            .put('http://localhost:5000/api/auth/updatePassword', {
                username: $scope.username,
                currentPassword: $scope.user.currentPassword,
                newPassword: $scope.user.newPassword,
            })
            .then(
                function(response) {
                    alert("Password successfully updated!");
                    $scope.user = {};  // Reset form
                },
                function(error) {
                    // Periksa apakah error.data ada dan bisa dibaca, jika tidak tampilkan pesan default
                    const errorMessage = error.data && error.data.message ? error.data.message : "Password update failed";
                    alert("Error: " + errorMessage);
                }
            );        
        };

        $scope.search = function() {
            if ($scope.searchQuery) {
                // Kirim permintaan ke backend dengan search query
                $http.get('http://localhost:5000/api/articles/search', { params: { searchQuery: $scope.searchQuery } })
                    .then(function(response) {
                        // Menyimpan artikel yang ditemukan di localStorage
                        localStorage.setItem('searchedArticles', JSON.stringify(response.data.data)); // Simpan hasil pencarian
                        localStorage.setItem('searchQuery', $scope.searchQuery); // Simpan hasil pencarian
                        
                        // Redirect ke halaman index.html setelah pencarian
                        $window.location.href = './../index.html';  // Mengalihkan ke index.html
                    })
                    .catch(function(error) {
                        console.error('Gagal mencari artikel:', error);
                    });
            } else {
                // Jika search query kosong, simpan artikel default
                localStorage.setItem('searchedArticles', JSON.stringify($scope.articles)); // Menyimpan semua artikel
            }
            console.log('Searching for:', $scope.searchQuery);
        };
        
    });

// subscribeController.js
angular.module('lifestyleApp', [])
  .controller('subscribeController', function($scope, $http, $window) {
    
    // Ambil data pengguna dari localStorage (asumsi pengguna sudah login)
    $scope.username = localStorage.getItem('username') || 'Guest';
    $scope.email = localStorage.getItem('email') || 'example@example.com';
    $scope.message = ''; // Isi pesan dari pengguna

    // Fungsi untuk menangani klik tombol Subscribe
    $scope.subscribe = function() {
        if (!$scope.message) {
            alert('Please enter a message!');
            return;
        }

        const userData = {
            username: $scope.username,
            email: $scope.email,
            message: $scope.message
        };

        // Kirim data subscribe ke server (misalnya melalui HTTP POST)
        $http.post('http://localhost:5000/api/subscribe', userData)
            .then(function(response) {
                // Jika berhasil
                    alert('You have successfully subscribed!');
                    // Tambahkan status subscribe di localStorage
                    localStorage.setItem('subscribe', 'yes');
                    $window.location.href = './../index.html';
            })
            .catch(function(error) {
                console.error('Error during subscription:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    $scope.search = function() {
        if ($scope.searchQuery) {
            // Kirim permintaan ke backend dengan search query
            $http.get('http://localhost:5000/api/articles/search', { params: { searchQuery: $scope.searchQuery } })
                .then(function(response) {
                    // Menyimpan artikel yang ditemukan di $scope.articles
                    $scope.articles = response.data.data;  // Simpan hasil pencarian ke $scope.articles
                    $scope.filteredArticles = $scope.articles;  // Menyimpan hasil pencarian di filteredArticles juga
                    
                    // Redirect ke halaman index.html setelah pencarian
                    $window.location.href = './../index.html';  // Mengalihkan ke index.html
                })
                .catch(function(error) {
                    console.error('Gagal mencari artikel:', error);
                    $scope.articles = [];  // Kosongkan jika terjadi error
                    $scope.filteredArticles = [];
                });
        } else {
            // Jika search query kosong, tampilkan semua artikel
            $scope.filteredArticles = $scope.articles;
        }
        console.log('Searching for:', $scope.searchQuery);
    };
    
});

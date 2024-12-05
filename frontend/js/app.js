var app = angular.module('lifestyleApp', ['ngRoute']);

app.controller('MainController', function($scope, $http, $window) {
    $scope.pageTitle = 'Lifestyle Vibes';

    // Slide images
    $scope.slides = [
        { image: 'car.jpg', alt: 'Car Image' },
        { image: 'kayak.jpg', alt: 'Kayak Image' },
        { image: 'view.jpg', alt: 'View Image' },
        { image: 'headphone.jpg', alt: 'Headphone Image' }
    ];

    // Articles initialization
    $scope.articles = [];
    $scope.filteredArticles = [];

    // Trending topics
    $scope.trendingTopics = [
        'MindfulLiving',
        'SustainableFashion',
        'WellnessRoutines',
        'HealthyRecipes',
        'TravelInspiration',
        'LifestyleTips'
    ];

    // Get articles from localStorage if searched previously
    var articles = localStorage.getItem('searchedArticles');
    if (articles) {
        $scope.articles = JSON.parse(articles);
        $scope.filteredArticles = $scope.articles;  // Filtered articles from localStorage
    } else {
        $scope.filteredArticles = $scope.articles;  // Default articles
    }

    // Get searchQuery from localStorage if available (from other controller)
    var searchQuery = localStorage.getItem('searchQuery');
    if (searchQuery) {
        $scope.searchQuery = searchQuery;  // Set searchQuery from localStorage
    } else {
        $scope.searchQuery = '';  // Default empty searchQuery
        $http.get('http://localhost:5000/api/articles')
        .then(function(response) {
            $scope.articles = response.data.data;
            $scope.filteredArticles = $scope.articles;  // Set filteredArticles to all articles initially
        })
        .catch(function(error) {
            console.error('Gagal mengambil artikel:', error);
            $scope.articles = [];
            $scope.filteredArticles = [];
        });
    }

    console.log($scope.filteredArticles)
    $scope.search = function() {
        if ($scope.searchQuery) {
            // Store the searchQuery in localStorage to be used in other controllers
            localStorage.setItem('searchQuery', $scope.searchQuery);

            // Send request to backend with search query
            $http.get('http://localhost:5000/api/articles/search', { params: { searchQuery: $scope.searchQuery } })
                .then(function(response) {
                    // Save the search results to $scope.articles
                    $scope.articles = response.data.data;
                    $scope.filteredArticles = $scope.articles;  // Update filteredArticles with search results

                    // Optionally store the search results in localStorage
                    localStorage.setItem('searchedArticles', JSON.stringify($scope.articles));
                })
                .catch(function(error) {
                    console.error('Gagal mencari artikel:', error);
                    $scope.articles = [];  // Empty articles if error occurs
                    $scope.filteredArticles = [];
                });
        } else {
            // If search query is empty, show all articles
            $http.get('http://localhost:5000/api/articles')
            .then(function(response) {
                $scope.articles = response.data.data;
                $scope.filteredArticles = $scope.articles;  // Set filteredArticles to all articles initially
            })
            .catch(function(error) {
                console.error('Gagal mengambil artikel:', error);
                $scope.articles = [];
                $scope.filteredArticles = [];
            });
            localStorage.removeItem('searchQuery');
            localStorage.removeItem('searchedArticles');
        }
        console.log('Searching for:', $scope.searchQuery);
    };

    // Initialize filteredArticles with all articles
    $scope.filteredArticles = $scope.articles;
});

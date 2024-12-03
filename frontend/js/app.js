var app = angular.module('lifestyleApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'MainController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'MainController'
        })
        .when('/subscribe', {
            templateUrl: 'views/subscribe.html',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('MainController', function($scope) {
    $scope.pageTitle = 'Lifestyle Vibes';

    $scope.slides = [
        { image: '/img/car.jpg', alt: 'Car Image' },
        { image: '/img/kayak.jpg', alt: 'Kayak Image' },
        { image: '/img/view.jpg', alt: 'View Image' },
        { image: '/img/headphone.jpg', alt: 'Headphone Image' }
    ];

    $scope.articles = [
        {
            image: '/img/view.jpg',
            alt: 'Wellness',
            tags: ['Wellness', 'Mental Health'],
            title: 'Morning Routines for Success',
            description: 'Discover how successful people start their day and build habits that promote wellness and productivity.',
            link: '#'
        },
        {
            image: '/img/car.jpg',
            alt: 'Fashion',
            tags: ['Fashion', 'Sustainability'],
            title: 'Sustainable Fashion Guide',
            description: 'Learn how to build a sustainable wardrobe that\'s both stylish and environmentally conscious.',
            link: '#'
        },
        {
            image: '/img/kayak.jpg',
            alt: 'Travel',
            tags: ['Travel', 'Adventure'],
            title: 'Hidden Gems: Travel 2024',
            description: 'Explore off-the-beaten-path destinations that promise unique experiences and unforgettable memories.',
            link: '#'
        }
    ];

    $scope.trendingTopics = [
        'MindfulLiving',
        'SustainableFashion',
        'WellnessRoutines',
        'HealthyRecipes',
        'TravelInspiration',
        'LifestyleTips'
    ];

    $scope.searchQuery = '';
    $scope.email = '';

    $scope.search = function() {
        if ($scope.searchQuery) {
            $scope.filteredArticles = $scope.articles.filter(article => 
                article.title.toLowerCase().includes($scope.searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes($scope.searchQuery.toLowerCase())
            );
        } else {
            $scope.filteredArticles = $scope.articles;
        }
        console.log('Searching for:', $scope.searchQuery);
    };

    $scope.subscribe = function() {
        console.log('Subscribing email:', $scope.email);
    };

    // Initialize filteredArticles with all articles
    $scope.filteredArticles = $scope.articles;
});
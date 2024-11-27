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
        // ... artikel lainnya
    ];
});
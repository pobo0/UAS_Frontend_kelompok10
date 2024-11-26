var app = angular.module('lifestyleApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'public/views/home.html',
      controller: 'MainController'
    })
    .when('/about', {
      templateUrl: 'public/views/about.html',
      controller: 'MainController'
    })
    .when('/contact', {
      templateUrl: 'public/views/contact.html',
      controller: 'MainController'
    })
    .when('/subscribe', {
      templateUrl: 'public/views/subscribe.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

app.controller('MainController', function($scope) {
  $scope.slides = [
    { image: '/img/car.jpg', alt: 'Car Image' },
    { image: '/img/kayak.jpg', alt: 'Kayak Image' },
    { image: '/img/view.jpg', alt: 'View Image' },
    { image: '/img/headphone.jpg', alt: 'Headphone Image' }
  ];

  // Define the articles array
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

  // Define the trending topics array
  $scope.trendingTopics = [
    'MindfulLiving',
    'SustainableFashion',
    'WellnessRoutines',
    'HealthyRecipes',
    'TravelInspiration',
    'LifestyleTips'
  ];

  // Initialize search query and email
  $scope.searchQuery = '';
  $scope.email = '';

  // Define the search function
  $scope.search = function() {
    console.log('Searching for:', $scope.searchQuery);
  };

  // Define the subscribe function
  $scope.subscribe = function() {
    console.log('Subscribing email:', $scope.email);
  };
}); 
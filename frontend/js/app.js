// Define the AngularJS module
var app = angular.module('lifestyleApp', ['ngRoute']);

// ArticleController: Handles adding new articles
app.controller('ArticleController', function($scope, $http ,$routeParams) {
    $scope.article = {
        tags: '' // Initialize tags as an empty string
    };

    $scope.addArticle = function() {
        // Ensure tags is a string before splitting
        if (typeof $scope.article.tags === 'string') {
            $scope.article.tags = $scope.article.tags.split(',').map(tag => tag.trim());
        }

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append('title', $scope.article.title); // Replace with actual data
        formData.append('description', $scope.article.description);
        formData.append('tags', $scope.article.tags); // Example: comma-separated tags
        formData.append('link', $scope.article.link);
        formData.append('image', $scope.article.image); 
        // Send data to backend
        $http.post('http://localhost:5000/api/articles', formData, {
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
        .then(function(response) {
            console.log('Article added successfully:', response.data);
            alert('Article added successfully!');
            $scope.article = {}; // Clear the form after successful submission
        })
        .catch(function(error) {
            console.error('Error adding article:', error);
            alert('Error adding article. Please try again.');
        });
    };
});

// Route configuration
app.config(function ($routeProvider) {
    $routeProvider
        .when('/contact', {
            templateUrl: 'contact.html',
            controller: 'ContactController'
        })
        .when('/add-article', {
            templateUrl: 'add-article.html',
            controller: 'ArticleController'
        })
        .when('/update-article/:id', {
            templateUrl: 'update-article.html',
            controller: 'UpdateArticleController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});

// Directive to handle file input binding
app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.controller('MainController', function($scope, $http) {
    $scope.articles = [];

    $scope.fetchArticles = function() {
        $http.get('http://localhost:5000/api/articles')
            .then(function(response) {
                $scope.articles = response.data.data;
            })
            .catch(function(error) {
                console.error('Error fetching articles:', error);
            });
    };

    $scope.fetchArticles();
});

app.controller('UpdateArticleController', function($scope, $http, $routeParams) {
    $scope.article = {
        // Initialize with default values or empty strings
        title: '',
        description: '',
        tags: '',
        link: '',
        image: null
    };

    $scope.updateArticle = function() {
        const articleId = $routeParams.id; // Ensure this captures the ID correctly
        if (!articleId) {
            console.error('Article ID is undefined');
            return;
        }

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append('title', $scope.article.title);
        formData.append('description', $scope.article.description);
        formData.append('tags', $scope.article.tags.split(',').map(tag => tag.trim()));
        formData.append('link', $scope.article.link);
        if ($scope.article.image) {
            formData.append('image', $scope.article.image);
        }

        // Send updated data to backend
        $http.patch(`http://localhost:5000/api/articles/${articleId}`, formData, {
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        })
        .then(function(response) {
            console.log('Article updated successfully:', response.data);
            alert('Article updated successfully!');
        })
        .catch(function(error) {
            console.error('Error updating article:', error);
            alert('Error updating article. Please try again.');
        });
    };
});

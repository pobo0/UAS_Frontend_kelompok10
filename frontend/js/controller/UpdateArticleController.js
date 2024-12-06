angular.module('lifestyleApp')
    .controller('UpdateArticleController', function($scope, $http, $location) {
        const params = new URLSearchParams($location.absUrl().split('?')[1]);
        const articleId = params.get('id');

        if (!articleId) {
            console.error('Article ID is missing');
            return;
        }

        $scope.updateArticle = function() {
            const formData = new FormData();
            formData.append('title', $scope.article.title);
            formData.append('description', $scope.article.description);
            formData.append('tags', $scope.article.tags);
            formData.append('link', $scope.article.link);
            if ($scope.article.image) {
                formData.append('image', $scope.article.image);
            }

            $http.patch(`http://localhost:5000/api/articles/${articleId}`, formData, {
                headers: { 'Content-Type': undefined }
            })
            .then(function(response) {
                console.log('Article updated successfully:', response.data);
            })
            .catch(function(error) {
                console.error('Error updating article:', error);
            });
        };
    });
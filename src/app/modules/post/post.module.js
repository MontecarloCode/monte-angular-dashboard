(function() {
  'use strict';

  var module = angular.module('app.post', ['ui.router', 'ngResource', 'app.data', 'app.common']);

  module.config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.posts', {
        url: '/posts/:interval',
        templateUrl: 'app/modules/post/list/posts.html',
        resolve: {
          posts: ['$stateParams', 'postsUtils', function($stateParams, postsUtils) {
            return $stateParams.interval ? postsUtils.postsDuringInterval($stateParams.interval): postsUtils.total();
          }]
        },
        controller: 'PostListController as vm'
      })
      .state('app.editPost', {
        url: '/posts/edit/:id',
        templateUrl: 'app/modules/post/edit/edit.html',
        resolve: {
          data: ['$stateParams', 'postResource', function($stateParams, postResource){
            return $stateParams.id ? postResource.get({id: $stateParams.id}).$promise : {};
          }]
        },
        controller: 'PostController',
        controllerAs: 'vm'
      });
  }
})();

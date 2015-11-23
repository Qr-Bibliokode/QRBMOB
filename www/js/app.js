angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.consulta', {
        url: '/consulta',
        views: {
          'menuContent': {
            templateUrl: 'templates/consulta.html'
          }
        }
      })

      .state('app.emprestimo', {
        url: '/emprestimo',
        views: {
          'menuContent': {
            templateUrl: 'templates/emprestimo.html'
          }
        }
      })

      .state('app.historico', {
        url: '/historico',
        views: {
          'menuContent': {
            templateUrl: 'templates/historico.html',
            controller: 'AppCtrl',
            controllerAS: 'vm'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.detalheConsultaLivro', {
        url: '/detalheConsultaLivro/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/detalheConsultaLivro.html',
            controller: 'DetalheConsultaLivroCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/historico');
  });


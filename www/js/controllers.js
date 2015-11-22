(function () {
  'use strict';

  angular
    .module('starter.controllers', [])
    .controller('AppCtrl', ['LoginService', '$scope', '$ionicModal', '$timeout', AppController]);

  /** @ngInject */
  function AppController(LoginService, $scope, $ionicModal, $timeout) {

    $scope.isLogado = function(){
      return LoginService.isLogado();
    };

    $scope.loginData = {};

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    $scope.login = function () {
      $scope.modal.show();
    };

    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    $scope.playlists = [
      {title: 'Reggae aaaaaaaaaaaaa', id: 1},
      {title: 'Chill', id: 2},
      {title: 'Dubstep', id: 3},
      {title: 'Indie', id: 4},
      {title: 'Rap', id: 5},
      {title: 'Cowbell', id: 6}
    ];

  }
})();

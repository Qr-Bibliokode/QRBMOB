(function () {
  'use strict';
//TODO: Implementar mensagens de erro e sucesso no login
  angular
    .module('starter.controllers')
    .controller('LoginController', ['LoginService', '$state', '$scope', LoginController]);

  /** @ngInject */
  function LoginController(LoginService, $state, $scope) {

    var vm = this;
    vm.user = '';

    vm.login = function () {
      LoginService.validaUsuario(vm.user).then(function (result) {
        vm.user = result.data;
        if (!vm.user.username) {
          console.log('Este usuário não está cadastrado no sistema');
        } else {
          console.log("Usuário logado");
          LoginService.logado(true);
          LoginService.setUsuarioLogado(vm.user);
          $scope.modal.hide();
          console.log(LoginService.isLogado())
        }
      }, function (response) {
        console.log(response)
      });
    };

    vm.logout = function () {
      LoginService.logout().then(function (data) {
      }, function (response) {
        console.log(response.data);
      });
    };

    vm.clear = function () {
      vm.user = '';
    };
  }
})();

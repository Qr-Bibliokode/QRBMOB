(function () {
  'use strict';

  angular
    .module('starter')
    .factory('LoginService', ['$http', '$q', 'ResourcesFactory', LoginService]);

  /** @ngInject */
  function LoginService($http, $q, ResourcesFactory) {

    var vm = this;

    vm.usuario = '';
    vm.usuarioLogado = false;

    function setUsuarioLogado(usuario) {
      vm.usuario = usuario;
    }

    function getUsuarioLogado() {
      return vm.usuario;
    }

    function logado(logado) {
      vm.usuarioLogado = logado;
    }

    function isLogado() {
      return vm.usuarioLogado;
    }

    function validaUsuario(user) {
      var d = $q.defer();
      $http.get(ResourcesFactory.CONTA_USUARIOS_API + "validaUsuario?username=" + user.username + "&password=" + user.password).then(function (response, $q) {
          d.resolve(response);
        },
        function (data) {
          d.reject(data);
        });
      return d.promise;
    }

    return {
      logado: logado,
      isLogado: isLogado,
      validaUsuario: validaUsuario,
      getUsuarioLogado: getUsuarioLogado,
      setUsuarioLogado: setUsuarioLogado
    };
  }
})();

(function () {
  'use strict';

  angular
    .module('starter')
    .factory('LoginService', ['$http', '$q', LoginService]);

  function LoginService($http, $q) {

    var url = "http://192.168.0.15:8080/api/contaUsuario/";
    var vm = this;

    vm.usuarioLogado = false;

    function logado(logado) {
      vm.usuarioLogado = logado;
    }

    function isLogado() {
      return vm.usuarioLogado;
    }

    function validaUsuario(user) {
      var d = $q.defer();
      $http.get(url + "validaUsuario?username=" + user.username + "&password=" + user.password).then(function (response, $q) {
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
      validaUsuario: validaUsuario
    };
  }
})();

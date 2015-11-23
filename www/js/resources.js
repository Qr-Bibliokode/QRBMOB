(function () {
  'use strict';

  angular
    .module('starter')
    .factory('ResourcesFactory', [ResourcesFactory]);

  /** @ngInject */
  function ResourcesFactory() {
    var resource = 'http://192.168.0.15:8080/';

    return {
      DOMAIN_SERVER: resource,
      LIVROS_API: resource + 'api/livro/',
      CONTA_USUARIOS_API: resource + 'api/contaUsuario/',
      EMPRESTIMOS_API: resource + 'api/emprestimo/'
    };
  }
})();

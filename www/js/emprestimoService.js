(function () {
  'use strict';

  angular
    .module('starter')
    .factory('EmprestimoFactory', ['$http', '$q', 'ResourcesFactory', EmprestimoFactory]);

  /** @ngInject */
  function EmprestimoFactory($http, $q, ResourcesFactory) {

    function emprestar(emprestimo) {
      var d = $q.defer();
      $http.post(ResourcesFactory.EMPRESTIMOS_API + 'emprestar/', emprestimo).then(function (response, $q) {
          d.resolve(response);
        },
        function (data) {
          d.reject(data);
        });
      return d.promise;
    }

    return {
      emprestar: emprestar
    };
  }
})();

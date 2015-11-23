(function () {
  'use strict';

  angular
    .module('starter')
    .factory('LivroFactory', ['$http', '$q', 'ResourcesFactory', LivroFactory]);

  /** @ngInject */
  function LivroFactory($http, $q, ResourcesFactory) {

    function getById(id) {
      var d = $q.defer();
      $http.get(ResourcesFactory.LIVROS_API + id).then(function (response, $q) {
          d.resolve(response);
        },
        function (data) {
          d.reject(data);
        });
      return d.promise;
    }

    return {
      getById: getById
    };
  }
})();

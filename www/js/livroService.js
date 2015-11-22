(function () {
  'use strict';

  angular
    .module('starter')
    .factory('LivroFactory', ['$http', '$q', LivroFactory]);

  function LivroFactory($http, $q) {

    var url = "http://192.168.1.203:8080/api/livro/";

    function getById(id) {
      var d = $q.defer();
      $http.get(url + id).then(function (response, $q) {
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

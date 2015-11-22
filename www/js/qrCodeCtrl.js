(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('QrCodeCtrl', ['LivroFactory', QrCodeCtrl]);

  /** @ngInject */
  function QrCodeCtrl(LivroFactory) {
    var vm = this;
    vm.settings = {
      enableFriends: true
    };

    vm.livro = '';

    vm.obtenhaLivro = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          buscaLIvro(result.text);
        },
        function (error) {
          alert("Opa! Um erro aconteceu: " + error);
        }
      );

      function buscaLIvro(codigo) {
        LivroFactory.getById(codigo).then(function (response) {
          vm.livro = response.data;
        }, function (data) {
          alert("Erro: " + data);
        });
      }

    };
  }
})();

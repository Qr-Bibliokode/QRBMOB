(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('QrCodeCtrl', ['LivroFactory', 'LoginService', 'EmprestimoFactory', QrCodeCtrl]);

  /** @ngInject */
  function QrCodeCtrl(LivroFactory, LoginService, EmprestimoFactory) {
    var vm = this;
    vm.settings = {
      enableFriends: true
    };

    vm.livro = '';

    vm.obtenhaLivro = function () {
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          buscaLivro(result.text);
        },
        function (error) {
          alert("Opa! Um erro aconteceu: " + error);
        }
      );

      function buscaLivro(codigo) {
        LivroFactory.getById(codigo).then(function (response) {
          vm.livro = response.data;
        }, function (data) {
          alert("Erro: " + data);
        });
      }
    };
    
    // Uso para testes com ionic
    //vm.buscaLivro = function () {
    //  LivroFactory.getById(4).then(function (response) {
    //    vm.livro = response.data;
    //  }, function (data) {
    //    alert("Erro: " + data);
    //  });
    //};

    vm.emprestarLivro = function () {
      vm.emprestimo = {livro: vm.livro, contaUsuario: LoginService.getUsuarioLogado()};
      EmprestimoFactory.emprestar(vm.emprestimo).then(function (response) {
        vm.emprestimo = response.data;
      }, function (data) {
        alert("Erro: " + data);
      });
    };
  }
})();

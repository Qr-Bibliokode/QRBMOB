(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('NoticiasController', ['$stateParams', '$filter', QrCodeCtrl]);

  /** @ngInject */
  function QrCodeCtrl($stateParams, $filter) {
    var vm = this;
    vm.noticiaDetalhada = '';

    vm.noticias = [
      {
        id: 1,
        titulo: "Novo livro !",
        conteudo: "Semana que vem estão chegando novos livros!"
      },
      {
        id: 2,
        titulo: "Período de ferias",
        conteudo: "A biblioteca estará fechada do dia 21/11 até 25/11."
      }
    ];


    vm.loadNoticia = function () {
      vm.noticiaDetalhada = $filter('filter')(vm.noticias, {id: $stateParams.noticiaId})[0];
    };

    vm.loadNoticia();

  }
})();

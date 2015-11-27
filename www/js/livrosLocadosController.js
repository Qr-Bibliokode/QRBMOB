(function () {
  'use strict';

  angular
    .module('starter.controllers')
    .controller('NoticiasController', ['$stateParams', '$filter', QrCodeCtrl]);

  /** @ngInject */
  function QrCodeCtrl($stateParams, $filter) {

    var vm = this;

    vm.livrosLocados = [
      {
        id: 1,
        ISBN: 1231231,
        titulo: "Código limpo",
        sinopse: "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar " +
        "com uma empresa de desenvolvimento. Perdem-se a cada ano horas incontáveis e recursos " +
        "importantes devido a um código mal escrito. O especialista em software, Robert C. Martin," +
        " apresenta um paradigma com 'Código limpo - Habilidades Práticas do Agile Software.' " +
        "O leitor poderá aprender a ler códigos e descobrir o que está correto e errado neles. " +
        "'Código limpo' está divido em três partes. Na primeira há diversos capítulos que descrevem " +
        "os princípios, padrões e práticas para criar um código limpo. A segunda parte consiste em " +
        "diversos casos de estudo de complexidade cada vez maior. Cada um é um exercício para limpar " +
        "um código - transformar o código base que possui alguns problemas em melhores e mais eficientes. " +
        "A terceira parte é a compensação - um único capítulo com uma lista de heurísticas e 'odores' " +
        "reunidos durante a criação dos estudos de caso."
      }
    ];


    vm.loadHistorico = function () {
      //Procura livros pelo id da conta $stateParams.idConta
      //
    };

    vm.loadHistorico();

  }
})();

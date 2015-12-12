angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

		.run(function ($ionicPlatform) {
			$ionicPlatform.ready(function () {
				if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					StatusBar.styleDefault();
				}
			});
		})

		.config(function ($stateProvider, $urlRouterProvider) {

			$stateProvider

					.state('tab', {
						url: '/tab',
						abstract: true,
						templateUrl: 'templates/tabs.html',
						controller: 'LoginCtrl',
						controllerAs: 'vm'
					})

					.state('tab.home', {
						url: '/home',
						views: {
							'tab-home': {
								templateUrl: 'templates/tab-home.html',
								controller: 'LoginCtrl',
								controllerAs: 'vm'
							}
						}
					})

					.state('tab.emprestimos', {
						url: '/emprestimos',
						views: {
							'tab-emprestimos': {
								templateUrl: 'templates/tab-emprestimos.html',
								controller: 'EmprestimosCtrl',
								controllerAs: 'vm'
							}
						}
					})

					.state('tab.emprestimo-detalhes', {
						url: '/emprestimos/:emprestimoId',
						views: {
							'tab-emprestimos': {
								templateUrl: 'templates/emprestimo-detalhes.html',
								controller: 'EmprestimoDetalhesCtrl',
								controllerAs: 'vm'
							}
						}
					})

					.state('tab.consulta', {
						url: '/consulta',
						views: {
							'tab-consulta': {
								templateUrl: 'templates/tab-consulta.html',
								controller: 'ConsultaCtrl',
								controllerAs: 'vm'
							}
						}
					});

			$urlRouterProvider.otherwise('/tab/home');

		});

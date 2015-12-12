angular.module('starter.controllers', [])

		.controller('LoginCtrl', function ($scope, LoginService, AlertFactory) {
			var vm = this;
			vm.user = '';

			vm.isLogado = function () {
				return LoginService.isLogado();
			};

			vm.login = function () {
				LoginService.validaUsuario(vm.user).then(function (result) {
					vm.user = result.data;
					LoginService.logado(true);
					LoginService.setUsuarioLogado(vm.user);
					AlertFactory.success("Bem-vindo " + vm.user.pessoa.nome);
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};

			vm.logout = function () {
				LoginService.logout().then(function (data) {
					AlertFactory.success("Volte sempre !");
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};

			vm.clear = function () {
				vm.user = '';
			};
		})

		.controller('EmprestimosCtrl', function (EmprestimoService, LivroFactory, LoginService, $scope, AlertFactory) {
			var vm = this;

			vm.livro = '';

			vm.loadList = function () {
				return EmprestimoService.loadList();
			};

			vm.getEmprestimos = function () {
				return EmprestimoService.getList();
			};

			vm.obtenhaLivro = function () {
				cordova.plugins.barcodeScanner.scan(
						function (result) {
							buscaLivro(result.text);
						},
						function (response) {
							AlertFactory.grailsError(response.data);
						}
				);

				function buscaLivro(codigo) {
					LivroFactory.getById(codigo).then(function (response) {
						vm.livro = response.data;
					}, function (response) {
						AlertFactory.grailsError(response.data);
					});
				}
			};

			vm.emprestarLivro = function () {
				vm.emprestimo = {livro: vm.livro, contaUsuario: LoginService.getUsuarioLogado()};
				EmprestimoService.emprestar(vm.emprestimo).then(function (response) {
					vm.emprestimo = response.data;
					AlertFactory.success("Foi enviada uma solicitação de empréstimo.");
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};

			vm.devolverLivro = function (id) {
				vm.emprestimo = {livro: vm.livro, contaUsuario: LoginService.getUsuarioLogado()};
				EmprestimoService.devolver(id).then(function (response) {
					vm.emprestimo = response.data;
					AlertFactory.success("Foi enviada uma solicitação de devolução.");
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};

			vm.doRefresh = function () {
				vm.loadList().finally(function () {
					$scope.$broadcast('scroll.refreshComplete');
				});
			};

			vm.loadList();
		})

		.controller('EmprestimoDetalhesCtrl', function ($stateParams, EmprestimoService, AlertFactory) {
			var vm = this;

			vm.emprestimo = '';

			vm.obtenhaEmprestimo = function () {
				EmprestimoService.getById($stateParams.emprestimoId).then(function (response) {
					vm.emprestimo = response.data;
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};

			vm.obtenhaEmprestimo();

		})

		.controller('ConsultaCtrl', function (ConsultaFactory, AlertFactory) {
			var vm = this;

			vm.tituloLivro = '';
			vm.estoques = [];

			vm.consultaDisponibilidade = function () {
				ConsultaFactory.consultaDisponibilidade(vm.tituloLivro).then(function (response) {
					vm.estoques = response.data;
				}, function (response) {
					AlertFactory.grailsError(response.data);
				});
			};
		});



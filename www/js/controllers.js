angular.module('starter.controllers', [])

    .controller('LoginCtrl', function ($scope, LoginService) {
        var vm = this;
        vm.user = '';

        vm.isLogado = function () {
            return LoginService.isLogado();
        };

        vm.login = function () {
            LoginService.validaUsuario(vm.user).then(function (result) {
                vm.user = result.data;
                if (!vm.user.username) {
                    console.log('Este usuário não está cadastrado no sistema');
                } else {
                    console.log("Usuário logado");
                    LoginService.logado(true);
                    LoginService.setUsuarioLogado(vm.user);
                    console.log(LoginService.isLogado())
                }
            }, function (response) {
                console.log(response)
            });
        };

        vm.logout = function () {
            LoginService.logout().then(function (data) {
            }, function (response) {
                console.log(response.data);
            });
        };

        vm.clear = function () {
            vm.user = '';
        };
    })

    .controller('EmprestimosCtrl', function (EmprestimoService, LivroFactory, LoginService) {
        var vm = this;

        vm.livro = '';

        vm.emprestimos = EmprestimoService.all();

        vm.remove = function (emprestimo) {
            EmprestimoService.remove(emprestimo);
        };

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

        vm.emprestarLivro = function () {
            vm.emprestimo = {livro: vm.livro, contaUsuario: LoginService.getUsuarioLogado()};
            EmprestimoService.emprestar(vm.emprestimo).then(function (response) {
                vm.emprestimo = response.data;
            }, function (data) {
                alert("Erro: " + data);
            });
        };

        vm.devolverLivro = function () {
            vm.emprestimo = {livro: vm.livro, contaUsuario: LoginService.getUsuarioLogado()};
            EmprestimoService.devolver(vm.emprestimo).then(function (response) {
                vm.emprestimo = response.data;
            }, function (data) {
                alert("Erro: " + data);
            });
        };

        //vm.buscaLivro = function () {
        //    LivroFactory.getById(4).then(function (response) {
        //        vm.livro = response.data;
        //    }, function (data) {
        //        alert("Erro: " + data);
        //    });
        //};
    })

    .controller('EmprestimoDetalhesCtrl', function ($stateParams, EmprestimoService) {
        var vm = this;

        vm.emprestimo = EmprestimoService.get($stateParams.emprestimoId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });



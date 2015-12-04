angular.module('starter.services', [])

    .factory('EmprestimoService', function ($http, $q, ResourcesFactory) {
        var emprestimo = '';
        var emprestimos = [];

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

        function devolver(id) {
            var d = $q.defer();
            $http.get(ResourcesFactory.EMPRESTIMOS_API + 'devolver?emprestimoId=' + id).then(function (response, $q) {
                    d.resolve(response);
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        function getList() {
            return emprestimos;
        }

        function remove(emprestimo) {
            emprestimos.splice(emprestimos.indexOf(emprestimo), 1);
        }

        function loadList() {
            var d = $q.defer();
            $http.get(ResourcesFactory.EMPRESTIMOS_API).then(function (response, $q) {
                    d.resolve(response);
                    emprestimos = response.data;
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        function getById(emprestimoId) {
            var d = $q.defer();
            $http.get(ResourcesFactory.EMPRESTIMOS_API + emprestimoId).then(function (response, $q) {
                    d.resolve(response);
                    emprestimo = response.data;
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        return {
            getList: getList,
            remove: remove,
            getById: getById,
            emprestar: emprestar,
            devolver: devolver,
            loadList: loadList
        };
    })

    .factory('LoginService', function ($http, $q, ResourcesFactory) {
        var vm = this;

        vm.usuario = '';
        vm.usuarioLogado = false;

        function isLogado() {
            return vm.usuarioLogado;
        }

        function validaUsuario(user) {
            var d = $q.defer();
            $http.get(ResourcesFactory.CONTA_USUARIOS_API + "validaUsuario?username=" + user.username + "&password=" + user.password).then(function (response, $q) {
                    d.resolve(response);
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        function logado(logado) {
            vm.usuarioLogado = logado;
        }

        function logout() {
            vm.usuario = '';
            vm.usuarioLogado = false;
        }

        function setUsuarioLogado(usuario) {
            vm.usuario = usuario;
        }

        function getUsuarioLogado() {
            return vm.usuario;
        }

        return {
            logado: logado,
            isLogado: isLogado,
            validaUsuario: validaUsuario,
            logout: logout,
            getUsuarioLogado: getUsuarioLogado,
            setUsuarioLogado: setUsuarioLogado
        };
    })

    .factory('ResourcesFactory', function () {
        //var resource = 'http://192.168.0.15:8080/'; // Use este endereço para rodar localmente
        var resource = 'http://ws.qrbcode.com.br:8080/';


        return {
            DOMAIN_SERVER: resource,
            LIVROS_API: resource + 'api/livro/',
            CONTA_USUARIOS_API: resource + 'api/contaUsuario/',
            EMPRESTIMOS_API: resource + 'api/emprestimo/',
            ESTOQUE_API: resource + 'api/estoque/'
        };
    })

    .factory('LivroFactory', function ($http, $q, ResourcesFactory) {
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
    })

    .factory('ConsultaFactory', function ($http, $q, ResourcesFactory) {
        function consultaDisponibilidade(tituloLivro) {
            debugger;
            var d = $q.defer();
            $http.get(ResourcesFactory.ESTOQUE_API + "consultaDisponibilidade?tituloLivro=" + tituloLivro).then(function (response, $q) {
                    d.resolve(response);
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        return {
            consultaDisponibilidade: consultaDisponibilidade
        };
    });

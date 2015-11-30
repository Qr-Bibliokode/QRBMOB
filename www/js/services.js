angular.module('starter.services', [])

    .factory('EmprestimoService', function ($http, $q, ResourcesFactory) {
        var emprestimos = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

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

        function devolver(emprestimo) {
            var d = $q.defer();
            $http.post(ResourcesFactory.EMPRESTIMOS_API + 'emprestar/', emprestimo).then(function (response, $q) {
                    d.resolve(response);
                },
                function (data) {
                    d.reject(data);
                });
            return d.promise;
        }

        function all() {
            return emprestimos;
        }

        function remove(emprestimo) {
            emprestimos.splice(emprestimos.indexOf(emprestimo), 1);
        }

        function get(emprestimoId) {
            for (var i = 0; i < emprestimos.length; i++) {
                if (emprestimos[i].id === parseInt(emprestimoId)) {
                    return emprestimos[i];
                }
            }
            return null;
        }

        return {
            all: all,
            remove: remove,
            get: get,
            emprestar: emprestar,
            devolver: devolver
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
        //var resource = 'http://192.168.0.15:8080/';
        var resource = 'http://ws.qrbcode.com.br:8080/';


        return {
            DOMAIN_SERVER: resource,
            LIVROS_API: resource + 'api/livro/',
            CONTA_USUARIOS_API: resource + 'api/contaUsuario/',
            EMPRESTIMOS_API: resource + 'api/emprestimo/'
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
    });

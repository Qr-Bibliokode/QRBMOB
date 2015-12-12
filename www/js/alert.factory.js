(function () {
	'use strict';

	angular
			.module('starter.controllers')
			.factory('AlertFactory', ['$ionicPopup', AlertFactory]);

	function AlertFactory($ionicPopup) {

		function showAlert(type, msg) {

			var alertPopup = $ionicPopup.alert({
				title: type,
				template: msg
			});
			alertPopup.then(function (res) {
			});
		}

		return {
			error: function (msg) {
				showAlert('Erro !', msg)
			},
			success: function (msg) {
				showAlert('Sucesso !', msg)
			},
			grailsError: function (data) {
				showAlert('Erro !', data.errors[0].message)
			}
		};
	}
})();
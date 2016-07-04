var app = angular.module("jogoDaVelha", []);
app.controller("jogoDaVelhaCtrl", function ($scope) {

	$scope.initJogo = function() {
		$scope.campos = [
			[{linha: 0, coluna: 0},{linha: 0, coluna: 1},{linha: 0, coluna: 2}],
			[{linha: 1, coluna: 0},{linha: 1, coluna: 1},{linha: 1, coluna: 2}],
			[{linha: 2, coluna: 0},{linha: 2, coluna: 1},{linha: 2, coluna: 2}]
		];
		$scope.ultimoValor = "o";
		$(".tabuleiro").removeClass("bloquear-clique").removeClass("ganhou").removeClass("perdeu");
	}

	$scope.setValue = function (campo) {
		campo.valorProv = "";
		if (!campo.valor) {
			if ($scope.ultimoValor == "o") {
				campo.valor = "x";
				$scope.ultimoValor = "x";
			} else {
				campo.valor = "o";
				$scope.ultimoValor = "o";
			}
		}
		verificaTerminoJogo();
	}

	function getCampo(linha, coluna) {
		var campo = null;
		angular.forEach($scope.campos, function(linhas) {
			angular.forEach(linhas, function(campo2) {
				if (campo2.linha == linha && campo2.coluna == coluna) {
					campo = campo2;
				}
			});
		});
		return campo;
	}

	function verificaTerminoJogo() {
		var acabou = false;

		var campo0 = getCampo(0, 0);
		var campo1 = getCampo(0, 1);
		var campo2 = getCampo(0, 2);
		var campo3 = getCampo(1, 0);
		var campo4 = getCampo(1, 1);
		var campo5 = getCampo(1, 2);
		var campo6 = getCampo(2, 0);
		var campo7 = getCampo(2, 1);
		var campo8 = getCampo(2, 2);

		if (campo0.valor && campo0.valor == campo1.valor && campo0.valor == campo2.valor) {
			acabou = true;
		}
		if (campo3.valor && campo3.valor == campo4.valor && campo3.valor == campo5.valor) {
			acabou = true;
		}
		if (campo6.valor && campo6.valor == campo7.valor && campo6.valor == campo8.valor) {
			acabou = true;
		}

		if (campo0.valor && campo0.valor == campo3.valor && campo0.valor == campo6.valor) {
			acabou = true;
		}
		if (campo1.valor && campo1.valor == campo4.valor && campo1.valor == campo7.valor) {
			acabou = true;
		}
		if (campo2.valor && campo2.valor == campo5.valor && campo2.valor == campo8.valor) {
			acabou = true;
		}

		if (campo0.valor && campo0.valor == campo4.valor && campo0.valor == campo8.valor) {
			acabou = true;
		}
		if (campo2.valor && campo2.valor == campo4.valor && campo2.valor == campo6.valor) {
			acabou = true;
		}

		var todosCamposCompletos = true;
		angular.forEach($scope.campos,  function(linha) {
			angular.forEach(linha,  function(campo) {
				if (!campo.valor) {
					todosCamposCompletos = false;
				}
			});
		});

		if (todosCamposCompletos) {
			$(".tabuleiro").addClass("bloquear-clique").addClass("perdeu");
		}

		if (acabou) {
			$(".tabuleiro").addClass("bloquear-clique").addClass("ganhou");
		}
	}

	$scope.mouseOver = function(campo) {
		if (!campo.valor) {
			if ($scope.ultimoValor == "x") {
				campo.valorProv = "o";
			} else {
				campo.valorProv = "x";
			}
		}
		
	}
	$scope.mouseLeave = function(campo) {
		campo.valorProv = "";
	}
	
});
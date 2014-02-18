angular.module('appController', []).
	
	controller('TodoCtrl', function($scope, $http, $location, $anchorScroll) {
		
		$scope.User = [];					
		$scope.BtnAddUser = true;		
		$scope.valueName = "";
		$scope.valueIdade = "";
		$scope.valueEmail = "";		
		$scope.Ordem = 'UserNome';
		$scope.indiceAlteracao = -1;        				
			
		$scope.EnableButton = function() {					
			if($scope.valueName == "" || $scope.valueIdade == "" || $scope.valueEmail == ""){
				$scope.BtnAddUser = true;						
			}else{
				$scope.BtnAddUser = false;
			}
		};
		
		$scope.AddUser = function() {			
			if($scope.indiceAlteracao === -1){		
				$scope.User.push({UserNome:$scope.valueName, UserIdade:$scope.valueIdade, UserEmail:$scope.valueEmail});
				$scope.ClearUser();
				console.log($scope.User);
			}else{	
				$scope.indiceAlteracao.UserNome = $scope.valueName;
				$scope.indiceAlteracao.UserIdade = $scope.valueIdade;
				$scope.indiceAlteracao.UserEmail = $scope.valueEmail;
				$scope.ClearUser();
				$scope.indiceAlteracao = -1;				
			}
		};
		
		$scope.EditUser = function() {	
			$scope.valueName = $scope.User[this.$index].UserNome;
			$scope.valueIdade = $scope.User[this.$index].UserIdade;			
			$scope.valueEmail = $scope.User[this.$index].UserEmail;
			$scope.indiceAlteracao = $scope.User[this.$index];				
		};
		
		$scope.ClearUser = function() {	
			$scope.valueName = "";
			$scope.valueIdade = ""; 
			$scope.valueEmail = "";				
		};
		
		$scope.DeleteUser = function() {	
			$scope.User.splice([this.$index], 1);
		};
		
		$scope.ImportJSON = function() {
			$.ajax({
				type: 'GET',
				dataType: "JSON",
				url:'dados.html',				 			
				success: function(data){					
					$scope.User = data.User;		
					if(!$scope.$$phase){
						$scope.$apply();
					}
				},
				error: function(data){
					alert("OCORREU UM ERRO NA IMPORTAÇÃO!");
				}
			})			
		};
		
		$scope.ExportarJSON = function() {
			$.ajax({
				type: 'POST',
				dataType: "JSON",
				url:'dados.html',				
				success: function(data){					
					$scope.User = data.User;		
					if(!$scope.$$phase){
						$scope.$apply();
					}
				},
				error: function(data){
					alert("OCORREU UM ERRO NA IMPORTAÇÃO!");
				}
			})									
		};	
	}
);



 
	
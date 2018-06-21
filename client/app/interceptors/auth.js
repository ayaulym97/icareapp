/**
 * Created by askhat on 11.05.17.
 */
export default ($state, $rootScope) => {
	"ngInject";

	return {
		request: (config) => {
			return config;
		},
		response: (response) => {
			let statusCode = response.status;

			$rootScope.$broadcast("Auth.CheckUser");

			if (statusCode === -1) { // Offline or timeout
				// $state.go('auth');
				// TODO: Выкинуть пользователя если будет разрыв соединения и удалять все данные
				$rootScope.$broadcast("Network.Offline");
				return response;
			}

			if (statusCode === 401) { // Unauthorized
				$rootScope.$broadcast("Auth.Unauthorized");
				return false;
			}

			if (statusCode === 402) { // PaymentRequired
				$rootScope.$broadcast("App.PaymentRequired");
				$rootScope.$broadcast("Auth.Unauthorized");
				return false;
			}

			if (response.hasOwnProperty("data")) {
				if (response.data.hasOwnProperty("detail")) {
					if (response.data.detail === "Invalid token.") {
						$rootScope.$broadcast("Auth.ClearUserInfo");
					}
				}
			}
			return response;
		}
	};
};

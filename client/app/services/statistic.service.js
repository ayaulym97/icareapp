/*
 * Created by amirkaaa on 5/8/17.
 */

import APIConfig from "../utils/config";

class StatisticService {
	constructor($http) {
		"ngInject";
		this.$http = $http;
	}

	clinicStatistic(data) {
		return this.$http.post(APIConfig.API_URL + "statistic/place/", data).then((response) => response.data);
	}

	helperStatistic(data) {
		return this.$http.post(APIConfig.API_URL + "statistic/helper/", {
			helper: data.id,
			start_date: data.start_date,
			end_date: data.end_date
		}).then((response) => response.data);
	}

	requestStatistic(data) {
		return this.$http.post(APIConfig.API_URL + "statistic/get_history/", data).then((response) => {
			return response.data;
		}, (error) => {
			return error;
		});
	}
}

export default StatisticService;

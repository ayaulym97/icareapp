/**
 * Created by askhat on 11.05.17.
 */
class Types {
	static get services() {
		return {
			PROCEDURE: 0,
			MED_TEST: 1,
			list: [
				{name: "Процедуры", id: "0"},
				{name: "Обследования и анализы", id: "1"}
			]
		};
	}

	static get workTime() {
		return {
			days: [
				{name: "Понедельник", id: 1},
				{name: "Вторник", id: 2},
				{name: "Среда", id: 3},
				{name: "Четверг", id: 4},
				{name: "Пятница", id: 5},
				{name: "Суббота", id: 6},
				{name: "Воскресенье", id: 7},
			],
			status: {
				working: 0,
				notWorking: 1
			}
		};
	}

	static get doctor() {
		return {
			types: [
				{
					name: "Доктор",
					id: 0
				},
				{
					name: "Мед. сестра",
					id: 1
				},
				{
					name: "Мед. брат",
					id: 2
				}
			],
			statuses: [
				{
					name: "Активен",
					id: 0
				},
				{
					name: "Неактивен",
					id: 1
				}
			],
			categories: [
				{
					name: "Средняя",
					id: 1
				},
				{
					name: "Высокая",
					id: 2
				},
				{
					name: "Очень высокая",
					id: 3
				}
			]
		};
	}

	static get logic() {
		return {
			YES: 1,
			NO: 0,
			list: [
				{
					name: "Да",
					id: 1
				},
				{
					name: "Нет",
					id: 0
				}
			]
		};
	}

	static get request() {
		return {
			type: {
				DOCTOR_HOUR: 0,
				PROCEDURE: 1,
				MED_TEST: 2,
				DOCTOR_ON_CALL: 3
			},
			typeList: [
				{
					name: "Консультация у врача",
					id: 0
				},
				{
					name: "Медицинские процедуры",
					id: 1
				},
				{
					name: "Обследования и анализы",
					id: 2
				},
				{
					name: "Вызов врача на дом",
					id: 3
				}
			]
		};
	}
}

export default Types;

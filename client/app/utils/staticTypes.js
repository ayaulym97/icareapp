export default {
	REQUEST_TYPES: [
		{
			type: 0,
			consultation: 2,
			name: "doctorHour",
			text: "Консультация у врача",
			placeholder: "Введите специальность или имя врача",
			img: "/assets/images/icons/64/doctorhour_white.png",
		},
		{
			type: 1,
			name: "procedure",
			text: "Медицинские процедуры",
			placeholder: "Введите название обследования или процедуры",
			img: "/assets/images/icons/64/procedure_white.png",
		},
		{
			type: 2,
			name: "medTest",
			text: "Обследования и анализы",
			placeholder: "Введите вид медицинского анализа или теста",
			img: "/assets/images/icons/64/medtest_white.png",
		},
		{
			type: 3,
			consultation: 1,
			name: "doctorOnCall",
			text: "Вызов врача на дом",
			placeholder: "Введите специальность или имя врача",
			img: "/assets/images/icons/64/doctoroncall_white.png"
		}
	],
	CATEGORIES: [
		{
			category: 0,
			text: "Врач без категории"
		},
		{
			category: 1,
			text: "Врач второй категории"
		},
		{
			category: 2,
			text: "Врач первой категории"
		},
		{
			category: 3,
			text: "Врач высшей категории"
		}
	],

	SEARCH_OPTIONS: {
		threshold: 0.4,
		location: 0,
		distance: 100,
		maxPatternLength: 100,
		minMatchCharLength: 2,
		keys: ["name"]
	},

	CONSULTATION_TIME_RANGE: [
		{
			text: "УТРО",
			range: [
				{time: "08:00 - 08:30", value: "8:00"},
				{time: "08:30 - 09:00", value: "8:30"},
				{time: "09:00 - 09:30", value: "9:00"},
				{time: "09:30 - 10:00", value: "9:30"},
				{time: "10:00 - 10:30", value: "10:00"},
				{time: "10:30 - 11:00", value: "10:30"},
				{time: "11:00 - 11:30", value: "11:00"},
				{time: "11:30 - 12:00", value: "11:30"},
			]
		},
		{
			text: "ДЕНЬ",
			range: [
				{time: "12:00 - 12:30", value: "12:00"},
				{time: "12:30 - 13:00", value: "12:30"},
				{time: "13:00 - 13:30", value: "13:00"},
				{time: "13:30 - 14:00", value: "13:30"},
				{time: "14:00 - 14:30", value: "14:00"},
				{time: "14:30 - 15:00", value: "14:30"},
				{time: "15:00 - 15:30", value: "15:00"},
				{time: "15:30 - 16:00", value: "15:30"},
				{time: "16:00 - 16:30", value: "16:00"},
				{time: "16:30 - 17:00", value: "16:30"},
				{time: "17:00 - 17:30", value: "17:00"},
				{time: "17:30 - 18:00", value: "17:30"},
			]
		},
		{
			text: "ВЕЧЕР",
			range: [
				{time: "18:00 - 18:30", value: "18:00"},
				{time: "18:30 - 19:00", value: "18:30"},
				{time: "19:00 - 19:30", value: "19:00"},
				{time: "19:30 - 20:00", value: "19:30"}
			]
		}
	],
	MEDTEST_TIME_RANGE: [
		{
			text: "УТРО",
			range: [
				{time: "08:00 - 08:15", value: "8:00"},
				{time: "08:15 - 08:30", value: "8:15"},
				{time: "08:30 - 08:45", value: "8:30"},
				{time: "08:45 - 09:00", value: "8:45"},
				{time: "09:00 - 09:15", value: "9:00"},
				{time: "09:15 - 09:30", value: "9:15"},
				{time: "09:30 - 09:45", value: "8:30"},
				{time: "09:45 - 10:00", value: "9:45"},
				{time: "10:00 - 10:15", value: "10:00"},
				{time: "10:15 - 10:30", value: "10:15"},
				{time: "10:30 - 10:45", value: "10:30"},
				{time: "10:45 - 11:00", value: "10:45"},
				{time: "11:00 - 11:15", value: "11:00"},
				{time: "11:15 - 11:30", value: "11:15"},
				{time: "11:30 - 11:45", value: "11:30"},
				{time: "11:45 - 12:00", value: "11:45"},
			]
		},
		{
			text: "ДЕНЬ",
			range: [
				{time: "12:00 - 12:15", value: "12:00"},
				{time: "12:15 - 12:30", value: "12:15"},
				{time: "12:30 - 12:45", value: "12:30"},
				{time: "12:45 - 13:00", value: "12:45"},
				{time: "13:00 - 13:15", value: "13:00"},
				{time: "13:15 - 13:30", value: "13:15"},
				{time: "13:30 - 13:45", value: "13:30"},
				{time: "13:45 - 14:00", value: "13:45"},
				{time: "14:00 - 14:15", value: "14:00"},
				{time: "14:15 - 14:30", value: "14:15"},
				{time: "14:30 - 14:45", value: "14:30"},
				{time: "14:45 - 15:00", value: "14:45"},
				{time: "15:00 - 15:15", value: "15:00"},
				{time: "15:15 - 15:30", value: "15:15"},
				{time: "15:30 - 15:45", value: "15:30"},
				{time: "15:45 - 16:00", value: "15:45"},
				{time: "16:00 - 16:15", value: "16:00"},
				{time: "16:15 - 16:30", value: "16:15"},
				{time: "16:30 - 16:45", value: "16:30"},
				{time: "16:45 - 17:00", value: "16:45"},
				{time: "17:00 - 17:15", value: "17:00"},
				{time: "17:15 - 17:30", value: "17:15"},
				{time: "17:30 - 17:45", value: "17:30"},
				{time: "17:45 - 18:00", value: "17:45"}
			]
		},
	]
};


//   CONSULTATION_TIME_RANGE: [
//   { time: "08:00 - 08:30", value: "8:00" },
//   { time: "08:30 - 09:00", value: "8:30" },
//   { time: "09:00 - 09:30", value: "9:00" },
//   { time: "09:30 - 10:00", value: "9:30" },
//   { time: "10:00 - 10:30", value: "10:00" },
//   { time: "10:30 - 11:00", value: "10:30" },
//   { time: "11:00 - 11:30", value: "11:00" },
//   { time: "11:30 - 12:00", value: "11:30" },
//   { time: "12:00 - 12:30", value: "12:00" },
//   { time: "12:30 - 13:00", value: "12:30" },
//   { time: "13:00 - 13:30", value: "13:00" },
//   { time: "13:30 - 14:00", value: "13:30" },
//   { time: "14:00 - 14:30", value: "14:00" },
//   { time: "14:30 - 15:00", value: "14:30" },
//   { time: "15:00 - 15:30", value: "15:00" },
//   { time: "15:30 - 16:00", value: "15:30" },
//   { time: "16:00 - 16:30", value: "16:00" },
//   { time: "16:30 - 17:00", value: "16:30" },
//   { time: "17:00 - 17:30", value: "17:00" },
//   { time: "17:30 - 18:00", value: "17:30" },
//   { time: "18:00 - 18:30", value: "18:00" },
//   { time: "18:30 - 19:00", value: "18:30" },
//   { time: "19:00 - 19:30", value: "19:00" },
//   { time: "19:30 - 20:00", value: "19:30" }
// ],
//    MEDTEST_TIME_RANGE: [
//   { time: "08:00 - 08:15", value: "8:00" },
//   { time: "08:15 - 08:30", value: "8:15" },
//   { time: "08:30 - 08:45", value: "8:30" },
//   { time: "08:45 - 09:00", value: "8:45" },
//   { time: "09:00 - 09:15", value: "9:00" },
//   { time: "09:15 - 09:30", value: "9:15" },
//   { time: "09:30 - 09:45", value: "8:30" },
//   { time: "09:45 - 10:00", value: "9:45" },
//   { time: "10:00 - 10:15", value: "10:00" },
//   { time: "10:15 - 10:30", value: "10:15" },
//   { time: "10:30 - 10:45", value: "10:30" },
//   { time: "10:45 - 11:00", value: "10:45" },
//   { time: "11:00 - 11:15", value: "11:00" },
//   { time: "11:15 - 11:30", value: "11:15" },
//   { time: "11:30 - 11:45", value: "11:30" },
//   { time: "11:45 - 12:00", value: "11:45" },
//   { time: "12:00 - 12:15", value: "12:00" },
//   { time: "12:15 - 12:30", value: "12:15" },
//   { time: "12:30 - 12:45", value: "12:30" },
//   { time: "12:45 - 13:00", value: "12:45" },
//   { time: "13:00 - 13:15", value: "13:00" },
//   { time: "13:15 - 13:30", value: "13:15" },
//   { time: "13:30 - 13:45", value: "13:30" },
//   { time: "13:45 - 14:00", value: "13:45" },
//   { time: "14:00 - 14:15", value: "14:00" },
//   { time: "14:15 - 14:30", value: "14:15" },
//   { time: "14:30 - 14:45", value: "14:30" },
//   { time: "14:45 - 15:00", value: "14:45" },
//   { time: "15:00 - 15:15", value: "15:00" },
//   { time: "15:15 - 15:30", value: "15:15" },
//   { time: "15:30 - 15:45", value: "15:30" },
//   { time: "15:45 - 16:00", value: "15:45" },
//   { time: "16:00 - 16:15", value: "16:00" },
//   { time: "16:15 - 16:30", value: "16:15" },
//   { time: "16:30 - 16:45", value: "16:30" },
//   { time: "16:45 - 17:00", value: "16:45" },
//   { time: "17:00 - 17:15", value: "17:00" },
//   { time: "17:15 - 17:30", value: "17:15" },
//   { time: "17:30 - 17:45", value: "17:30" },
//   { time: "17:45 - 18:00", value: "17:45" }
// ]
// };


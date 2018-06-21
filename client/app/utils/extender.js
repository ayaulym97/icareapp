export default class Extender {
	constructor() {
		let args = arguments[0];
		let names = this.constructor.$inject; // вытаскиваем имена которые дал нам DI

		for (let index in args) { // шарим аргументы
			if (!args.hasOwnProperty(index)) continue;
			this[names[index]] = args[index];
		}
	}
}

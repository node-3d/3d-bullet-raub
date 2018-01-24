//TODO: f => []
class Observer {
	constructor(keytype) {
		document.addEventListener(keytype, event => this._onDocumentKeyDown(event), false);
		this.observers = new Map();
		console.log('constructor', keytype);
	}

	registerObserver(keyCode, f) {
		this.observers.set(keyCode, f);
	}

	removeObserver(keyCode) {
		this.observers.delete(keyCode);
	}

	_onDocumentKeyDown(event) {
		const keyCode = event.which;
		console.log('keyCode', keyCode);
		if (this.observers.has(keyCode)) {
			this.observers.get(keyCode)();
		}
	}
}

module.exports = Observer;

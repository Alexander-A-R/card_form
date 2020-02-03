'use strict';

export function createSubmitString(state) {
	const formatNumber = addSpacesToNumber(state.cardNumber);
	const dateCard = `${state.month}/${state.year}`;
	return `card number: ${formatNumber}<br>name holder: ${store.state.cardHolder}<br>` +
	`date card: ${dateCard}<br>cvv: ${store.state.cvv}`;
}

export function addSpacesToNumber(number) {
	const numberByFour = number.match(/\d{1,4}/g);
	if (numberByFour) {
		return numberByFour.join(' ');
	} else {
		return number;
	}
}

export function testNumber(number) {
	if (/\D/.test(number.slice(-1)) || number.length > 19) {
		return false;
	}
	return true;
}

export function addSharps(number) {
	const newNumber = number.split('');

	for (let i = 0; i < 16; i++) {
		if (i >= number.length) {
			newNumber.push('#');
		}
	}
	return newNumber.join('');
}

export function testHolder(name) {
	if (/[^A-Za-z\s]|^\s/.test(name) || name.length > 20) {
		return false;
	} else {
		return true;
	}
}

export function testCVV(cvv) {
	if (/\D/.test(cvv) || cvv.length > 3) {
		return false;
	} else {
		return true;
	}
}
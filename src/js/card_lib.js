'use strict';

import {addSharps} from './string.js';

export function setNumberOnCard(state) {
	const cardNumber = document.querySelector('.card__number');
	const partsOfNumber = cardNumber.querySelectorAll('.card__number__part');

	const newNumber = addSharps(state.cardNumber);

	partsOfNumber[0].innerHTML = newNumber.slice(0, 4);
	partsOfNumber[1].innerHTML = newNumber.slice(4, 8);
	partsOfNumber[2].innerHTML = newNumber.slice(8, 12);
	partsOfNumber[3].innerHTML = newNumber.slice(12, 16);
}

export function setHolderOnCard(state) {
	if (state.cardHolder === '') {
		const holder = document.querySelector('#cardHolder');
		holder.innerHTML = 'name';	
	} else {
		const holder = document.querySelector('#cardHolder');
		holder.innerHTML = state.cardHolder;
	}
}

export function setMonthOnCard(state) {
	const date = document.querySelector('#date');
	if (state.month !== '') {
		date.innerHTML = state.month + date.innerHTML.substring(2);
	}
}

export function setYearOnCard(state) {
	const date = document.querySelector('#date');
	if (state.year !== '') {
		date.innerHTML = date.innerHTML.substring(0, 3) + state.year;
	}
}

export function checkSubmitData(state) {
	const isEmpty = state.cardNumber === '' || state.cardHolder === '' ||
	state.month === '' || state.year === '' || state.cvv === '';
	if (isEmpty) {
		return 'Some fields are empty';
	}
	if (state.errors.length !== 0) {
		return 'Some data is incorrect';
	}
	return false;
}
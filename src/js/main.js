'use strict';

import store, {setCardNumber, setCardHolder, setMonth, setYear, setCVV, addError, removeError} from './store.js';
import {setNumberOnCard, setHolderOnCard, setMonthOnCard, setYearOnCard, checkSubmitData} from './card_lib.js';
import modalShow from './modal.js';
import {createSubmitString, addSpacesToNumber, testNumber, testHolder, testCVV} from './string.js';

window.store = store;

cardForm.onsubmit = (e) => {
	e.preventDefault();
	const checkedData = checkSubmitData(store.state);
	if (checkedData) {
		modalShow(checkedData)
		return;
	}
	modalShow(createSubmitString(store.state));
};

modalOk.onclick = function(e) {
	document.querySelector('.modal').classList.remove('modal_show');
}

cardNumber.oninput = (e) => {
	if (!testNumber(e.target.value)) {
		e.target.value = e.target.value.slice(0, -1);
		return;
	}

	document.querySelector('#numberField').classList.remove('form__field_error');
	store.dispatch(removeError('numberField'));

	store.dispatch(setCardNumber(e.target.value.replace(/\s/g, '')));
	e.target.value = addSpacesToNumber(e.target.value);
};

function setInputError(id, errorMessage) {
	const field = document.getElementById(id);
	field.querySelector('.form__field__error').innerHTML = errorMessage;
		field.classList.add('form__field_error');
		store.dispatch(addError(id));
}

cardNumber.onblur = (e) => {
	if (e.target.value.length === 0) {
		setInputError('numberField', 'this field is required');
	} else if (e.target.value.length < 19) {
		setInputError('numberField', 'incorrect number');
	}
}

cardName.oninput = function(e) {
	if (!testHolder(e.target.value)) {
		e.target.value = e.target.value.slice(0, -1);
		return;
	}
	document.querySelector('#nameField').classList.remove('form__field_error');
	store.dispatch(setCardHolder(e.target.value));
	store.dispatch(removeError('nameField'));
};

cardName.onblur = function(e) {
	const nameField = document.querySelector('#nameField');

	if (e.target.value.length === 0) {
		nameField.classList.add('form__field_error');
		store.dispatch(addError('nameField'));
	} else {
		nameField.classList.remove('form__field_error');
		store.dispatch(removeError('nameField'));
	}
}

month.onchange = function(e) {
	document.querySelector('#monthField').classList.remove('form__field_error');
	store.dispatch(removeError('monthField'));

	const selected = e.target.options[e.target.selectedIndex];
	store.dispatch(setMonth(selected.value));
}

month.onblur = function(e) {
	if (e.target.selectedIndex === 0) {
		document.querySelector('#monthField').classList.add('form__field_error');
		store.dispatch(addError('monthField'));
	}
}

year.onchange = function(e) {
	document.querySelector('#yearField').classList.remove('form__field_error');
	store.dispatch(removeError('yearField'));

	const selected = e.target.options[e.target.selectedIndex];
	store.dispatch(setYear(selected.value));
}

year.onblur = function(e) {
	if (e.target.selectedIndex === 0) {
		document.querySelector('#yearField').classList.add('form__field_error');
		store.dispatch(addError('yearField'));
	}
}

cvv.oninput = function(e) {
	if (!testCVV(e.target.value)) {
		e.target.value = e.target.value.slice(0, -1);
		return;
	}
	document.querySelector('#cvvField').classList.remove('form__field_error');
	store.dispatch(setCVV(e.target.value));
	store.dispatch(removeError('cvvField'));
}

cvv.onblur = function(e) {
	if (e.target.value.length === 0) {
		setInputError('cvvField', 'this field is required');
	} else if (e.target.value.length < 3) {
		setInputError('cvvField', 'incorrect cvv');
	}
}

store.subscribe(setNumberOnCard);
store.subscribe(setHolderOnCard);
store.subscribe(setMonthOnCard);
store.subscribe(setYearOnCard);
'use strict';

const SET_CARD_NUMBER = 'SET-CARD-NUMBER';
const SET_CARD_HOLDER = 'SET-CARD-HOLDER';
const SET_MONTH = 'SET-MONTH';
const SET_YEAR = 'SET-YEAR';
const SET_CVV = 'SET-CVV';
const ADD_ERROR = 'ADD-ERROR';
const REMOVE_ERROR = 'REMOVE-ERROR';

const reducer = (state, action) => {
	switch(action.type) {
		case SET_CARD_NUMBER:
			return {
				...state,
				cardNumber: action.cardNumber
			};
		case SET_CARD_HOLDER:
			return {
				...state,
				cardHolder: action.cardHolder
			}
		case SET_MONTH:
			return {
				...state,
				month: action.month
			}
		case SET_YEAR:
			return {
				...state,
				year: action.year
			}
		case SET_CVV:
			return {
				...state,
				cvv: action.cvv
			}
		case ADD_ERROR:
			return {
				...state,
				errors: state.errors.some(error => error === action.error) ? state.errors : [...state.errors, action.error]
			}
		case REMOVE_ERROR:
			return {
				...state,
				errors: state.errors.filter(error => error !== action.error)
			}
		default:
			return state;
	}
};

export const setCardNumber = (cardNumber) => ({type: SET_CARD_NUMBER, cardNumber});
export const setCardHolder = (cardHolder) => ({type: SET_CARD_HOLDER, cardHolder});
export const setMonth = (month) => ({type: SET_MONTH, month});
export const setYear = (year) => ({type: SET_YEAR, year});
export const setCVV = (cvv) => ({type: SET_CVV, cvv});
export const addError = (error) => ({type: ADD_ERROR, error});
export const removeError = (error) => ({type: REMOVE_ERROR, error});

let store = {
	state: {
		cardNumber: '',
		cardHolder: '',
		month: '',
		year: '',
		cvv: '',
		errors: []
	},

	subscribes: [],

	observer() {
		if (this.subscribes.length === 0) {
			console.log('No subscribes...')
			return;
		} else {
			for (let func of this.subscribes) {
				func(this.state);
			}
		}
	},

	subscribe(func) {
		this.subscribes.push(func);
	},

	dispatch(action) {
		const newState = reducer(this.state, action);
		if (this.state === newState) {
			return;
		} else {
			this.state = newState;
			this.observer();
		}
	}
};

export default store;
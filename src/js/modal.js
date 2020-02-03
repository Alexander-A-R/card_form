function showModal(text) {
	const modal = document.querySelector('.modal');
	const modalMessage = modal.querySelector('.modal__window__message');
	modalMessage.innerHTML = text;
	modal.classList.add('modal_show');
	modal.querySelector('.modal__window__btn').focus();
}

export default showModal;
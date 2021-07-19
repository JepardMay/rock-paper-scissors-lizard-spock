import { onEscKeyPress, showOverlay, hideOverlay } from './utils';

const initModal = () => {
  const modal = document.getElementById('rules-modal');

  const onEscPress = (evt) => {
    onEscKeyPress(evt, closeModal);
  };

  const onOverlayClick = (evt) => {
    if (evt.target.closest('.overlay') && !evt.target.closest('.modal--open')) {
      closeModal();
    }
  };

  const closeModal = () => {
    modal.classList.remove('modal--open');
    hideOverlay();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOverlayClick);
  };

  const openModal = () => {
    console.log('click');
    const closeBtn = modal.querySelector('.btn-close');

    closeBtn.addEventListener('click', closeModal);
    modal.classList.add('modal--open');
    showOverlay();
    document.addEventListener('keydown', onEscPress);
    // document.addEventListener('click', onOverlayClick);
  };

  document.addEventListener('click', (evt) => {
    if (evt.target.closest('#rules-btn')) {
      openModal();
    } else if (!evt.target.closest('#rules-modal')) {
      closeModal();
    }
  });
};

export { initModal };

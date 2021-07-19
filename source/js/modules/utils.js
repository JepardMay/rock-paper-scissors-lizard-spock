const ESC_KEYCODE = 27;
const overlay = document.querySelector('.overlay');

const onEscKeyPress = (evt, onPress) => {
  if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === ESC_KEYCODE) {
    onPress();
  }
};

const showOverlay = function () {
  overlay.classList.add('overlay--show');
};

const hideOverlay = function () {
  overlay.classList.remove('overlay--show');
};

export { onEscKeyPress, showOverlay, hideOverlay };

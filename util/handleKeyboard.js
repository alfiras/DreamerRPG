const handleKeyboard = (state) => {
  window.addEventListener("keydown", (evt) => {
    switch (evt.key) {
      case "ArrowLeft":
        state.set({
          x: state.get().x - 1,
          y: state.get().y,
        });
        break;
      case "ArrowRight":
        state.set({
          x: state.get().x + 1,
          y: state.get().y,
        });
        break;
      case "ArrowUp":
        state.set({
          x: state.get().x,
          y: state.get().y - 1,
        });
        break;
      case "ArrowDown":
        state.set({
          x: state.get().x,
          y: state.get().y + 1,
        });
        break;

      default:
        break;
    }
  });
};

export default handleKeyboard;

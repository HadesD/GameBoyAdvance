class GamePadManager
{
  gamepad = null;
  rafId = null;

  constructor()
  {
    console.log('GamePadManager.constructor called');

    this.update = this.update.bind(this);
    this.onGamePadConnected = this.onGamePadConnected.bind(this);
    this.onGamePadDisconnected = this.onGamePadDisconnected.bind(this);

    window.addEventListener("gamepadconnected", this.onGamePadConnected);
    window.addEventListener("gamepaddisconnected", this.onGamePadDisconnected);
  }

  destroy()
  {
    console.log('GamePadManager.destroy called');

    window.removeEventListener("gamepadconnected", this.onGamePadConnected);
    window.removeEventListener("gamepaddisconnected", this.onGamePadDisconnected);

    window.cancelAnimationFrame(this.rafId);
  }

  start()
  {
  }

  update()
  {
    console.log('GamePadManager.update called');

    console.log(this.gamepad);

    // At end, loop
    this.rafId = window.requestAnimationFrame(this.update);
  }

  onGamePadConnected(e)
  {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);

    var pads = navigator.getGamepads ? navigator.getGamepads() :
      (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    this.gamepad = pads[e.gamepad.index];

    console.log('GamePadManager.start called');

    this.rafId = window.requestAnimationFrame(this.update);

    console.log('GamePadManager.start.id:' + this.rafId);
  }

  onGamePadDisconnected(e)
  {
    this.destroy();
  }
}

export default GamePadManager;


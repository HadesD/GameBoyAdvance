class GamepadManager
{
  gamepads = [];
  rafId = null;
  scanIntervalId = null;

  constructor()
  {
    console.log('GamepadManager.constructor called');

    this.update = this.update.bind(this);
    this.onGamepadConnected = this.onGamepadConnected.bind(this);
    this.onGamepadDisconnected = this.onGamepadDisconnected.bind(this);
    this.scanGamepads = this.scanGamepads.bind(this);

    window.addEventListener("gamepadconnected", this.onGamepadConnected);
    window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);
  }

  destroy()
  {
    console.log('GamepadManager.destroy called');

    window.removeEventListener("gamepadconnected", this.onGamepadConnected);
    window.removeEventListener("gamepaddisconnected", this.onGamepadDisconnected);

    window.cancelAnimationFrame(this.rafId);

    clearInterval(this.scanIntervalId);
  }

  start()
  {
    this.scanIntervalId = setInterval(this.scanGamepads, 500);
  }

  update()
  {
    console.log('GamepadManager.update called');

    console.log(this.gamepads);

    // At end, loop
    this.rafId = window.requestAnimationFrame(this.update);
  }

  scanGamepads()
  {
    console.log('GamepadManager.scanGamepads called');
    let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gamepads.length; i++)
    {
      if (!gamepads[i])
      {
        continue;
      }

      if (gamepads[i].index in this.gamepads)
      {
        this.gamepads[i] = gamepads[i];
      }
      else
      {
        this.addGamepad(gamepads[i]);
      }
    }
  }

  addGamepad(gamepad)
  {
    this.gamepads[gamepad.index] = gamepad;

    this.rafId = window.requestAnimationFrame(this.update);
    console.log('GamepadManager.start.id:' + this.rafId);
  }

  onGamepadConnected(e)
  {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
      e.gamepad.index, e.gamepad.id,
      e.gamepad.buttons.length, e.gamepad.axes.length);

  }

  onGamepadDisconnected(e)
  {
    delete this.gamepads[e.gamepad.index];
  }
}

export default GamepadManager;


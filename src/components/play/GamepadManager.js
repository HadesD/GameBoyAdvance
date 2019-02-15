class GamepadManager
{
  gamepads = [];
  rafId = null;
  scanIntervalId = null;
  selectedIndex = 0;

  constructor(parent)
  {
    console.log('GamepadManager.constructor called');

    this.parentRef = parent;

    this.update = this.update.bind(this);
    this.onGamepadConnected = this.onGamepadConnected.bind(this);
    this.onGamepadDisconnected = this.onGamepadDisconnected.bind(this);
    this.scanGamepads = this.scanGamepads.bind(this);
  }

  start()
  {
    window.addEventListener("gamepadconnected", this.onGamepadConnected);
    window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);

    this.scanIntervalId = setInterval(this.scanGamepads, 500);
  }

  destroy()
  {
    console.log('GamepadManager.destroy called');

    window.removeEventListener("gamepadconnected", this.onGamepadConnected);
    window.removeEventListener("gamepaddisconnected", this.onGamepadDisconnected);

    window.cancelAnimationFrame(this.rafId);

    clearInterval(this.scanIntervalId);
  }

  update()
  {
    console.log('GamepadManager.update called');

    const gamepad = this.gamepads[this.selectedIndex];
    console.log(gamepad);
    for (let i = 0; i < gamepad.buttons.length; i++)
    {
      let val = gamepad.buttons[i];
      let isPressed = (val === 1.0);
      if (typeof(val) === 'object')
      {
        isPressed = val.pressed;
        val = val.value;
      }

      console.log(val, isPressed);
    }

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


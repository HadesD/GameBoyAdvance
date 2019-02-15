class KeyboardManager
{
  constructor(parent)
  {
    this.parent = parent;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    this.keyMapConfig = {
      A: 90,
      B: 88,
      SELECT: 83,
      START: 65,
      RIGHT: 39,
      LEFT: 37,
      UP: 38,
      DOWN: 40,
      R: 87,
      L: 81,
    };
    this.pushedList = {};
  }

  start()
  {
    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("keyup", this.onKeyUp);

    this.emulatorManager = this.parent.emulatorRef.current.emulatorManager;
  }

  destroy()
  {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("keyup", this.onKeyUp);
  }

  getJoykey(keyCode)
  {
    return Object.keys(this.keyMapConfig).find((elm) => {
      return this.keyMapConfig[elm] === keyCode;
    });
  }

  setActiveJoykey(keyType, isActive)
  {
    const joystickRef = this.parent.joystickRef.current;
    joystickRef.setActive(keyType, isActive);
  }

  onKeyDown(e)
  {
    // console.log(e.keyCode);

    const keyCode = e.keyCode;
    if (this.pushedList[keyCode])
    {
      e.preventDefault();
      return;
    }

    let keyType = this.getJoykey(keyCode);

    if (!keyType)
    {
      return;
    }

    e.preventDefault();

    this.pushedList[keyCode] = true;

    this.setActiveJoykey(keyType, true);

    this.emulatorManager.onPressed(keyType);
  }

  onKeyUp(e)
  {
    // console.log(e);
    const keyCode = e.keyCode;

    let keyType = this.getJoykey(keyCode);

    if (!keyType)
    {
      return;
    }

    e.preventDefault();

    this.pushedList[keyCode] = false;

    this.setActiveJoykey(keyType, false);

    this.emulatorManager.onReleased(keyType);
  }
}

export default KeyboardManager;


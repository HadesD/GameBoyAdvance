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

  setActiveJoykey(keyCode, isActive)
  {
    let joykey = this.getJoykey(keyCode);

    if (!joykey)
    {
      return false;
    }

    const joystickRef = this.parent.joystickRef.current;
    joystickRef.setActive(joykey, isActive);

    return true;
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

    if (!this.setActiveJoykey(keyCode, true))
    {
      return;
    }

    e.preventDefault();
    this.pushedList[keyCode] = true;

    // console.log(joystickRef);
  }

  onKeyUp(e)
  {
    // console.log(e);
    const keyCode = e.keyCode;
    if (!this.setActiveJoykey(keyCode, false))
    {
      return;
    }
    e.preventDefault();
    this.pushedList[keyCode] = false;
  }
}

export default KeyboardManager;


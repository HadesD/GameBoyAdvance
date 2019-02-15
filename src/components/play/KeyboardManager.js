class KeyboardManager
{
  constructor(parent)
  {
    this.parent = parent;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
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
    let joykey;
    switch (keyCode)
    {
      case 37:
        joykey = 'left';
        break;
      case 38:
        joykey = 'up';
        break;
      case 39:
        joykey = 'right';
        break;
      case 40:
        joykey = 'down';
        break;
      case 90:
        joykey = 'a';
        break;
      case 88:
        joykey = 'b';
        break;
      default:
        return;
    }

    return joykey;
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


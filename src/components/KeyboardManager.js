class KeyboardManager
{
  parentRef = null;

  constructor(parent)
  {
    this.parentRef = parent;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
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

  onKeyDown(e)
  {
    console.log(e);
  }

  onKeyUp(e)
  {
    console.log(e);
  }
}

export default KeyboardManager;


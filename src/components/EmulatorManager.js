import GameBoy from '../libs/amebo';

class EmulatorManager
{
  gbApi = null;
  gbaApi = null;

  construct(parent)
  {
    console.log('EmulatorManager.constructor called');

    this.parent = parent;
  }

  start()
  {
    // this.gbApi = new GameBoy('', parent.screenRef.current);
  }

  destroy()
  {
    this.gbApi = null;
  }

  loadRomBuffer(buffer)
  {
    console.log(buffer);
  }

  loadRomUrl(url)
  {
  }
}

export default EmulatorManager;


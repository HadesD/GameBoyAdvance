import GameBoy from '../libs/amebo';

class EmulatorManager
{
  gbApi = null;
  gbaApi = null;

  constructor(parent)
  {
    console.log('EmulatorManager.constructor called');

    this.parent = parent;
  }

  start()
  {
    // this.gbApi = new GameBoy('', );
    this.emulatorScreen = this.parent.screenRef.current;
  }

  destroy()
  {
    this.gbApi = null;
  }

  loadRomBuffer(buffer)
  {
    buffer = (buffer instanceof ArrayBuffer) ? (new Uint8Array(buffer)) : buffer;
    console.log(buffer);
    console.log(
      'RomType: %d, Size: %d', buffer[0x147],
      buffer[0x148]
    );

    // For GB/GBC ROM
    const OFFSET_NAME = 0x134;
    let romName = '';
    for (let i = OFFSET_NAME; i < (OFFSET_NAME + 16); i++)
    {
      let charCode = buffer[i];
      if ((charCode === 0x80) || (charCode === 0xc0))
      {
        break;
      }
      romName += String.fromCharCode(charCode);
    }
    console.log('RomName: %s', romName);
  }

  loadRomUrl(url)
  {
  }
}

export default EmulatorManager;


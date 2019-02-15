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
    this.emulatorScreen = this.parent.screenRef.current;
    this.gbApi = new GameBoy('', this.emulatorScreen);
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

    this.gbApi.loadROMBuffer(buffer);
  }

  loadRomUrl(url)
  {
  }

  // Like input.type="file" / drag|drop.file
  loadRomFile(fileObj)
  {
    const self = this;
    let reader = new FileReader();
    reader.onload = function(e) {
      // let arrayBuffer = e.result;
      console.log(e.target.result);
      self.loadRomBuffer(e.target.result);
      // let array = new Uint8Array(arrayBuffer);
        // binaryString = String.fromCharCode.apply(null, array);

      // console.log(binaryString);
    }
    console.log(fileObj);
    reader.readAsArrayBuffer(fileObj);
  }
}

export default EmulatorManager;


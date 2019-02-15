import GameBoy from './lib/amebo';
import { Zlib } from 'zlibjs/bin/unzip.min';

class EmulatorManager
{
  gbApi = null;
  gbaApi = null;

  currentRomFileName = null; // The file name of rom
  currentRomName = null; // Name in ROM OFFSET
  currentRomGameType = null; // GBA/GB/GBC

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
    const hRequest = new XMLHttpRequest();
    hRequest.open('GET', url);
    hRequest.onload = function(e) {
      console.log(e);
    };
    hRequest.send();
  }

  // Like input.type="file" / drag|drop.file
  loadRomFile(fileObj)
  {
    const self = this;
    const reader = new FileReader();
    reader.addEventListener('load', function(e) {
      console.log(fileObj.name);
      const buffer = e.target.result;
      if (fileObj.name.indexOf('.zip') !== -1)
      {
        self.loadRomZipFile(buffer);
        return;
      }
      this.loadRomBuffer(buffer);
    });
    console.log(fileObj);
    reader.readAsArrayBuffer(fileObj);
  }

  // Buffer is Zip file ArrayBuffer
  loadRomZipFile(buffer)
  {
    console.log(Zlib);
    const unzip = new Zlib.Unzip(new Buffer(buffer));
    const filenames = unzip.getFilenames();
    for (let i = 0; i < filenames.length; i++)
    {
      const filename = filenames[i];
      if (filename.indexOf('.gb') !== -1)
      {
        this.loadRomBuffer(new Uint8Array(unzip.decompress(filename)));
        break;
      }
    }
    console.log(filenames);
  }
}

export default EmulatorManager;


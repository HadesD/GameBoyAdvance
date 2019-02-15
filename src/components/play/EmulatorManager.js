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

    // Main key codes
    // keyCode<KeyType, Code>
    this.keyCodes = {
      A: 0,
      B: 1,
      SELECT: 2,
      START: 3,
      RIGHT: 4,
      LEFT: 5,
      UP: 6,
      DOWN: 7,
      R: 8,
      L: 9,
    };
    this.pushedKeyList = {};
  }

  start()
  {
    this.emulatorScreen = this.parent.screenRef.current;
    this.gbApi = new GameBoy('', this.emulatorScreen);
    this.gbApi.keyConfig = this.parent.parent.keyboardManager.keyMapConfig;
  }

  destroy()
  {
    this.gbApi = null;
  }

  loadRomBuffer(buffer)
  {
    buffer = (buffer instanceof ArrayBuffer) ? (new Uint8Array(buffer)) : buffer;

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
      const buffer = e.target.result;
      if (fileObj.name.indexOf('.zip') !== -1)
      {
        self.loadRomZipFile(buffer);
        return;
      }
      self.loadRomBuffer(buffer);
    });
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
        this.loadRomBuffer(unzip.decompress(filename));
        break;
      }
    }
    console.log(filenames);
  }

  onPressed(keyType)
  {
    const key = this.keyCodes[keyType];
    if (!key)
    {
      return;
    }
    this.pushedKeyList[key] = true;
  }

  onReleased(keyType)
  {
    const key = this.keyCodes[keyType];
    if (!key)
    {
      return;
    }
    this.pushedKeyList[key] = false;
  }
}

export default EmulatorManager;


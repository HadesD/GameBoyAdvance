import GameBoy from './lib/amebo';
import { Zlib } from 'zlibjs/bin/unzip.min';

class EmulatorManager
{
  constructor(parent)
  {
    console.log('EmulatorManager.constructor called');

    this.parent = parent;

    // Main key codes
    // keyCode<KeyType, Code>
    this.keyCodes = {
      A: 1,
      B: 2,
      SELECT: 3,
      START: 4,
      RIGHT: 5,
      LEFT: 6,
      UP: 7,
      DOWN: 8,
      R: 9,
      L: 10,
    };
    this.pushedKeyList = {};

    this.gameType = {
      GB: 1,
      GBA: 2,
    };

    this.rom = {
      codeName: null, // Name in ROM OFFSET
      fileName: null,
      gameType: null, // GB / GBA
    };

    this.emuApi = null;

    this.isPaused = true;
  }

  start()
  {
    this.emulatorScreen = this.parent.screenRef.current;
    this.keyboardManager = this.parent.parent.keyboardManager;
  }

  destroy()
  {
    if (this.emuApi/* && this.emuApi.destroy*/)
    {
      this.emuApi.destroy();
    }
  }

  loadRomBuffer(buffer)
  {
    buffer = (buffer instanceof ArrayBuffer) ? (new Uint8Array(buffer)) : buffer;

    this.destroy();

    this.rom.gameType = this.gameType.GB;

    this.emuApi = new GameBoy('', this.emulatorScreen);
    this.emuApi.keyConfig = this.keyboardManager.keyMapConfig;

    this.emuApi.loadROMBuffer(buffer);
    this.isPaused = false;
    this.rom.codeName = this.emuApi.getROMName();

    console.log(this.rom);
  }

  loadRomUrl(url)
  {
    const hRequest = new XMLHttpRequest();
    hRequest.open('GET', url);
    hRequest.onload = function(e) {
      console.log(e);
      // this.rom.fileName = fileName;
    };
    hRequest.send();
  }

  // Like input.type="file" / drag|drop.file
  loadRomFile(fileObj)
  {
    const self = this;
    const reader = new FileReader();
    reader.onload = function(e) {
      const buffer = e.target.result;
      if (fileObj.name.indexOf('.zip') !== -1)
      {
        self.loadRomZipFile(buffer);
        return;
      }

      self.rom.fileName = fileObj.name;
      self.loadRomBuffer(buffer);
    };
    reader.readAsArrayBuffer(fileObj);
  }

  // Buffer is Zip file ArrayBuffer
  loadRomZipFile(buffer)
  {
    const unzip = new Zlib.Unzip(new Buffer(buffer));
    const fileNames = unzip.getFilenames();
    for (let i = 0; i < fileNames.length; i++)
    {
      const fileName = fileNames[i];
      if (fileName.indexOf('.gb') !== -1)
      {
        this.rom.fileName = fileName;
        this.loadRomBuffer(unzip.decompress(fileName));
        break;
      }
    }
  }

  onPressed(keyType)
  {
    if (this.isPaused)
    {
      return;
    }

    const key = this.keyCodes[keyType];
    if (!key)
    {
      return;
    }
    this.pushedKeyList[key] = true;

    console.log('onPressed: %s', keyType);

    this.updateKeyState(keyType, this.pushedKeyList[key]);
  }

  onReleased(keyType)
  {
    if (this.isPaused)
    {
      return;
    }

    const key = this.keyCodes[keyType];
    if (!key)
    {
      return;
    }
    this.pushedKeyList[key] = false;

    console.log('onRelease: %s', keyType);

    this.updateKeyState(keyType, this.pushedKeyList[key]);
  }

  // Update for each emulator
  updateKeyState(keyType, value)
  {
    switch (this.rom.gameType)
    {
      case this.gameType.GB: {
        this.emuApi.keysArray[this.keyboardManager.keyMapConfig[keyType]] = value ? 0 : 1;
        break;
      }
      case this.gameType.GBA: {

        break;
      }
      default:
        return;
    }
  }

  pause()
  {
    this.isPaused = true;
  }
}

export default EmulatorManager;


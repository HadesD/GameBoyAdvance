import { Zlib } from 'zlibjs/bin/unzip.min';
import load from 'load-script';

import VBAInterface from './lib/gbaninja/VBAInterface';

class EmulatorManager
{
  constructor(parent)
  {
    console.log('EmulatorManager.constructor called');

    this.parent = parent;

    this.apiReady = {
      GB: window.amebo ? true : false,
      GBA: window.gbaninja ? true : false,
    };

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
    this.pressedKeyList = {};

    this.gameType = {
      GB: 1,
      GBA: 2,
    };

    this.rom = {
      codeName: null, // Name in ROM OFFSET
      fileName: null,
      gameType: null, // GB / GBA
      buffer: null,
    };

    this.emuApi = null;

    this.isPaused = true;
  }

  start()
  {
    this.keyboardManager = this.parent.parent.keyboardManager;

    const self = this;

    if (!this.apiReady.GB)
    {
      load(`${process.env.PUBLIC_URL}/lib/amebo.js`, function(err, script) {
        if (err)
        {
          console.error(err);
          return;
        }
        self.apiReady.GB = true;
      });
    }

    if (!this.apiReady.GBA)
    {
      load(`${process.env.PUBLIC_URL}/lib/gbaninja.js`, function(err, script) {
        if (err)
        {
          console.error(err);
          return;
        }
        self.apiReady.GBA = true;
      });
    }
  }

  destroy()
  {
    if (this.emuApi)
    {
      this.emuApi.destroy();
    }
  }

  isKeyPressed(key)
  {
    const keyCode = this.keyCodes[key];
    if (!keyCode)
    {
      return false;
    }
    return this.pressedKeyList[keyCode];
  }

  releaseAllKey()
  {
    const keys = Object.keys(this.keyCodes);
    for (let i = 0; i < keys.length; i++)
    {
      this.onReleased(keys[i]);
    }
  }

  isGBRom(buffer)
  {
    let gbMagic = [
      buffer[0x0104], buffer[0x0105], buffer[0x0106], buffer[0x0107],
      buffer[0x0108], buffer[0x0109], buffer[0x010A], buffer[0x010B],
    ].map(function (v) {
      return v.toString(16);
    }).join();
    return (gbMagic === 'ce,ed,66,66,cc,d,0,b');
  }

  getRomName() {
    const isGBA = (this.rom.gameType === this.gameType.GBA);
    const startOffset = isGBA ? 0xA0 : 0x134;
    const endOffset = startOffset + 16;
    let name = '';
    for (let i = startOffset; i < endOffset; i++)
    {
      const charCode = this.rom.buffer[i];
      if ((charCode === 0x80) || (charCode === 0xC0) || (charCode === 0x0))
      {
        break;
      }
      name += String.fromCharCode(charCode);
    }
    return name;
  }

  isGBARom(buffer)
  {
    return true;
  }

  loadRomBuffer(buffer)
  {
    if (this.rom.fileName.indexOf('.gb') === -1)
    {
      return;
    }

    this.rom.buffer = (buffer instanceof ArrayBuffer) ? (new Uint8Array(buffer)) : buffer;

    this.destroy();

    const screen = this.parent.refs.screen;
    while (screen.hasChildNodes())
    {
      screen.removeChild(screen.lastChild);
    }
    const graphic = document.createElement('canvas');
    screen.appendChild(graphic);

    if (this.isGBRom(this.rom.buffer))
    {
      this.rom.gameType = this.gameType.GB;

      this.emuApi = new window.amebo(graphic);
      this.emuApi.keyConfig = this.keyboardManager.keyMapConfig;
      this.emuApi.loadROMBuffer(this.rom.buffer);
    }
    else if (this.isGBARom(buffer))
    {
      this.rom.gameType = this.gameType.GBA;

      this.emuApi = new VBAInterface(graphic);
      this.emuApi.emulatorManager = this;
      this.emuApi.setRomBuffer(this.rom.buffer);
    }

    this.rom.codeName = this.getRomName();

    this.emuApi.start();

    this.isPaused = false;

    console.log(this.rom);
  }

  loadRomUrl(url)
  {
    const hRequest = new XMLHttpRequest();
    hRequest.open('GET', url);
    hRequest.responseType = 'arraybuffer';
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
    this.pressedKeyList[key] = true;

    console.log('onPressed: %s', keyType);

    this.updateKeyState(keyType, this.pressedKeyList[key]);
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
    this.pressedKeyList[key] = false;

    console.log('onRelease: %s', keyType);

    this.updateKeyState(keyType, this.pressedKeyList[key]);
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


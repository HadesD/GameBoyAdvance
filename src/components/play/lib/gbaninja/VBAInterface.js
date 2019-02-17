import VBAGraphics from './VBAGraphics';
import VBASound from './VBASound';

function VBAInterface(wasmEmu, graphic)
{
  window.VBAInterface = this;

  this.vbaGraphics = new VBAGraphics(wasmEmu, graphic);

  const GBA_CYCLES_PER_SECOND = 16777216;
  // var TARGET_FRAMERATE = 500;
  const lastFrameTime = window.performance.now();
  // window.frameTimeout = null;
  let animationFrameRequest = null;
  // window.frameNum = 1;
  // window.lastFocusTime = 0;
  const self = this;

  const gbaninja = wasmEmu;

  this.setRomBuffer = function(buffer) {
    this.romBuffer8 = buffer;
  };

  this.VBA_get_emulating = function () {
    return gbaninja.ccall("VBA_get_emulating", "int", [], []);
  };

  this.VBA_start = function () {
    return gbaninja.ccall("VBA_start", "int", [], []);
  };

  this.VBA_do_cycles = function (cycles) {
    return gbaninja.ccall("VBA_do_cycles", "int", ["int"], [cycles]);
  };

  this.VBA_stop = function () {
    return gbaninja.ccall("VBA_stop", "int", [], []);
  };

  this.VBA_get_bios = function () {
    return gbaninja.ccall("VBA_get_bios", "int", [], []);
  };

  this.VBA_get_rom = function () {
    return gbaninja.ccall("VBA_get_rom", "int", [], []);
  };

  this.VBA_get_internalRAM = function () {
    return gbaninja.ccall("VBA_get_internalRAM", "int", [], []);
  };

  this.VBA_get_workRAM = function () {
    return gbaninja.ccall("VBA_get_workRAM", "int", [], []);
  };

  this.VBA_get_paletteRAM = function () {
    return gbaninja.ccall("VBA_get_paletteRAM", "int", [], []);
  };

  this.VBA_get_vram = function () {
    return gbaninja.ccall("VBA_get_vram", "int", [], []);
  };

  this.VBA_get_pix = function () {
    return gbaninja.ccall("VBA_get_pix", "int", [], []);
  };

  this.VBA_get_oam = function () {
    return gbaninja.ccall("VBA_get_oam", "int", [], []);
  };

  this.VBA_get_ioMem = function () {
    return gbaninja.ccall("VBA_get_ioMem", "int", [], []);
  };

  this.VBA_get_systemColorMap16 = function () {
    return gbaninja.ccall("VBA_get_systemColorMap16", "int", [], []);
  };

  this.VBA_get_systemColorMap32 = function () {
    return gbaninja.ccall("VBA_get_systemColorMap32", "int", [], []);
  };

  this.VBA_get_systemFrameSkip = function () {
    return gbaninja.ccall("VBA_get_systemFrameSkip", "int", [], []);
  };

  this.VBA_set_systemFrameSkip = function (n) {
    return gbaninja.ccall("VBA_set_systemFrameSkip", "int", ["int"], [n]);
  };

  this.VBA_get_systemSaveUpdateCounter = function () {
    return gbaninja.ccall("VBA_get_systemSaveUpdateCounter", "int", [], []);
  };

  this.VBA_reset_systemSaveUpdateCounter = function () {
    return gbaninja.ccall("VBA_reset_systemSaveUpdateCounter", "int", [], []);
  };

  this.VBA_emuWriteBattery = function () {
    return gbaninja.ccall("VBA_emuWriteBattery", "int", [], []);
  };

  this.VBA_agbPrintFlush = function () {
    return gbaninja.ccall("VBA_agbPrintFlush", "int", [], []);
  };

  // ------- VBA EXIT POINTS --------

  this.NYI = function (feature) {
    console.log("Feature is NYI: ", feature);
  };

  this.getAudioSampleRate = function () {
    return this.vbaSound.getSampleRate();
  };

  this.getRomSize = function (startPointer8) {
    return this.romBuffer8.byteLength;
  };

  this.copyRomToMemory = function (startPointer8) {
    var gbaHeap8 = gbaninja.HEAP8;
    var byteLength = this.romBuffer8.byteLength;
    for (var i = 0; i < byteLength; i++) {
      gbaHeap8[startPointer8 + i] = this.romBuffer8[i];
    }
  };

  this.renderFrame = function (pixPointer8) {
    this.vbaGraphics.drawGBAFrame(pixPointer8);
  };

  this.initSound = function () {
  };

  this.pauseSound = function () {
  };

  this.resetSound = function () {
    this.vbaSound.resetSound();
  };

  this.resumeSound = function () {
  };

  this.writeSound = function (pointer8, length16) {
    return this.vbaSound.writeSound(pointer8, length16);
  };

  this.setThrottleSound = function (pointer8, length16) {
  };

  this.getSaveSize = function () {
    return 0;
    // return vbaSaves.getSaveSize();
  };

  this.commitFlash = this.commitEeprom = function (pointer8, size) {
    return 0;
    // return vbaSaves.softCommit(pointer8, size);
  };

  this.restoreSaveMemory = function (pointer8, targetBufferSize) {
    return 0;
    // return vbaSaves.restoreSaveMemory(pointer8, targetBufferSize);
  };

  this.isKeyDown = function (key) {
    return this.emulatorManager.isKeyPressed(key);
  };

  this.getJoypad = function (joypadNum) {
    var res = 0;

    if (this.isKeyDown('A')) {
      res |= 1;
    }
    if (this.isKeyDown('B')) {
      res |= 2;
    }
    if (this.isKeyDown('SELECT')) {
      res |= 4;
    }
    if (this.isKeyDown('START')) {
      res |= 8;
    }
    if (this.isKeyDown('RIGHT')) {
      res |= 16;
    }
    if (this.isKeyDown('LEFT')) {
      res |= 32;
    }
    if (this.isKeyDown('UP')) {
      res |= 64;
    }
    if (this.isKeyDown('DOWN')) {
      res |= 128;
    }
    if (this.isKeyDown('R')) {
      res |= 256;
    }
    if (this.isKeyDown('L')) {
      res |= 512;
    }

    // disallow L+R or U+D from being pressed at the same time
    if ((res & 48) === 48) {
      res &= ~48;
    }
    if ((res & 192) === 192) {
      res &= ~192;
    }

    // return vbaInput.getJoypad(joypadNum);
    return res;
  };

  this.dbgOutput = function (textPointer8, unknownPointer8) {
    return console.log("dbgOutput", textPointer8, unknownPointer8);
  };

  // Do step
  function update()
  {
    const currentTime = window.performance.now();
    const deltaTime = currentTime - lastFrameTime;
    const clampedDeltaTime = Math.min(50, deltaTime);

    let cyclesToDo = Math.floor(GBA_CYCLES_PER_SECOND / (1000 / clampedDeltaTime));
    if (self.vbaSound.spareSamplesAtLastEvent > 1000) {
      cyclesToDo -= Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
    }
    if (self.vbaSound.spareSamplesAtLastEvent < 700) {
      cyclesToDo += Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
    }

    self.VBA_do_cycles(cyclesToDo);

    animationFrameRequest = window.requestAnimationFrame(update);
  }

  this.start = function () {
    if (!this.vbaGraphics.initScreen())
    {
      console.error('You need to enable WebGL!');
      return;
    }
    this.vbaGraphics.drawFrame();

    this.vbaSound = new VBASound(window.gbaninja);

    this.VBA_start();

    animationFrameRequest = window.requestAnimationFrame(update);
  }

  this.destroy = function () {
    window.cancelAnimationFrame(animationFrameRequest);
    window.VBAInterface = null;
  }
}

// window.doTimestep = function (/* frameNum, mustRender */) {

  // if (frameNum !== window.frameNum + 1) {
  //   return;
  // }
  // window.frameNum = frameNum;

  // var currentTime = window.performance.now();
  // var deltaTime = currentTime - window.lastFrameTime;
  // var clampedDeltaTime = Math.min(50, deltaTime);

  // if (currentTime - window.lastFocusTime > 100 || deltaTime < 0.1) {
  //   window.animationFrameRequest = window.requestAnimationFrame(function () {
  //     window.doTimestep(frameNum + 1);
  //   });
  // console.log(1);
  // return;
  // }
  // window.lastFrameTime = currentTime;

  // if (true /* isRunning */) {
  // vbaSaves.checkSaves();

  // var cyclesToDo = Math.floor(GBA_CYCLES_PER_SECOND / (1000 / clampedDeltaTime));
  // if (window.vbaSound.spareSamplesAtLastEvent > 1000) {
  //   cyclesToDo -= Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
  // }
  // if (window.vbaSound.spareSamplesAtLastEvent < 700) {
  //   cyclesToDo += Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
  // }
  // // if (!isPaused) {
  // VBAInterface.VBA_do_cycles(cyclesToDo);
  // console.log('dostep');
  // }

  // vbaPerf.deltaTimesThisSecond.push(deltaTime);
  // vbaPerf.cyclesThisSecond.push(cyclesToDo);

  // clearTimeout(window.frameTimeout);
  // window.frameTimeout = setTimeout(function () {
  //   window.doTimestep(frameNum + 1);
  // }, 1000 / TARGET_FRAMERATE);
  // cancelAnimationFrame(window.animationFrameRequest);
  // window.animationFrameRequest = window.requestAnimationFrame(window.doTimestep);

  // } else if (VBAInterface.VBA_get_emulating()) {
  //   VBAInterface.VBA_stop();
  //   document.querySelector(".pixels").style.display = "none";
  //   document.querySelector(".ui").style.display = "block";
  // }

  // console.log('loop');
// };

export default VBAInterface;


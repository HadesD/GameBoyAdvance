var VBAInterface = {};

window.VBAInterface = VBAInterface;

window.gbaninja = window.gbaninja || {};
const gbaninja = window.gbaninja;

VBAInterface.setRomBuffer = function(buffer) {
  this.romBuffer8 = buffer;
};

VBAInterface.VBA_get_emulating = function () {
  return gbaninja.ccall("VBA_get_emulating", "int", [], []);
};

VBAInterface.VBA_start = function () {
  return gbaninja.ccall("VBA_start", "int", [], []);
};

VBAInterface.VBA_do_cycles = function (cycles) {
  return gbaninja.ccall("VBA_do_cycles", "int", ["int"], [cycles]);
};

VBAInterface.VBA_stop = function () {
  return gbaninja.ccall("VBA_stop", "int", [], []);
};

VBAInterface.VBA_get_bios = function () {
  return gbaninja.ccall("VBA_get_bios", "int", [], []);
};

VBAInterface.VBA_get_rom = function () {
  return gbaninja.ccall("VBA_get_rom", "int", [], []);
};

VBAInterface.VBA_get_internalRAM = function () {
  return gbaninja.ccall("VBA_get_internalRAM", "int", [], []);
};

VBAInterface.VBA_get_workRAM = function () {
  return gbaninja.ccall("VBA_get_workRAM", "int", [], []);
};

VBAInterface.VBA_get_paletteRAM = function () {
  return gbaninja.ccall("VBA_get_paletteRAM", "int", [], []);
};

VBAInterface.VBA_get_vram = function () {
  return gbaninja.ccall("VBA_get_vram", "int", [], []);
};

VBAInterface.VBA_get_pix = function () {
  return gbaninja.ccall("VBA_get_pix", "int", [], []);
};

VBAInterface.VBA_get_oam = function () {
  return gbaninja.ccall("VBA_get_oam", "int", [], []);
};

VBAInterface.VBA_get_ioMem = function () {
  return gbaninja.ccall("VBA_get_ioMem", "int", [], []);
};

VBAInterface.VBA_get_systemColorMap16 = function () {
  return gbaninja.ccall("VBA_get_systemColorMap16", "int", [], []);
};

VBAInterface.VBA_get_systemColorMap32 = function () {
  return gbaninja.ccall("VBA_get_systemColorMap32", "int", [], []);
};

VBAInterface.VBA_get_systemFrameSkip = function () {
  return gbaninja.ccall("VBA_get_systemFrameSkip", "int", [], []);
};

VBAInterface.VBA_set_systemFrameSkip = function (n) {
  return gbaninja.ccall("VBA_set_systemFrameSkip", "int", ["int"], [n]);
};

VBAInterface.VBA_get_systemSaveUpdateCounter = function () {
  return gbaninja.ccall("VBA_get_systemSaveUpdateCounter", "int", [], []);
};

VBAInterface.VBA_reset_systemSaveUpdateCounter = function () {
  return gbaninja.ccall("VBA_reset_systemSaveUpdateCounter", "int", [], []);
};

VBAInterface.VBA_emuWriteBattery = function () {
  return gbaninja.ccall("VBA_emuWriteBattery", "int", [], []);
};

VBAInterface.VBA_agbPrintFlush = function () {
  return gbaninja.ccall("VBA_agbPrintFlush", "int", [], []);
};

// ------- VBA EXIT POINTS --------

VBAInterface.NYI = function (feature) {
  console.log("Feature is NYI: ", feature);
};

VBAInterface.getAudioSampleRate = function () {
  return window.vbaSound.getSampleRate();
};

VBAInterface.getRomSize = function (startPointer8) {
  return this.romBuffer8.byteLength;
};

VBAInterface.copyRomToMemory = function (startPointer8) {
  var gbaHeap8 = gbaninja.HEAP8;
  var byteLength = this.romBuffer8.byteLength;
  for (var i = 0; i < byteLength; i++) {
    gbaHeap8[startPointer8 + i] = this.romBuffer8[i];
  }
};

VBAInterface.renderFrame = function (pixPointer8) {
  window.vbaGraphics.drawGBAFrame(pixPointer8);
};

VBAInterface.initSound = function () {
};

VBAInterface.pauseSound = function () {
};

VBAInterface.resetSound = function () {
  window.vbaSound.resetSound();
};

VBAInterface.resumeSound = function () {
};

VBAInterface.writeSound = function (pointer8, length16) {
  return window.vbaSound.writeSound(pointer8, length16);
};

VBAInterface.setThrottleSound = function (pointer8, length16) {
};

VBAInterface.getSaveSize = function () {
  return 0;
  // return vbaSaves.getSaveSize();
};

VBAInterface.commitFlash = VBAInterface.commitEeprom = function (pointer8, size) {
  return 0;
  // return vbaSaves.softCommit(pointer8, size);
};

VBAInterface.restoreSaveMemory = function (pointer8, targetBufferSize) {
  return 0;
  // return vbaSaves.restoreSaveMemory(pointer8, targetBufferSize);
};

VBAInterface.getJoypad = function (joypadNum) {
  return 0;
  // return vbaInput.getJoypad(joypadNum);
};

VBAInterface.dbgOutput = function (textPointer8, unknownPointer8) {
  return console.log("dbgOutput", textPointer8, unknownPointer8);
};

// Do step
var GBA_CYCLES_PER_SECOND = 16777216;
var TARGET_FRAMERATE = 500;
window.lastFrameTime = window.performance.now();
window.frameTimeout = null;
window.animationFrameRequest = null;
window.frameNum = 1;
window.lastFocusTime = 0;

window.doTimestep = function (frameNum, mustRender) {

  if (frameNum !== window.frameNum + 1) {
    return;
  }
  window.frameNum = frameNum;

  var currentTime = window.performance.now();
  var deltaTime = currentTime - window.lastFrameTime;
  var clampedDeltaTime = Math.min(50, deltaTime);

  if (currentTime - window.lastFocusTime > 100 || deltaTime < 0.1) {
    window.animationFrameRequest = window.requestAnimationFrame(function () {
      window.doTimestep(frameNum + 1);
    });
    // console.log(1);
    // return;
  }
  window.lastFrameTime = currentTime;

  if (true /* isRunning */) {
    // vbaSaves.checkSaves();

    var cyclesToDo = Math.floor(GBA_CYCLES_PER_SECOND / (1000 / clampedDeltaTime));
    if (window.vbaSound.spareSamplesAtLastEvent > 1000) {
      cyclesToDo -= Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
    }
    if (window.vbaSound.spareSamplesAtLastEvent < 700) {
      cyclesToDo += Math.floor(Math.min(cyclesToDo * 0.03, GBA_CYCLES_PER_SECOND / 10000));
    }
    // if (!isPaused) {
      VBAInterface.VBA_do_cycles(cyclesToDo);
    // console.log('dostep');
    // }

    // vbaPerf.deltaTimesThisSecond.push(deltaTime);
    // vbaPerf.cyclesThisSecond.push(cyclesToDo);

    clearTimeout(window.frameTimeout);
    window.frameTimeout = setTimeout(function () {
      window.doTimestep(frameNum + 1);
    }, 1000 / TARGET_FRAMERATE);
    cancelAnimationFrame(window.animationFrameRequest);
    window.animationFrameRequest = window.requestAnimationFrame(function () {
      window.doTimestep(frameNum + 1);
    });

  } else if (VBAInterface.VBA_get_emulating()) {
    VBAInterface.VBA_stop();
    document.querySelector(".pixels").style.display = "none";
    document.querySelector(".ui").style.display = "block";
  }

  // console.log('loop');
};
export default VBAInterface;


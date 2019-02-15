import React from 'react';

import EmulatorManager from './EmulatorManager';

import emuCanvasBKG from '../../images/emu-canvas-bg.svg';

class Emulator extends React.Component
{
  constructor(props)
  {
    console.log('Emulator.constructor called');
    super(props);

    this.parent = props.parent;
    this.screenRef = React.createRef();

    this.emulatorManager = new EmulatorManager(this);

    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  componentDidMount()
  {
    this.emulatorManager.start();
  }

  componentWillUnMount()
  {
    this.emulatorManager.destroy();
    this.emulatorManager = null;
  }

  onDragOver(e)
  {
    e.preventDefault();

    console.log(e.dataTransfer.files[0]);
  }

  onDrop(e)
  {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file)
    {
      alert('File Object is empty');
      return;
    }

    this.emulatorManager.loadRomFile(file);
  }

  render()
  {
    return (
      <div
        className="emu-wrapper"
        style={{
          backgroundImage: 'url('+emuCanvasBKG+')',
        }}
      >
        <canvas ref={this.screenRef} onDrop={this.onDrop} onDragOver={this.onDragOver} />
      </div>
    );
  }
}

export default Emulator;


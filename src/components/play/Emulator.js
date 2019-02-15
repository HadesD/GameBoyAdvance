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
    this.inputFileRef = React.createRef();

    this.emulatorManager = new EmulatorManager(this);

    this.onClick = this.onClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.inputFileOnChange = this.inputFileOnChange.bind(this);
  }

  componentDidMount()
  {
    this.emulatorManager.start();
  }

  componentWillUnMount()
  {
    this.emulatorManager.destroy();
  }

  onDragOver(e)
  {
    e.preventDefault();
  }

  onDrop(e)
  {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file)
    {
      return;
    }

    this.emulatorManager.loadRomFile(file);
  }

  onClick(e)
  {
    e.preventDefault();
    this.inputFileRef.current.click();
  }

  inputFileOnChange(e)
  {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file)
    {
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
        <canvas
          ref={this.screenRef}
          onClick={this.onClick}
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
        />
        <input
          ref={this.inputFileRef}
          type="file"
          accept=".gb,.gba,.gbc,.zip"
          style={{
            display: 'none',
          }}
          onChange={this.inputFileOnChange}
        />
      </div>
    );
  }
}

export default Emulator;


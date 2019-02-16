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

  componentWillUnmount()
  {
    console.log('Emulator.componentWillUnmount');

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
    this.refs.inputFile.click();
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
        <script id="2d-vertex-shader" type="x-shader/x-vertex">
          {`
            attribute vec2 a_position;
            varying highp vec2 v_textureCoord;

            void main() {
              /**
               * This scales the quad so that the screen texture fits the viewport.
               * The texture is 256 * 256, but only 240 * 160 is used. The quad is 2*2, centered on (0,0)
               */
              gl_Position = vec4((a_position.x * 2.0 * 1.0666) - 1.0, (a_position.y * 2.0 * 1.6) * -1.0 + 1.0, 0, 1);
              v_textureCoord = vec2(a_position.x, a_position.y);
            }
            `}
        </script>
        <script id="2d-fragment-shader" type="x-shader/x-fragment">
          {`
          varying highp vec2 v_textureCoord;

          uniform sampler2D u_sampler;

          void main(void) {
            gl_FragColor = texture2D(u_sampler, vec2(v_textureCoord.s, v_textureCoord.t));
          }
            `}
        </script>
        <div
          ref="screen"
          className="screen"
          onClick={this.onClick}
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
        />
        <input
          ref="inputFile"
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


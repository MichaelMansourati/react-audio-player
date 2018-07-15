import React from 'react'
import {
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdVolumeOff,
  MdVolumeUp,
} from 'react-icons/lib/md'

import './index.css'
import song from "./MoonlightInVermont.mp3"

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: false,
      lastVolume: this.volume5,
      isMute: false,
    }
  }

  componentDidMount() {
    this.audio.addEventListener('timeupdate', () => {
      let ratio = this.audio.currentTime / this.audio.duration
      let position =
        this.timeline.offsetWidth * ratio + this.timeline.offsetLeft
      this.positionHandle(position)
    })
  }

  positionHandle = position => {
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth
    let handleLeft = position - this.timeline.offsetLeft
    if (handleLeft >= 0 && handleLeft <= timelineWidth) {
      this.handle.style.marginLeft = handleLeft + 'px'
      this.played.style.width = handleLeft + 'px'
    }
    if (handleLeft < 0) {
      this.handle.style.marginLeft = '0px'
      this.played.style.width = '0px'
    }
    if (handleLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + 'px'
      this.played.style.width = timelineWidth + 'px'
    }
  }

  mouseMove = e => {
    this.positionHandle(e.pageX)
    this.audio.currentTime =
      (e.pageX - this.timeline.offsetLeft) /
      this.timeline.offsetWidth *
      this.audio.duration
  }

  mouseUp = e => {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }

  mouseDown = e => {
    window.addEventListener('mousemove', this.mouseMove)
    window.addEventListener('mouseup', this.mouseUp)
  }

  play = () => {
    if (this.state.play) {
      this.setState({ play: false })
      this.audio.pause()
    } else {
      this.setState({ play: true })
      this.audio.play()
    }
  }

  mute = () => {
    if (!this.state.isMute) {
      this.audio.volume = 0
      this.setState({ isMute: true })
      this.volBlock1.style.background = '#a4a4a4'
      this.volBlock2.style.background = '#a4a4a4'
      this.volBlock3.style.background = '#a4a4a4'
      this.volBlock4.style.background = '#a4a4a4'
      this.volBlock5.style.background = '#a4a4a4'
    } else {
      this.setState({ isMute: false })
      this.state.lastVolume()
    }
  }

  volume1 = () => {
    this.audio.volume = 0.2
    this.setState({
      lastVolume: this.volume1,
      isMute: false,
    })
    this.volBlock1.style.background = '#000000'
    this.volBlock2.style.background = '#a4a4a4'
    this.volBlock3.style.background = '#a4a4a4'
    this.volBlock4.style.background = '#a4a4a4'
    this.volBlock5.style.background = '#a4a4a4'
  }

  volume2 = () => {
    this.audio.volume = 0.4
    this.setState({
      lastVolume: this.volume2,
      isMute: false,
    })
    this.volBlock1.style.background = '#000000'
    this.volBlock2.style.background = '#000000'
    this.volBlock3.style.background = '#a4a4a4'
    this.volBlock4.style.background = '#a4a4a4'
    this.volBlock5.style.background = '#a4a4a4'
  }

  volume3 = () => {
    this.audio.volume = 0.6
    this.setState({
      lastVolume: this.volume3,
      isMute: false,
    })
    this.volBlock1.style.background = '#000000'
    this.volBlock2.style.background = '#000000'
    this.volBlock3.style.background = '#000000'
    this.volBlock4.style.background = '#a4a4a4'
    this.volBlock5.style.background = '#a4a4a4'
  }

  volume4 = () => {
    this.audio.volume = 0.8
    this.setState({
      lastVolume: this.volume4,
      isMute: false,
    })
    this.volBlock1.style.background = '#000000'
    this.volBlock2.style.background = '#000000'
    this.volBlock3.style.background = '#000000'
    this.volBlock4.style.background = '#000000'
    this.volBlock5.style.background = '#a4a4a4'
  }

  volume5 = () => {
    this.audio.volume = 1
    this.setState({
      lastVolume: this.volume5,
      isMute: false,
    })
    this.volBlock1.style.background = '#000000'
    this.volBlock2.style.background = '#000000'
    this.volBlock3.style.background = '#000000'
    this.volBlock4.style.background = '#000000'
    this.volBlock5.style.background = '#000000'
  }

  render() {
    let playButton = null
    if (!this.state.play) {
      playButton = (
        <MdPlayCircleOutline className="pButton" onClick={this.play} />
      )
    } else {
      playButton = (
        <MdPauseCircleOutline className="pButton" onClick={this.play} />
      )
    }

    let muteToggle = null
    if (!this.state.isMute) {
      muteToggle = <MdVolumeUp className="volumeToggle" onClick={this.mute} />
    } else {
      muteToggle = <MdVolumeOff className="volumeToggle" onClick={this.mute} />
    }

    return (
      <div id="audioplayer">
        <audio
          id="music"
          ref={audio => {
            this.audio = audio
          }}
          controls
        >
          <source src={song} />
        </audio>
        {playButton}
        <div
          id="timeline"
          onClick={this.mouseMove}
          ref={timeline => {
            this.timeline = timeline
          }}
        >
          <div
            id="played"
            ref={played => {
              this.played = played
            }}
          />
          <div
            id="handle"
            onMouseDown={this.mouseDown}
            ref={handle => {
              this.handle = handle
            }}
          />
        </div>
        <div className="volume-container">
          {muteToggle}
          <div className="volume-item" onClick={this.volume1}>
            <div
              className="volume-block"
              ref={volBlock1 => {
                this.volBlock1 = volBlock1
              }}
            />
          </div>
          <div className="volume-item" onClick={this.volume2}>
            <div
              className="volume-block"
              ref={volBlock2 => {
                this.volBlock2 = volBlock2
              }}
            />
          </div>
          <div className="volume-item" onClick={this.volume3}>
            <div
              className="volume-block"
              ref={volBlock3 => {
                this.volBlock3 = volBlock3
              }}
            />
          </div>
          <div className="volume-item" onClick={this.volume4}>
            <div
              className="volume-block"
              ref={volBlock4 => {
                this.volBlock4 = volBlock4
              }}
            />
          </div>
          <div className="volume-item" onClick={this.volume5}>
            <div
              className="volume-block"
              ref={volBlock5 => {
                this.volBlock5 = volBlock5
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

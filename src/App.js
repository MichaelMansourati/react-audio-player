import React from "react";
import {
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdVolumeOff,
  MdVolumeUp
} from "react-icons/lib/md";

import "./index.css";
import track from "./MoonlightInVermont.mp3";

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      volume: 5,
      isMute: false,
      lastVolume: 5
    };
  }

  componentDidMount() {
    this.audio.addEventListener("timeupdate", () => {
      let ratio = this.audio.currentTime / this.audio.duration;
      let position =
        this.timeline.offsetWidth * ratio + this.timeline.offsetLeft;
      this.positionHandle(position);
    });
  }

  positionHandle = position => {
    let timelineWidth = this.timeline.offsetWidth - this.handle.offsetWidth;
    let handleLeft = position - this.timeline.offsetLeft;
    if (handleLeft >= 0 && handleLeft <= timelineWidth) {
      this.handle.style.marginLeft = handleLeft + "px";
      this.played.style.width = handleLeft + "px";
    }
    if (handleLeft < 0) {
      this.handle.style.marginLeft = "0px";
      this.played.style.width = "0px";
    }
    if (handleLeft > timelineWidth) {
      this.handle.style.marginLeft = timelineWidth + "px";
      this.played.style.width = timelineWidth + "px";
    }
  };

  mouseMove = e => {
    this.positionHandle(e.pageX);
    this.audio.currentTime =
      ((e.pageX - this.timeline.offsetLeft) / this.timeline.offsetWidth) *
      this.audio.duration;
  };

  mouseUp = e => {
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
  };

  mouseDown = e => {
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
  };

  play = () => {
    if (this.state.play) {
      this.setState({ play: false });
      this.audio.pause();
    } else {
      this.setState({ play: true });
      this.audio.play();
    }
  };

  mute = () => {
    if (!this.state.isMute) {
      this.audio.volume = 0;
      this.setState({
        isMute: true,
        volume: 0,
        lastVolume: this.state.volume
      });
    } else {
      this.audio.volume = this.state.lastVolume / 5
      this.setState({
        isMute: false,
        volume: this.state.lastVolume
      });
    }
  };

  volumeChange = (e, volId) => {
    this.audio.volume = volId / 5;
    this.setState({
      lastVolume: this.volId,
      isMute: false,
      volume: volId
    });

  };

  render() {
    let playButton = null;
    if (!this.state.play) {
      playButton = (
        <MdPlayCircleOutline className="pButton" onClick={this.play} />
      );
    } else {
      playButton = (
        <MdPauseCircleOutline className="pButton" onClick={this.play} />
      );
    }

    let muteToggle = null;
    if (!this.state.isMute) {
      muteToggle = <MdVolumeUp className="volumeToggle" onClick={this.mute} />;
    } else {
      muteToggle = <MdVolumeOff className="volumeToggle" onClick={this.mute} />;
    }

    const volumeArr = [1, 2, 3, 4, 5];
    const volume = volumeArr.map(volNum => (
      this.state.volume >= volNum ?
        <div
        key={volNum}
        className="volume-item"
        onClick={e => this.volumeChange(e, volNum)}
        >
          <div className="vol-block vol-block-active" />
        </div>
        :
        <div
          key={volNum}
          className="volume-item"
          onClick={e => this.volumeChange(e, volNum)}
        >
          <div className="vol-block" />
        </div>
    ));

    return (
      <div id="audioplayer">
        <audio
          id="music"
          ref={audio => {
            this.audio = audio;
          }}
          controls
        >
          <source src={track} />
        </audio>
        {playButton}
        <div
          id="timeline"
          onClick={this.mouseMove}
          ref={timeline => {
            this.timeline = timeline;
          }}
        >
          <div
            id="played"
            ref={played => {
              this.played = played;
            }}
          />
          <div
            id="handle"
            onMouseDown={this.mouseDown}
            ref={handle => {
              this.handle = handle;
            }}
          />
        </div>
        <div className="volume-container">
          {muteToggle}
          {volume}
        </div>
      </div>
    );
  }
}
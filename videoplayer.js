class VideoPlayer {
  constructor(divId, width, height) {
    this.divId = divId;
    this.width = width;
    this.height = height;
  }

  //loads the given video URL to the video player
  //this will overwrite any content within the div given to VideoPlayer
  //the 'controls' attribute can be removed to prove full functionality of the API by itself
  load(url) {
    if (url != "") {
      document.getElementById(`${this.divId}`).innerHTML =
      `<video id=${this.divId}_video width=${this.width} height=${this.height} controls="true" style="border-style: solid; background-color: black;">
        <source src=${url} type="video/mp4"/>
        <source src=${url} type="video/webm"/>
        It seems that the HTML video tag is not supported by this browser.
      </video>
      <p id="visiblePct" hidden></p>`;
    }
  }

  //start playback
  play() {
    document.getElementById(`${this.divId}_video`).play();
  }

  //pause playback
  Pause() {
    document.getElementById(`${this.divId}_video`).pause();
  }

  //resize player to given width and height in pixels
  resize(width, height) {
    document.getElementById(`${this.divId}_video`).width = width;
    document.getElementById(`${this.divId}_video`).height = height;
  }

  //returns player's height in pixels
  getHeight() {
    return document.getElementById(`${this.divId}_video`).height;
  }

  //returns player's width in pixels
  getWidth() {
    return document.getElementById(`${this.divId}_video`).width;
  }

  //autoplay argument is a boolean indicating whether or not the player should autostart
  setAutoplay(autoplay) {
    document.getElementById(`${this.divId}_video`).autoplay = autoplay;
  }

  //volume argument is an integer from 0 to 100 representing percentage of audible volume
  //because the argument is converted into an integer, this will rounded to nearest 1
  setVolume(volume) {
    document.getElementById(`${this.divId}_video`).volume = Math.round(volume) / 100;
  }

  //returns current volume as an integer from 0 to 100
  //because the return value is converted into an integer, it will be rounded to the nearest 1
  getVolume() {
    return Math.round(document.getElementById(`${this.divId}_video`).volume * 100);
  }

  //mute argument is a boolean indicating whether or not the player should be muted
  setMute(mute) {
    document.getElementById(`${this.divId}_video`).muted = mute;
  }

  //returns a boolean indicating whether or not the player is muted
  getMute() {
    return document.getElementById(`${this.divId}_video`).muted;
  }

  //returns an integer indicating the duration of media rounded to the nearest second
  getDuration() {
    return Math.round(document.getElementById(`${this.divId}_video`).duration);
  }

  /*fullscreen argument is a boolean indicating whether or not the player should
    be in fullscreen*/
  setFullscreen(fullscreen) {
    let videoElem = document.getElementById(`${this.divId}_video`);
    if (fullscreen) {
      if (videoElem.requestFullscreen) {
        videoElem.requestFullscreen();
      }
      else if (videoElem.webkitRequestFullscreen) { //Safari compatibility
        videoElem.webkitRequestFullscreen();
      }
    }
    else {
      if (videoElem.exitFullscreen) {
        videoElem.exitFullscreen();
      }
      else if (videoElem.webkitExitFullscreen) { //Safari compatibility
        videoElem.webkitExitFullscreen();
      }
    }
  }

  //returns a string indicating the player's current playback state
  getPlaybackState() {
    if (document.getElementById(`${this.divId}_video`).ended) {
      return "ended";
    }
    if (document.getElementById(`${this.divId}_video`).paused) {
      return "paused";
    }
    return "playing";
  }

  /*returns an integer between 0 and 100 indicating the percentage of the player
    that is viewable on the page*/
  getViewability() {
    const config = {
      root: null,
      rootMargin: "0px",
      threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    },
    target = document.getElementById(`${this.divId}_video`),
    observer = new IntersectionObserver((entries) => entries
      .forEach(({target: {}, intersectionRatio}) => {
        document.getElementById("visiblePct").innerHTML = Math.round(intersectionRatio * 100);
      }), config);

    observer.observe(target);
    return document.getElementById("visiblePct").innerHTML;
  }
}
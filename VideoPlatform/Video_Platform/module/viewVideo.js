import { get, getAll } from "../utils/dom.js";

const $list = getAll(".contents.list figure");

const $player = get(".view video");
const $btnPlay = get(".play");
const $btnReplay = get(".replay");
const $btnMute = get(".mute");
const $progress = get(".progress");
const $volume = get(".volume");
const $fullScreen = get(".fullScreen");

export const viewVideo = () => {
  for (let i = 0; i < $list.length; i++) {
    $list[i].addEventListener("click", hashchange);
  }

  window.addEventListener("hashchange", () => {
    const isView = -1 < window.location.hash.indexOf("view");
    if (isView) {
      getViewPage();
    } else {
      getListPage();
    }
  });

  viewPageEvent();
};

const hashchange = (e) => {
  e.preventDefault();
  const parentNode = e.target.closest("figure");
  const viewTitle = parentNode.querySelector("strong").textContent;
  window.location.hash = `view&${viewTitle}`;
};

const getViewPage = () => {
  const viewTitle = get(".view strong");
  const urlTitle = decodeURI(window.location.hash.split("&")[1]);

  viewTitle.innerText = urlTitle;

  get(".list").style.display = "none";
  get(".view").style.display = "flex";
};

const getListPage = () => {
  get(".view").style.display = "none";
  get(".list").style.display = "flex";
};

const buttonChange = (btn, value) => {
  btn.innerHTML = value;
};

const viewPageEvent = () => {
  $volume.addEventListener("change", (e) => {
    $player.volume = e.target.value;
  });
  $player.addEventListener("timeupdate", setProgress);
  $player.addEventListener("play", buttonChange($btnPlay, "❚❚"));
  $player.addEventListener("pause", buttonChange($btnPlay, "►"));
  $player.addEventListener("volumechange", () => {
    $player.muted ? buttonChange($btnMute, "unmute") : buttonChange($btnMute, "mute");
  });
  $player.addEventListener("ended", $player.pause());
  $progress.addEventListener("click", getCurrent);

  $btnPlay.addEventListener("click", playVideo);
  $btnReplay.addEventListener("click", replayVideo);
  $btnMute.addEventListener("click", mute);
  $fullScreen.addEventListener("click", fullScreen);
};

const getCurrent = (e) => {
  let percent = e.offsetX / $progress.offsetWidth;
  $player.currentTime = percent * $player.duration;
  e.target.value = Math.floor(percent / 100);
};

const setProgress = () => {
  let percentage = Math.floor((100 / $player.duration) * $player.currentTime);
  $progress.value = percentage;
};

const playVideo = () => {
  if ($player.paused || $player.ended) {
    buttonChange($btnPlay, "❚❚");
    $player.play();
  } else {
    buttonChange($btnPlay, "►");
    $player.pause();
  }
};

const resetPlayer = () => {
  $progress.value = 0;
  $player.currentTime = 0;
  buttonChange($btnPlay, "►");
};

const replayVideo = () => {
  resetPlayer();
  $player.play();
  buttonChange($btnPlay, "❚❚");
};

const mute = () => {
  if ($player.muted) {
    buttonChange($btnMute, "mute");
    $player.muted = false;
  } else {
    buttonChange($btnMute, "unmute");
    $player.muted = true;
  }
};

const fullScreen = () => {
  if ($player.requestFullscreen)
    if (document.fullScreenElement) {
      document.cancelFullScreen();
    } else {
      $player.requestFullscreen();
    }
  else if ($player.msRequestFullscreen)
    if (document.msFullscreenElement) {
      document.msExitFullscreen();
    } else {
      $player.msRequestFullscreen();
    }
  else if ($player.mozRequestFullScreen)
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else {
      $player.mozRequestFullScreen();
    }
  else if ($player.webkitRequestFullscreen)
    if (document.webkitFullscreenElement) {
      document.webkitCancelFullScreen();
    } else {
      $player.webkitRequestFullscreen();
    }
  else {
    alert("Not Supported");
  }
};

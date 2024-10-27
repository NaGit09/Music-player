const audio = document.getElementsByClassName("audio");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const play = document.getElementById("play");
const endTime = document.getElementsByClassName("end_time");
const runTime = document.getElementsByClassName("run_time");
const listCards = document.getElementsByClassName("card_element");

let isPlay = true;
let index = 0;

listCards[index].style.display = "block";
// set status for runTime , endTime

for (let i = 0; i < audio.length; i++) {
  runTime[i].innerText = formatTime(audio[i].currentTime);
  endTime[i].innerText = "0:00";
  audio[i].addEventListener("timeupdate", updateProgress);
}
function NextCard() {
  audio[index].pause();
  listCards[index++].style.display = "none";
  listCards[index].style.display = "block";
}
function PreviousCard() {
  audio[index].pause();
  listCards[index--].style.display = "none";
  listCards[index].style.display = "block";
}
function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}
function updateProgress() {
  const percent = (audio[index].currentTime / audio[index].duration) * 100;
  if (!isNaN(audio[index].duration)) {
    runTime[index].innerText = formatTime(audio[index].currentTime);
    endTime[index].innerText = formatTime(audio[index].duration);
  }
  progressBar.style.width = `${percent}%`;
}
function playMusic() {
  isPlay ? audio[index].play() : audio[index].pause();
  isPlay = !isPlay;
}
// Tua khi click vào thanh tiến trình
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio[index].duration;
  audio[index].currentTime = (clickX / width) * duration;
});

function stopSongs() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound)

    song.pause()
    song.currentTime = 0
  })
}

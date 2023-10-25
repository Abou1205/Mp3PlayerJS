const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')

const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')

const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')




//order
let index

//loop
let loop = true


// json song list
const songsList = [
    {
        name: "Martılar",
        link: "assets/mp3indirdur-Edis-Martilar.mp3",
        artist: "Edis",
        image: "assets/Martılar.jpg"
    },
    {
        name: "Aşk Kaç Beden Giyer",
        link: "assets/mp3indirdur-Hadise-Ask-Kac-Beden-Giyer.mp3",
        artist: "Hadise",
        image: "assets/Ask-Beden.jpg"
    },
    {
        name: "Kumralım",
        link: "assets/mp3indirdur-Yasar-Kumralim.mp3",
        artist: "Yaşar",
        image: "assets/kumralım.jpeg"
    },
    {
        name: "22",
        link: "assets/mp3indirdur-Taylor-Swift-22.mp3",
        artist: "Taylor Swift",
        image: "assets/22.jpg"
    },
    {
        name: "Karabiberim",
        link: "assets/mp3indirdur-Serdar-Ortac-Karabiberim.mp3",
        artist: "Serdar Ortaç",
        image: "assets/karabiber.jpg"
    }
]

//time formatter
const timeFormatter = (timeInput) =>{
    let minute = Math.floor(timeInput / 60)
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}


// song define
const setSong = (arrayIndex) => {
    let {name,link,artist,image} = songsList[arrayIndex]

    // audio
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image 

    audio.onloadeddata = () => {
        //max duration
        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playAudio();
    playListContainer.classList.add("hide")
}

const playAudio = () => {
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

const nextSong = () => {
    if(loop){
        if(index == (songsList.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
        playAudio()
    } else {
        let random = Math.floor(Math.random() * songsList.length)
        console.log(random);
        setSong(random)
        playAudio()
    }
}

const prevSong = () => {
    if(index > 0){
        pauseAudio()
        index -= 1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}

audio.onended = () =>{
    nextSong()
}

progressBar.addEventListener("click", (event) => {
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"

    audio.currentTime = progress * audio.duration

    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})



// time update
audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})


// shuffle button
shuffleButton.addEventListener("click", () => {
    if(shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})

// repeat button
repeatButton.addEventListener("click", () => {
    if(repeatButton.classList.contains("active")){
        repeatButton.classList.remove("active")
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})

// play button
playButton.addEventListener("click", playAudio)

// pause button
pauseButton.addEventListener("click", pauseAudio)

// next button
nextButton.addEventListener("click", nextSong)

// prev button
prevButton.addEventListener("click", prevSong)


const initializePlayList = () =>{
    for (const i in songsList) {
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`
    }
}

playListButton.addEventListener("click", () =>{
    playListContainer.classList.remove("hide")
})

closeButton.addEventListener("click", () =>{
    playListContainer.classList.add("hide")
})

window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlayList()
}

// progess bar advance
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime) 
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3))*100 + "%"
}, 1000);
const searchSongs = document.getElementById('search-item');
const submitBtn = document.getElementById('submit');
const songName = document.getElementById('song');
const songLyrics = document.getElementById('lyrics')

//Song Search JS
submitBtn.addEventListener('click', function () {
    const searchTerm = searchSongs.value.trim();
    fetch(`https://api.lyrics.ovh/suggest/${searchTerm}`)
    .then(res => res.json())
    .then(data => { 
        let output = '';
        data.data.forEach(song => {
            output += `      
            <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name} </span></p>
               </div>
                <div class="col-md-3 text-md-right text-center">
                    <button class="btn btn-success data-songtitle="${song.title}" data-artist="${song.artist.name}">Get Lyrics</button>
                </div>
           </div> 
            `;
        });
    
        songName.innerHTML =`
        <ul>
            ${output}
        </ul>
        `;
    })
})


//Song lyrics JS
function getLyrics(artist, songTitle) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        songLyrics.innerHTML ='';
        const lyrics = data.lyrics;
        songLyrics.innerHTML = `
        <div class="single-lyrics text-center">
        <button class="btn go-back">${songTitle}</button>
        <h2 class="text-success mb-4">${artist}</h2>
        <pre class="lyric text-white">
         ${lyrics}
        </pre>
        </div>
        `
        
    })
}

songName.addEventListener('click', e => { 
    const clickedElement = e.target;
    if(clickedElement.tagName === 'BUTTON'){
        const artist =  clickedElement.getAttribute('data-artist');
        const songTitle =  clickedElement.getAttribute('data-songtitle');
        getLyrics(artist , songTitle);
    }
})
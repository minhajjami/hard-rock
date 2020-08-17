const apiLink = 'https://api.lyrics.ovh/suggest/';
const searchBtn = document.getElementById("btn-search");
const searchValue = document.getElementById("txt-search");
const songList = document.getElementById('song-list');
const simpleList = document.getElementById('simple-list');
const displayLyric=document.getElementById('display-lyric');
const lyricApiLink = 'https://api.lyrics.ovh/v1/';


searchBtn.addEventListener('click',()=>{
    songList.innerHTML="";
    displayLyric.innerHTML="";
    getSearchResult();
})

const getSearchResult=()=>{
    fetch(`${apiLink}${searchValue.value}`)
        .then(res => res.json())
        .then(data => {
            viewResult(data.data);
        })
}

const viewResult=(allItems)=>{

    for(let i=0;i<allItems.length;i++){
        if(i>9)
            break;
        else
        {
            createSongList(allItems[i].title, allItems[i].album.title, allItems[i].artist.name, allItems[i].artist.picture);
        }
    }
}

const createSongList=(title,album,artist,profilePic)=>{
    songList.innerHTML +=`<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-6">
                                <h3 class="lyrics-name">${title}</h3>
                                <p class="author lead">Album by <span>${album}</span></p>
                                <p class="author lead">Artist <span>${artist}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                 <img src="${profilePic}" height="100" >  
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                 <button onclick="getLyrics('${artist}','${title}')" class="btn btn-success">Get Lyrics</button>
                            </div>
                        </div>`
}

const getLyrics=(artist,title)=>{
    fetch(`${lyricApiLink}/${artist}/${title}`)
    .then(res=>res.json())
    .then(data=>displayLyrics(artist,title,data.lyrics));
}

const displayLyrics=(artist,title,lyrics="Lyric are not available")=>{
    
    displayLyric.innerHTML = `<button class="btn go-back">&lsaquo;</button>
                                <h2 class="text-success mb-4">${title} - ${artist} Na Na</h2>
                                <pre class="lyric text-white">${lyrics}
                                </pre> `
}




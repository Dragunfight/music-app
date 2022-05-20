import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
    const CLIENT_ID = "2870d1842e404ca181856bf48e3b29b0"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchArtists = async (e) => {
        e.preventDefault()
        axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                q: searchKey,
                type: "artist"
            }            
        })
        .then((response) => {
            console.log(response.data.artists.items[0].id);
            setArtists(response.data.artists.items[0].id);
        })
    }

    const searchAlbums = async () => {
        
        axios.get(`https://api.spotify.com/v1/artists/${artists}/albums`, {
            headers: {
                Authorization: "Bearer " + token,
            },         
        })
        .then((response) => {
            console.log(response.data.items);
            setAlbums(response.data.items);     
        })  
    }

    useEffect(() => {
        if(artists.length > 0){
            searchAlbums();
        }
    },[artists])
    
    useEffect(() => {
       const renderImg = document.querySelector("#img");
        if(renderImg !== null) {
            renderImg.innerHTML = "";
        }

       albums.map((album) => {
           const a = document.createElement("a");
           const img = document.createElement("img");
           a.setAttribute("href", "");
           img.setAttribute("src", album.images[0].url);
           renderImg.appendChild(a);
           a.appendChild(img);
       })
    },[albums])


    return (
        <div className="App">
            <header className="App-header">
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

                {token ?
                    <div>
                        <form onSubmit={searchArtists}>
                            <input type="search" onChange={e => setSearchKey(e.target.value)}/>
                        </form>
                        <div id="img">              
                                {albums.map((album) => {
                                    <a href="">
                                        <img src={album.images[0].url}  alt="" />
                                    </a>
                                })}                                                              
                        </div>
                    </div>
                    : <h2>login</h2>
                }
            </header>
        </div>
    );
}

export default App;

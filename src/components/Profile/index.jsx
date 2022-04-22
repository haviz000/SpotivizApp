import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsersTop5Artists,
  getUsersTop5Tracks,
  getRecentlyPlayed,
} from "../../utils/getApi";
import SingleCard from "../SingleCard";
import DoubleCard from "../DoubleCard";
import TrackItem from "../TrackItem";

const Profile = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getUserData = async () => {
      const topArtists = await getUsersTop5Artists(accessToken);
      const topTracks = await getUsersTop5Tracks(accessToken);
      const recentlyPlayed = await getRecentlyPlayed(accessToken);
      setTopArtists(topArtists);
      setTopTracks(topTracks);
      setRecentlyPlayed(recentlyPlayed);

    };

    getUserData();
  }, [accessToken]);

  const convertMS = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const Logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiredDate");
    localStorage.removeItem("user");
    navigate("/");
  };


  return (
    <div className="App" data-testid="profile-page">
      <div className="z-50 fixed bottom-0 border-t-2 border-card lg:left-0 w-full lg:w-48 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
        <div className="lg:mt-16 lg:space-y-4 flex lg:flex-col justify-between h-auto" data-testid="sidebar">
          <Link
            className="lg:rounded-r-full text-spotify lg:bg-spotify lg:text-white flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

            to="/profile"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
                viewBox="0 0 24 24"
                width="19"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
              </svg>
            </span>
            <span className="hidden sm:block">Profile</span>
          </Link>
          <Link
            className="lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

            to="/my-playlist"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
                viewBox="0 0 24 24"
                width="19"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20.083 15.2l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zm0-4.7l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm-7.569-9.191l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0zM12 3.332L5.887 7 12 10.668 18.113 7 12 3.332z" />
              </svg>
            </span>
            <span className="hidden sm:block">My Playlist</span>
          </Link>
          <Link
            className="lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

            to="/create-playlist"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
                viewBox="0 0 24 24"
                width="19"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M20 3v14a4 4 0 1 1-2-3.465V5H9v12a4 4 0 1 1-2-3.465V3h13zM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </span>
            <span className="hidden sm:block">Create Playlist</span>
          </Link>
        </div>
      </div>
      <div className="px-8 lg:ml-48 lg:px-20 lg:py-6 bg-black text-gray-100 min-h-screen overflow-hidden">
        <div className="flex flex-col">
          <div className="flex justify-beetwen md:justify-end pt-8 order-last md:order-first mb-20 md:mb-0">
            <div className="flex items-center">
              <div className="flex items-center mr-4 text-gray-600 hover:text-gray-400 cursor-pointer">
                <img
                  className=" inline object-cover w-12 h-12 mr-2 rounded-full"
                  src={user.images[0].url}
                  alt={user.display_name}
                />
              </div>
              <button
                onClick={Logout}
                className="text-gray-600 hover:text-gray-400"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                    viewBox="0 0 24 24"
                    width="13"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 1 0 0-12H4A9.985 9.985 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 0 1-8-4z" />
                  </svg>
                  <h2 className="ml-2 text-sm">Logout</h2>
                </div>
              </button>
            </div>
          </div>

          <main className="py-8 md:pb-12">
            {/* Profile */}
            <div className="py-10">
              <h1 className="text-center lg:-ml-60 text-3xl sm:text-4xl lg:text-4xl">
                <span className="text-gray-500">Welcome </span>
                <span className="bg-login text-transparent bg-clip-text">
                  {user.display_name}.
                </span>
              </h1>
            </div>
            {/* Artitst */}
            
              <div className="mt-10 md:mt-24">
              <h2 className="text-2xl heading text-center sm:text-left ">
                Artists you love the most
              </h2>
              {
                topArtists.length >0 ?
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-2">
              {topArtists.map((artist) => {
                  return (
                    <a
                      href={artist.external_urls.spotify}
                      rel="noreferrer"
                      target="_blank"
                      key={artist.id}
                    >
                      <SingleCard
                        imageURL={artist.images[0].url}
                        itemName={artist.name}
                        key={artist.name}
                      />
                    </a>
                  );
                })}
                <a
                  href="https://open.spotify.com/collection/artists"
                  rel="noreferrer"
                  target="_blank"
                  className="bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:text-gray-200 rounded"
                >
                  <h2>See More</h2>
                </a>
                
              </div>
              :
              <div className="loader"></div>
              }
              
              
            </div>
            {/* Tracks */}
              <div className="mt-10 md:mt-20">
              <h2 className="text-2xl heading text-center sm:text-left ">
                Your most favourite tracks of all time
              </h2>
              {
                topTracks.length > 0 ?
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-x-8  gap-y-2">
                {topTracks.map(track =>
                  <a href={track.external_urls.spotify}
                    rel="noreferrer"
                    target="_blank" key={track.id}>
                    <DoubleCard imageURL={track.album.images[1].url} itemName={track.name} subItem={track.artists} key={track.name} />
                  </a>
                )}
                <a
                  href="https://open.spotify.com/collection/tracks"
                  rel="noreferrer"
                  target="_blank"
                  className="bg-gradient-to-b from-gray-900 to-black mr-3 md:mr-6 mt-4 w-36 md:w-40 h-44 flex justify-center items-center text-gray-500 hover:text-gray-200 rounded"
                >
                  <h2>See More</h2>
                </a>
              </div>
              :
              <div className="loader"></div>
              }
              
            </div>
            {/* Recently Played */}
              <div className='mt-10 md:mt-20 w-centerull sm:justify-start'>
              <h2 className='text-2xl heading text-center sm:text-left '>Recently played tracks</h2>
              <div className='mt-1 w-full'>
                <div className="table flex justify-between w-full">

                  <div className="w-4/4 lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
                    <div className='w-12/12 lg:w-7/12 text-left'>TRACK</div>
                    <div className='w-4/12 hidden lg:block text-left'>ALBUM</div>
                    <div className='w-1/12 hidden lg:block text-left'>DURATION</div>
                  </div>
                  {
                    recentlyPlayed.length > 0 ?
                    <span className="inline-block w-full">
                    {recentlyPlayed.map(song =>
                      <div className="lg:flex text-gray-400 justify-between w-full object-contain" key={song.played_at}>
                        <div className="w-8/12 lg:w-7/12 truncate">
                          <Link to={`/track/${song.track.id}`}>
                            <TrackItem songName={song.track.name} songArtists={song.track.artists} songAlbum={song.track.album.name} picURL={song.track.album.images[1].url} />
                          </Link>
                        </div>
                        <div className='w-4/12 hidden lg:block pr-4'>{song.track.album.name}</div>
                        <div className='w-1/12 hidden lg:block'>{convertMS(song.track.duration_ms)}</div>
                      </div>
                    )}
                  </span>
                  :
                  <div className="loader"></div>
                  }
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;

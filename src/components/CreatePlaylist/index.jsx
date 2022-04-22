import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchTrack, createPlaylist, addToPlaylist } from '../../utils/getApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tracks from '../Tracks'

toast.configure()
const CreatePlaylist = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);


  const [text, setText] = useState('');
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    const selectedTracks = filterSelectedTracks();
    if (selectedTracks.length !== 0) {
      if (form.title.length < 10) {
        alert("title must be more than 10 characters");
      } else {
        try {
          const resCreatePlaylist = await createPlaylist(
            accessToken,
            userId,
            {
              name: form.title,
              description: form.desc,
            }
          );
          await addToPlaylist(accessToken, resCreatePlaylist.id, selectedTracksUri);

          toast.success('Playlist created successfully');
          setForm({ title: "", desc: "" });
        } catch (e) {
          alert(e);
        }
      }
    } else {
      alert("Please choose song!");
    }
  };

  const getDataSearch = (searchTracks) => {
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = searchTracks.filter(
      (track) => !selectedTracksUri.includes(track.uri)
    );
    setTracks([...selectedTracks, ...searchDistincTracks]);
  };

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selectedTracksUri.includes(track.uri));
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await searchTrack(text, accessToken);
      const tracks = response.data.tracks.items;
      setTracks(tracks);
      getDataSearch(tracks);

    } catch (error) {
      alert("please input song");
    }
  }

  const convertMS = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className="App" data-testid="create-playlist">
      <div className="z-50 fixed bottom-0 border-t-2 border-card lg:left-0 w-full lg:w-48 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
        <div className="lg:mt-16 lg:space-y-4 flex lg:flex-col justify-between h-auto">
          <Link
            className="lg:rounded-r-full flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

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
            className="lg:rounded-r-full text-spotify lg:bg-spotify lg:text-white flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

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
      <div className="px-8 lg:ml-48 lg:px-20 lg:py-6  bg-black text-gray-100 min-h-screen overflow-hidden">
        <div className='py-12  overflow-x-hidden md:py-28 '>
          <div className="flex text-gray-500 space-x-8 mb-12">
            <div className='flex flex-col justify-center'>
              <h3 className='text-2xl heading mr-4'>Search</h3>
              <div className='flex-col '>
                <form onSubmit={handleSubmit}>
                  <input onChange={handleInput} data-testid="search-input" placeholder="Artists,songs, or podcast" className='mt-3  py-1 w-max lg:w-80 sm:w-max outline-none bg-transparent border-2 border-gray-600 rounded-full text-gray-400 px-3  focus:border-spotify' type="text" />
                </form>
                <form className='ml-[10px] justify-center mt-[15px] ' onSubmit={handleSubmitCreate}>
                  <div className="mb-6 ">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input name='title' value={form.title} onChange={handleChange} type="text" id="title" className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <input name='desc' value={form.desc} onChange={handleChange} type="text" id="desc" className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <button type="submit" className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-spotify dark:hover:bg-white dark:hover:text-black dark:focus:ring-blue-800">Create</button>
                </form>
              </div>
            </div>
          </div>
          <div>
            <div className='mt-20 w-full '>

              <div className="table flex justify-between w-full lg:pr-60 " data-testid="track-items">
                <div className="w-screen lg:w-auto flex justify-between text-gray-700 mb-4 tracking-wider text-sm border-gray-800 sticky top-0 pt-8 bg-black border-bottom">
                  <div className='w-12/12 lg:w-8/12 text-left'>TRACK</div>
                  <div className='w-10/12 hidden lg:block text-left'>ALBUM</div>
                  <div className='w-5/12 hidden lg:block text-right'>DURATION</div>
                  <div className='w-6/12 hidden lg:block text-left'></div>
                </div>



                {tracks.length > 0 ?
                  tracks.map((track) =>
                    <Tracks
                      key={track.id}
                      songName={track.name}
                      songAlbums={track.album.name}
                      imgUrl={track.album.images[0].url}
                      duration={convertMS(track.duration_ms)}
                      toggleSelect={() => toggleSelect(track)}

                    />
                  )
                  :
                  <div className='w-screen px-[30%]'>No data</div>

                }


              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePlaylist
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPlaylists } from '../../utils/getApi'
import DoubleCard from '../DoubleCard'

const MyPlaylist = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const dataPlaylist = async () => {
      const playlist = await getPlaylists(accessToken);
      setPlaylists(playlist)
    }
    dataPlaylist();
  }, [accessToken])
  return (
    <div className='App' data-testid="playlist">
      <div className="z-50 fixed bottom-0 border-t-2 border-card lg:left-0 w-full lg:w-48 bg-black shadow-inner lg:h-screen text-white lg:pt-16">
        <div className="lg:mt-16 lg:space-y-4 flex lg:flex-col justify-between h-auto" >
          <Link
          data-testid="sidebar"
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
            className="lg:rounded-r-full text-spotify lg:bg-spotify lg:text-white flex justify-center lg:justify-start items-center sm:space-x-2 py-3 px-4 lg:px-6 lg:py-2 hover:bg-card hover:text-spotify w-1/5 lg:w-full"

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
      <div className="px-8  lg:ml-48 lg:px-20 lg:py-6 bg-black text-gray-100 min-h-screen overflow-hidden">
        <div className='py-12 w-fit md:py-28 '>
          <div className="flex text-gray-500 space-x-8 mb-12">
            <div className='hover:text-gray-200 text-sm md:text-base' >Playlists</div>
          </div>

          <div>
            <h3 className='text-2xl heading'>Your Playlists</h3>
            {playlists.length > 0 ?
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5'>
                {playlists.map(playlist =>

                  <a  href={playlist.external_urls.spotify}
                    rel="noreferrer"
                    target="_blank" key={playlist.id}>
                    <DoubleCard imageURL={playlist.images[0].url} itemName={playlist.name} subItem={`${playlist.tracks.total} tracks`} />
                  </a>
                )}
              </div>
              : <div className='loader'>Loading, Please Wait</div>}
          </div>

        </div>

      </div>
    </div>
  )
}

export default MyPlaylist
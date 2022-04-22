import React, { useState } from 'react'

const Tracks = ({key,songName,songAlbums,imgUrl,duration,toggleSelect}) => {
    const [isSelected, setIsSelected] = useState(false);
    const handleToggleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    }
    return (
        <div data-testid="track" className="lg:flex text-gray-400 justify-between w-full" key={key}>
            <div className="w-12/12 lg:w-5/12 truncate">
                <div>
                    <div className='w-full flex items-start mb-7 w-full pr-8 truncate overflow-hidden'>
                        <div className='hidden sm:block sm:w-12 sm:h-12 overflow-hidden rounded-full'>
                            <img data-testid="track-img" src={imgUrl} alt="track" className='object-cover' />
                        </div>
                        <div className='ml-4 truncate'>
                            <h4 data-testid="track-song" className='text-gray-400 hover:text-white truncate' >{songName}</h4>

                        </div>
                    </div>
                </div>
            </div>
            <div className='w-8/12 hidden lg:block pr-4' data-testid="track-albums">{songAlbums}</div>
            <div className='w-4/12 hidden lg:block' data-testid="track-duration">{duration}</div>
            <div className='w-1/12 hidden lg:block'>
                <button
                    className={` hover:bg-spotify text-white font-bold py-2 px-4 rounded-full ${isSelected ? "bg-spotify" : ""
                        }`}
                    onClick={handleToggleSelect}
                >
                    {isSelected ? "Deselect" : "Select"}
                </button>
            </div>
        </div>
    )
}

export default Tracks
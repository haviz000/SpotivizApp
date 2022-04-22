import React, { useCallback, useEffect } from 'react'
import config from '../../utils/config'
import { useDispatch } from "react-redux";
import { login } from '../../slice/authSlice';
import { useNavigate } from "react-router-dom";
import { getUserProfile } from '../../utils/getApi';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginSetting = useCallback(async (accessToken, expiresIn) => {
    try {
      const responseUser = await getUserProfile(accessToken);
      dispatch(login({
        accessToken,
        expiredDate: +new Date() + expiresIn * 1000,
        isAuth:true,
        user: responseUser,
      }));

      navigate('/profile');
    } catch (e) {
      alert(e.message)
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
    const expiresIn = new URLSearchParams(window.location.hash).get('expires_in');
    if (accessTokenParams !== null) {
      loginSetting(accessTokenParams, expiresIn);
    }
  }, [loginSetting])

  const getAuth = () => {
    const state = Math.random().toFixed(16).split('.')[1];
    const clientId = process.env.REACT_APP_SPOTIFY_ID;

    return `https://accounts.spotify.com/authorize?response_type=${config.RESPONSE_TYPE}&client_id=${clientId}&redirect_uri=${config.REDIRECT_URI}&state=${state}&scope=${config.SPOTIFY_SCOPE}`;

  }

  return (
    <div className='max-h-screen overflow-hidden' data-testid="auth-page">
      <div className='flex flex-col-reverse sm:flex-row px-4 md:px-12 py-16 md:py-24 bg-login bg-no-repeat bg-cover h-screen'>
        <div className='w-full sm:w-7/12 pt-[60px] ml-[300px]'>
        <img src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png'alt='bg' className=' mb-10 h-[180px] w-[580px]' data-testid="img-auth"/>
          
          <a className='ml-[180px] mr-20 mt-40 w-full  block sm:inline text-center sm:w-auto bg-spotify text-white rounded-full px-12 py-3 text-xs md:text-sm hover:shadow-md hover:bg-green-600 transition-all duration-300 uppercase ' href={getAuth()} data-testid="btn-auth">Connect to Spotify</a>
        </div>
      </div>

    </div>
  )
}

export default Auth

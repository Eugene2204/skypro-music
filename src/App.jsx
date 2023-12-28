import React from 'react';
import { GlobalStyle } from './components/Global.styles/Global.styles.js';
import * as S from './App.styles.js';
import { AppRoutes } from './routes.jsx';
import { AudioPlayer } from './components/audioPlayer/audioPlayer.jsx';
import { useState, useEffect, useRef } from 'react';
import { getAllTracks } from './Api.jsx'
import { UserContext } from './Authorization.jsx';
import { useDispatch, useSelector } from 'react-redux'
import { setTracks } from './store/slices.jsx'


export const App = () => {

  const dispatch = useDispatch()
    const activeTrack = useSelector((state) => state.tracks.activeTrack)
    const [isLoading, setIsLoading] = useState(true)
    const [isPlayerVisible, setIsPlayerVisible] = useState(true)
    const [loadingTracksError, setLoadingTracksError] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('user')) ?? 'Не авторизован',
    )

    const audioRef = useRef(null)

    const handleStart = () => {
        audioRef.current.play()
        setIsPlaying(true)
    }

    const handleStop = () => {
        audioRef.current.pause()
        setIsPlaying(false)
    }

    const togglePlay = isPlaying ? handleStop : handleStart

    useEffect(() => {
        if (audioRef.current) {
            handleStart()
        }
    }, [activeTrack])

    useEffect(() => {
        getAllTracks()
            .then((tracks) => {
                dispatch(setTracks({ tracks }))
            })
            .catch((error) => {
                setLoadingTracksError(error.message)
            })
            .finally(() => setIsLoading(false))
    }, [dispatch])


  return (
  <>
    <GlobalStyle />
    <UserContext.Provider value={[userData, setUserData]}>
    <S.Wrapper>
      <S.Container>
      <>
                        <AppRoutes
                           user={localStorage.getItem('user')}
                           isLoading={isLoading}
                           setIsLoading={setIsLoading}
                           isPlayerVisible={isPlayerVisible}
                           setIsPlayerVisible={setIsPlayerVisible}
                           loadingTracksError={loadingTracksError}
                           togglePlay={togglePlay}
                        />
                        {AudioPlayer({ audioRef,
                                togglePlay,
                                isPlaying,
                                isPlayerVisible,
                                isLoading, })}
                    </>
      </S.Container>
    </S.Wrapper>
    </UserContext.Provider>
    </>
  )
}

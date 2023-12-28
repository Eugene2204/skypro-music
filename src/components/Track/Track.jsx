import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ConvertTime } from '../../helpers.jsx';
import { setActiveTrack, setCurrentPlaylist } from '../../store/slices.jsx';
import * as S from './Track.styles.js';
import { removeLike, setLike, refreshToken, getFavTracks, getAllTracks, } from '../../Api.jsx';
import { setTracks } from '../../store/slices.jsx';

export const Track = ({ track,  isLoading, playlist, setLoadingTracksError, setIsLoading, setIsPlayerVisible,}) => {

  const dispatch = useDispatch()
  const activeTrack = useSelector((state) => state.tracks.activeTrack)

  let isLiked = track?.stared_user?.some(
      ({ username }) => username === JSON.parse(localStorage.getItem('user')),
  )
  if (playlist === 'fav') {
      isLiked = true
  }

  const handleLike = (id) => {
      setLike(id)
          .then(() => {
              if (playlist === 'fav') {
                  getFavTracks()
                      .then((response) => {
                          if (response.status === 401) {
                              refreshToken()
                                  .then((response) => {
                                      return response.json()
                                  })
                                  .then((response) => {
                                      localStorage.setItem(
                                          'accessToken',
                                          response.access,
                                      )
                                  })
                                  .then(async () => {
                                      const tracksResponse =
                                          await getFavTracks()
                                      return tracksResponse.json()
                                  })
                                  .then((tracks) => {
                                      dispatch(setTracks({ tracks }))
                                      setLoadingTracksError('')
                                  })
                          }
                          return response.json()
                      })
                      .then((tracks) => {
                          dispatch(setTracks({ tracks }))
                      })
                      .then(() => {
                          setLoadingTracksError('')
                          setIsLoading(false)
                      })
                      .catch((error) => {
                          console.log(error)
                      })
              } else {
                  getAllTracks()
                      .then((tracks) => {
                          dispatch(setTracks({ tracks }))
                      })
                      .then(() => {
                        setLoadingTracksError && setLoadingTracksError('')
                        setIsLoading && setIsLoading(false)
                      })
                      .catch((error) => {
                          console.log(error)
                      })
              }
          })
  }

  const handleRemoveLike = (id) => {
      removeLike(id)
          .then(() => {
              if (playlist === 'fav') {
                  getFavTracks()
                      .then((response) => {
                          if (response.status === 401) {
                              refreshToken()
                                  .then((response) => {
                                      return response.json()
                                  })
                                  .then((response) => {
                                      localStorage.setItem(
                                          'accessToken',
                                          response.access,
                                      )
                                  })
                                  .then(async () => {
                                      const tracksResponse =
                                          await getFavTracks()
                                      return tracksResponse.json()
                                  })
                                  .then((tracks) => {
                                      dispatch(setTracks({ tracks }))
                                      setLoadingTracksError('')
                                  })
                          }
                          return response.json()
                      })
                      .then((tracks) => {
                          dispatch(setTracks({ tracks }))
                      })
                      .then(() => {
                        setLoadingTracksError && setLoadingTracksError('')
                        setIsLoading && setIsLoading(false)
                      })
                      .catch((error) => {
                          console.log(error)
                      })
              } else {
                  getAllTracks()
                      .then((tracks) => {
                          dispatch(setTracks({ tracks }))
                      })
                      .then(() => {
                        setLoadingTracksError && setLoadingTracksError('')
                        setIsLoading && setIsLoading(false)
                      })
                      .catch((error) => {
                          console.log(error)
                      })
              }
          })
  }

  const handleLikeClick = (id) => {
      isLiked ? handleRemoveLike(id) : handleLike(id)
  }

    return (
        <S.PlaylistItem  key={track.id}
        onClick={() => {
            dispatch(setCurrentPlaylist())
            dispatch(setActiveTrack({ track }))
            setIsPlayerVisible &&  setIsPlayerVisible(true)
        }}>
  <S.PlaylistTrack>
    <S.TrackTitle>
      <S.TrackTitleImage>
      {isLoading ? (
      <Skeleton
      width={55}
      height={55}
      baseColor="#202020"
      highlightColor="#444"/>
      ) : activeTrack.id === track.id ? (
        <S.ActiveTrack />
) : (     
        <S.TrackTitleSvg alt="music">
           <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
        </S.TrackTitleSvg>
          )}  
      </S.TrackTitleImage>
      {isLoading ? (
                <Skeleton
                width={270}
                baseColor="#202020"
                highlightColor="#444"/>
            ) : (
        <S.TrackTitleLink  >
        {track.name} 
        <S.TrackTitleSpan></S.TrackTitleSpan>
        </S.TrackTitleLink>
        )} 
    </S.TrackTitle>
    <S.TrackAuthor>
      {isLoading ? (
      <Skeleton
      width={270}
      baseColor="#202020"
      highlightColor="#444"/>
 ) : (
      <S.TrackAuthorLink href="http://">{track.author}</S.TrackAuthorLink>
      )}
    </S.TrackAuthor>
    <S.TrackAlbum>
      {isLoading ? (
      <Skeleton
      width={350}
      baseColor="#202020"
      highlightColor="#444"/>
  ) : (
      <S.TrackAlbumLink href="http://"
        >{track.album}</S.TrackAlbumLink>
  )}
    </S.TrackAlbum>
    <div>
      <S.TrackTimeSvg $isLiked={isLiked}
                            alt="time"
                            onClick={(event) => {
                                event.stopPropagation()
                                handleLikeClick(track.id)
                            }}>
        <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
      </S.TrackTimeSvg>
      <S.TrackTimeText> {ConvertTime(
                                track.duration_in_seconds,
                            )}
      </S.TrackTimeText>
    </div>
  </S.PlaylistTrack>
</S.PlaylistItem>
    )
}
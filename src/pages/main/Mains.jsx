import { NavMenu } from '../../components/navMenu/NavMenu.jsx';
import { Sidebar } from '../../components/sidebar/sidebar.jsx';
import { FilterButtons } from '../../components/popupMenuButtons/popupMenuButtons.jsx';
import { TrackList } from '../../components/trackList/TrackList.jsx';
import { GlobalStyle } from '../../components/Global.styles/Global.styles.js';
import * as S from './main.styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setTracks } from '../../store/slices.jsx';
import { getAllTracks } from '../../Api.jsx';
import React from 'react';

export const MainPage = ({
  isLoading,
  setIsPlayerVisible,
  loadingTracksError,
  setIsLoading,
  setLoadingTracksError,
  playlist,
  setPlaylist,
}) => {
  const tracks = useSelector((state) => state.tracks.tracks)
  const dispatch = useDispatch()

  useEffect(() => {
    setPlaylist && setPlaylist('main')
      getAllTracks()
          .then((tracks) => {
              dispatch(setTracks({ tracks }))
          })
          .then(() => {
            setLoadingTracksError && setLoadingTracksError('')
              setIsLoading(false)
          })
          .catch((error) => {
              console.log(error)
          })
  }, [dispatch, setLoadingTracksError, setIsLoading, setPlaylist])

  return (
      <>
          <GlobalStyle />
          <S.Wrapper>
              <S.Container>
                  <S.Main>
                      {NavMenu({ setIsPlayerVisible })}
                      <S.MainCenterblock>
                          <S.CenterblockSearch>
                              <S.SearchSvg>
                                  <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
                              </S.SearchSvg>
                              <S.SearchText
                                  type="search"
                                  placeholder="Поиск"
                                  name="search"
                              />
                          </S.CenterblockSearch>
                          <S.CenterblockHeading>Треки</S.CenterblockHeading>
                          {FilterButtons({
                              tracks,
                              
                          })}
                          <S.CenterblockContent>
                              <S.ContentTitle>
                                  <S.PlaylistTitleTrack>
                                      Трек
                                  </S.PlaylistTitleTrack>
                                  <S.PlaylistTitleAuthor>
                                      ИСПОЛНИТЕЛЬ
                                  </S.PlaylistTitleAuthor>
                                  <S.PlaylistTitleAlbum>
                                      АЛЬБОМ
                                  </S.PlaylistTitleAlbum>
                                  <S.PlaylistTitleImage>
                                      <S.PlaylistTitleSvg alt="time">
                                          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                                      </S.PlaylistTitleSvg>
                                  </S.PlaylistTitleImage>
                              </S.ContentTitle>
                              {TrackList({
                                  isLoading,
                                  setIsPlayerVisible,
                                  loadingTracksError,
                                  setIsLoading,
                                  setLoadingTracksError,
                                  playlist,
                                  
                                  tracks,
                                  
                              })}
                          </S.CenterblockContent>
                      </S.MainCenterblock>
                      {Sidebar({ isLoading, setIsPlayerVisible })}
                  </S.Main>
              </S.Container>
          </S.Wrapper>
      </>
  )
}

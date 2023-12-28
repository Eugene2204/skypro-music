import {NavMenu} from '../../components/navMenu/NavMenu.jsx';
import { FilterButtons } from '../../components/popupMenuButtons/popupMenuButtons.jsx'
import {TrackList} from '../../components/trackList/TrackList.jsx';
import {Sidebar} from '../../components/sidebar/sidebar.jsx';
import React from 'react';
import { GlobalStyle } from '../../components/Global.styles/Global.styles.js';
import * as S from './main.styles.js';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setTracks } from '../../store/slices.jsx'
import { getAllTracks } from '../../Api.jsx';

export const MainPage = ({ isLoading, setIsPlayerVisible, loadingTracksError,setIsPlaying, isPlaying, togglePlay,setIsLoading, setLoadingTracksError, }) => {
  
  const dispatch = useDispatch()

  useEffect(() => {
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
  }, [dispatch, setLoadingTracksError, setIsLoading])
  
  const playlist = 'main'

  return (
  <>
    <GlobalStyle />
    <S.Wrapper >
      <S.Container>
        <S.Main>
       <NavMenu />
       <S.MainCenterBlock>
            <S.CenterblockSearch>
              <S.SearchSvg>
                <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
              </S.SearchSvg>
              <S.SearchText
                type="search"
                placeholder="Поиск"
                name="search"/>
            </S.CenterblockSearch>
            <S.CenterblockH2>Треки</S.CenterblockH2>
            <FilterButtons />
            <S.CenterblockContent>
              <S.ContentTitle className="playlist-title">
                <S.PlayListTitleCol1>Трек</S.PlayListTitleCol1>
                <S.PlayListTitleCol2>ИСПОЛНИТЕЛЬ</S.PlayListTitleCol2>
                <S.PlayListTitleCol3>АЛЬБОМ</S.PlayListTitleCol3>
                <S.PlayListTitleCol4>
                  <S.PlayListTitleSvg alt="time">
                    <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
                  </S.PlayListTitleSvg>
                </S.PlayListTitleCol4>
              </S.ContentTitle>
              {TrackList(
                    isLoading,
                    setIsPlayerVisible,
                    loadingTracksError,
                    setIsPlaying,
                    isPlaying,
                    togglePlay,
                    setIsLoading,
                    setLoadingTracksError,
                    playlist,
                )}
            </S.CenterblockContent>
          </S.MainCenterBlock>
          {Sidebar({ isLoading })}
        </S.Main>
        <footer></footer>
      </S.Container>
    </S.Wrapper>
    </>
  )}
import * as S from './myTrack.styles.js';
import { GlobalStyle } from '../../components/Global.styles/Global.styles.js';
import React from 'react';
import { NavMenu } from '../../components/navMenu/NavMenu.jsx';
import { TrackList } from '../../components/trackList/TrackList.jsx';
import { Sidebar } from '../../components/sidebar/sidebar.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTracks } from '../../store/slices.jsx';
import { getFavTracks, refreshToken } from '../../Api.jsx';

export const MyTracksPage = ({ isLoading, setIsPlayerVisible, loadingTracksError, setIsLoading, setLoadingTracksError, }) => {
    
    const dispatch = useDispatch()
    useEffect(() => {
        getFavTracks()
            .then((response) => {
                if (response.status === 401) {
                    refreshToken()
                        .then((response) => {
                            return response.json()
                        })
                        .then((response) => {
                            localStorage.setItem('accessToken', response.access)
                        })
                        .then(async () => {
                            const tracksResponse = await getFavTracks()
                            return tracksResponse.json()
                        })
                        .then((tracks) => {
                            dispatch(setTracks({ tracks }))
                            setLoadingTracksError &&   setLoadingTracksError('')
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
    }, [setLoadingTracksError, dispatch, setIsLoading])

    const playlist = 'fav'
    
    return (
        <>
            <GlobalStyle />
            <S.Wrapper>
                <S.Container>
                    <S.Main>
                        {NavMenu()}
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
                            <S.CenterblockHeading>
                                Мои треки
                            </S.CenterblockHeading>
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
                                })}
                            </S.CenterblockContent>
                        </S.MainCenterblock>
                        {Sidebar({ isLoading })}
                    </S.Main>
                </S.Container>
            </S.Wrapper>
        </>
          )
        }
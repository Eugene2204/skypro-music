import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import * as S from './trackList.styles.js';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { Track } from '../Track/Track.jsx';
import { useSelector } from 'react-redux';

export const TrackList = ({ isLoading, setIsPlayerVisible, loadingTracksError, playlist, setLoadingTracksError,setIsLoading, }) => {

  const tracks = useSelector((state) => state.tracks.tracks)

return (
  <>
<OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'auto' } }}>
<S.ContentPlaylist>
{loadingTracksError && (
                <S.LoadingTracksError>
                    {loadingTracksError}
                </S.LoadingTracksError>
            )}
 { tracks.map((track) => {
                return (
                  <Track
                        key={track.id}
                        track={track}
                        isLoading={isLoading}
                        playlist={playlist}
                        setIsPlayerVisible={setIsPlayerVisible}
                        setLoadingTracksError={setLoadingTracksError}
                        setIsLoading={setIsLoading}
              />
               )
              })}
              </S.ContentPlaylist>
              </OverlayScrollbarsComponent>
              </>
      )
}


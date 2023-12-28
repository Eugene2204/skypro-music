import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
    name: 'tracks',
    initialState: {
        activeTrack: {},
        tracks: [],
        currentPlaylist: [],
        shuffledTracks: [],
        isShuffled: false,
    },

    reducers: {
        setTracks(state, action) {
            state.tracks = action.payload.tracks
            state.shuffledTracks = [...action.payload.tracks].sort(
                () => Math.random() - 0.5,
            )
        },

        setCurrentPlaylist(state) {
            state.currentPlaylist = state.tracks
        },

        setActiveTrack(state, action) {
            state.activeTrack = action.payload.track
        },

        setIsShuffled(state) {
            state.isShuffled = !state.isShuffled
            if (state.isShuffled) {
                state.shuffledTracks = state.currentPlaylist
                state.shuffledTracks.sort(() => Math.random() - 0.5)
            }
        },

        playNextTrack(state) {
            const playlist = state.isShuffled
                ? state.shuffledTracks
                : state.currentPlaylist
            const indexCurrentTrack = playlist.findIndex((track) => {
                return track.id === state.activeTrack.id
            })

            if (playlist[indexCurrentTrack + 1]) {
                state.activeTrack = playlist[indexCurrentTrack + 1]
            }
        },

        playPrevTrack(state) {
            const playlist = state.isShuffled
                ? state.shuffledTracks
                : state.currentPlaylist

            const indexCurrentTrack = playlist.findIndex((track) => {
                return track.id === state.activeTrack.id
            })

            if (indexCurrentTrack > 0) {
                state.activeTrack = playlist[indexCurrentTrack - 1]
            }
        },
    },
})

export const {
    setActiveTrack,
    setIsShuffled,
    playNextTrack,
    playPrevTrack,
    setTracks,
    setCurrentPlaylist,
} = trackSlice.actions

export const trackReducer = trackSlice.reducer
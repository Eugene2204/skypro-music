import { Routes, Route } from "react-router-dom";
import { Login } from './pages/SignIn/SignIn.jsx';
import { SignUp } from './pages/signUp/SignUp.jsx';
import { MainPage } from './pages/main/Mains.jsx';
import { NotFoundPage } from './pages/NotFound/NotFound.jsx';
import { MyTracksPage } from './pages/myTrack/myTrack.jsx';
import { PlaylistPage } from './pages/playlistPage/playlistPage.jsx';
import { Protection } from './components/Protection/Protection.jsx';
import React from 'react';

export const AppRoutes = ({ user, isLoading, setIsLoading, isPlayerVisible, setIsPlayerVisible,
    loadingTracksError, setIsPlaying, isPlaying, handleStart, handleStop, togglePlay,}) => {
    return(
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
            <Route element={<Protection isAllowed={Boolean(user)} />}>
                <Route path="/favorites" element={<MyTracksPage />}></Route>
                <Route
                    path="/"
                    element={
                        <MainPage
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            isPlayerVisible={isPlayerVisible}
                            setIsPlayerVisible={setIsPlayerVisible}
                            loadingTracksError={loadingTracksError}
                            setIsPlaying={setIsPlaying}
                            isPlaying={isPlaying}
                            handleStart={handleStart}
                            handleStop={handleStop}
                            togglePlay={togglePlay}
                        />
                    }
                ></Route>
                <Route path="/category/:id" element={<PlaylistPage />}></Route>
            </Route>
        </Routes>
    )}
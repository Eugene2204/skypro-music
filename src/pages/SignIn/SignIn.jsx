import React from 'react';
import * as S from './signIn.styles.js';
import { GlobalStyle } from '../../components/Global.styles/Global.styles.js';
import { useRef, useState } from 'react';
import { UserContext } from '../../Authorization.jsx';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken,login } from '../../Api.jsx';

export const Login = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [, setUserData] = useContext(UserContext)
  const signInButtonRef = useRef(null)
  async function handleSignIn({ email, password }) {
      if (email === '') {
          setError('Укажите почту')
          return
      }
      if (password === '') {
          setError('Укажите пароль')
          return
      }
      signInButtonRef.current.disabled = true
      const response = await login({ email, password })
      if (response.status === 400) {
          setError('Произошла ошибка с данными. Неверные логин или пароль')
          signInButtonRef.current.disabled = false
          return
      } else if (response.status === 401) {
          setError('Пользователь с таким email или паролем не найден')
          signInButtonRef.current.disabled = false
          return
      } else if (response.status === 500) {
          setError('Сервер не отвечает, попробуй позже')
          signInButtonRef.current.disabled = false
          return
      }
      const data = await response.json()
      setUserData(data.username)
      localStorage.setItem('user', JSON.stringify(data.username))
      signInButtonRef.current.disabled = false
      navigate('/')

      const tokenResponse = await getToken({ email, password })
      const tokens = await tokenResponse.json()
      const accessToken = tokens.access
      const refreshToken = tokens.refresh

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
  }
    
    return(
    <>
      <GlobalStyle />
      <S.Wrapper>
        <S.ContainerEnter>
          <S.ModalBlock>
            <S.ModalFormLogin action="#">
            <S.ModalButtonLink to="/">
                <S.ModalLogo>
                  <img src="../img/logo_modal.png" alt="logo" />
                </S.ModalLogo>
            </S.ModalButtonLink>
              <S.ModalInputLogin
                className="login"
                type="text"
                name="login"
                placeholder="Почта"
                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
              />
              <S.ModalInput
                className="password"
                type="password"
                name="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
            />
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
              
              <S.ModalBtnEnter  >
              <S.ModalButtonLink  ref={signInButtonRef}
                                onClick={() => {
                                    signInButtonRef.current.disabled = true
                                    handleSignIn({ email, password })
                                }}>Войти</S.ModalButtonLink>
              </S.ModalBtnEnter>
              <S.ModalBtnSignUp>
              <S.ModalButtonLink to="/SignUp">Зарегистрироваться</S.ModalButtonLink>
              </S.ModalBtnSignUp>
            </S.ModalFormLogin>
          </S.ModalBlock>
        </S.ContainerEnter>
      </S.Wrapper>
    </>
    )
  }
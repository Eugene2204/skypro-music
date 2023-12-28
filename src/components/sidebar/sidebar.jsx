import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import * as S from './sidebar.styles.js';
import { Categories } from '../../constant.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Authorization.jsx';

export const Sidebar = ({isLoading}) => {
  
  const navigate = useNavigate()
  const handleLogout = () => {
      localStorage.removeItem('user')
      navigate('/login')
  }

  const [userData] = useContext(UserContext)

if (isLoading) {
        
return(
  <SkeletonTheme baseColor="#202020"
  highlightColor="#444"><S.MainSidebar>
  <S.SidebarPersonal>
    <S.SidebarPersonalName></S.SidebarPersonalName>
    <S.SidebarIcon>
      <svg  alt="logout">
        <use xlinkHref="img/icon/sprite.svg#logout"></use>
      </svg>
    </S.SidebarIcon>
  </S.SidebarPersonal>
  <S.SidebarBlock>
    <S.SidebarList>
    <S.SidebarItem>
                                <Skeleton
                                    width={250}
                                    height={150}
                                    count={3}
                                />
      </S.SidebarItem>
    </S.SidebarList>
    </S.SidebarBlock>
    </S.MainSidebar>
    </SkeletonTheme>
)}

return (
<S.MainSidebar>
            <S.SidebarPersonal>
              <S.SidebarPersonalName>{userData ?? 'Не авторизован'}</S.SidebarPersonalName>
              <S.SidebarIcon onClick={handleLogout}>
                <svg alt="logout">
                  <use xlinkHref="img/icon/sprite.svg#logout"></use>
                </svg>
              </S.SidebarIcon>
            </S.SidebarPersonal>
            <S.SidebarBlock>
              <S.SidebarList>
              {Categories.map((category) => {
                        return (
                <S.SidebarItem key={category.id}>
                  <S.SidebarLink  id={category.id}
                                        to={`/category/${category.id}`}>
                    <S.SidebarImg
                      src={category.img}
                      alt={category.alt}/>
                  </S.SidebarLink>
                </S.SidebarItem>
                )
                })}
              </S.SidebarList>
            </S.SidebarBlock>
          </S.MainSidebar>
    )
}
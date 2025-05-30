// 📁 src/components/Header.tsx
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../store/userSlice'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import api from '../api/axios'
import AlertDropdown from './AlertDropdown'
import { setAlerts } from '../store/alertSlice'
import NotificationListner from '../hooks/NotificationListner'

function Header() {
  const { isLoggedIn, nickname, id } = useSelector((state: RootState) => state.user)
  const alerts = useSelector((state:RootState)=>state.alert.alerts)
  const timeoutRef = useRef<number | null>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isHovered1, setIsHovered1] = useState(false)
  const [isHovered2, setIsHovered2] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    alert('로그아웃 되었습니다')
 }

 const handleMouseLeave = () => {
  timeoutRef.current = setTimeout(() => {
    setIsHovered1(false)
  }, 300)  // ⏱️ 300ms 후에 사라지도록
}
 useEffect(() => {
  const fetchAlerts = async () => {
    try {
      const res = await api.get(`/alert?id=${id}`)
      dispatch(setAlerts(res.data))  // Alert 전체를 전역 상태로 저장
    } catch (err) {
      console.error("알림 조회 실패", err)
    }
  }
  if (isLoggedIn) {
    fetchAlerts()
  }
  }, [isLoggedIn, id, dispatch])

  const unreadCount = alerts.filter(alert => alert.checked === 0).length

  return (
    <header className="header">
      <div className="header-title" onClick={()=>navigate('/category')}>SCSAC: Board</div>

      <div className="header-buttons">
        {isLoggedIn && <NotificationListner />}

        {isLoggedIn ? (
          <>  
            <span className="nickname">{nickname}님</span>
            <button onClick={() => navigate(`/mypage`)}>마이페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
            
            <div
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={handleMouseLeave}
              className="alert-container">
              <button className="icon-button" onClick={()=>navigate(`/alert`)}>
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                {(isHovered1 || isHovered2) && <div onMouseEnter={() => setIsHovered2(true)}
                                                    onMouseLeave={() => setIsHovered2(false)}><AlertDropdown /></div>}
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => alert('이미 로그인 화면입니다.')}>로그인</button>
        )}
      </div>
    </header>
  )
}

export default Header

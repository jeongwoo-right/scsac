// 📁 src/components/Header.tsx
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../store/userSlice'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'


import { useNavigate } from 'react-router-dom'

function Header() {
  const { isLoggedIn, nickname } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    alert('로그아웃 되었습니다')
 }

  return (
    <header className="header">
      <div className="header-title" onClick={()=>navigate('/category')}>SCSAC: Board</div>

      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <span className="nickname">{nickname}님</span>
            <button onClick={() => navigate(`/mypage`)}>마이페이지</button>
            <button onClick={handleLogout}>로그아웃</button>
            
            {/* google materials에서 가져온 notifications svg */}
            <button onClick={() => navigate("/alerts")} className="icon-button">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </>
        ) : (
          <button onClick={() => alert('이미 로그인 화면입니다.')}>로그인</button>
        )}
      </div>
    </header>
  )
}

export default Header

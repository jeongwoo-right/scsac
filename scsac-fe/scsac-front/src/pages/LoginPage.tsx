import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../store/userSlice'
import axios from 'axios'
import api from '../api/axios'
import '../components/LoginPage.css'
import type { RootState } from '../store'


function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  const handleLogin = async () => {
    try {
      const response = await api.post('/login',{ id, password })

      const data = response.data
      localStorage.setItem("jwt", data.token)
      console.log('로그인 성공', response.data) // user 정보 출력
      alert("로그인 성공")
      
      const userInfo = data.user
      dispatch(login({
        id: userInfo.id,
        password: userInfo.password,
        authority: userInfo.authority,
        generation: userInfo.generation,
        affiliate: userInfo.affiliate,
        name: userInfo.name,
        nickname: userInfo.nickname,
        boj_id: userInfo.boj_id,
      }))

      navigate('/category')      

    } 
    
    // 로그인 실패했을 경우
    catch (err) {
      console.error('❌ 오류 객체:', err)
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 401) setError('비밀번호가 틀렸습니다.')
        else if (status === 404) setError('존재하지 않는 사용자입니다.')
        else if (status === 403) setError('접근 권한이 없습니다.')
        else if (status === 500) setError('서버 오류입니다. 잠시 후 다시 시도해주세요.')
        else if (err.code === 'ECONNABORTED') setError('서버 연결이 너무 오래 걸립니다.')
        else if (!err.response) setError('서버가 응답하지 않습니다.')
        else setError(`알 수 없는 오류입니다. (${err.message})`)
      } else {
        setError('예기치 못한 오류가 발생했습니다.')
      }
    }
  }


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">SCSAC Board</h1>
        <p className="login-subtitle">기수 간 지식 공유를 위한 첫걸음</p>

        <div className="login-field">
          <label htmlFor="userId">아이디</label>
          <input
            id="userId"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="login-field">
          <label htmlFor="userPw">비밀번호</label>
          <input
            id="userPw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin() }}
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" onClick={handleLogin}>로그인</button>
      </div>
    </div>
  )
}

export default LoginPage
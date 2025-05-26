import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, logout } from '../store/userSlice'
import axios from 'axios'
import api from '../api/axios'
import '../components/LoginPage.css'


function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleLogin = async () => {
    try {
      const response = await api.post('/login',{ id, password })

            const token = response.data
      localStorage.setItem("jwt", token)
      console.log('로그인 성공', response.data) // user 정보 출력
      alert("로그인 성공")


      // redux에 사용자 정보를 저장하기 위해 다시 한 번 axios 요청
      const user_infoRes = await api.get(`/user/${id}`)
      
      const userInfo = user_infoRes.data
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
    
        if (status === 401) {
          setError('비밀번호가 틀렸습니다.')
        } else if (status === 404) {
          setError('존재하지 않는 사용자입니다.')
        } else if (status === 403) {
          setError('접근 권한이 없습니다. 관리자에게 문의해주세요.')
        } else if (status === 500) {
          setError('서버 오류입니다. 잠시 후 다시 시도해주세요.')
        } else if (err.code === 'ECONNABORTED') {
          setError('서버 연결이 너무 오래 걸립니다. 다시 시도해주세요.')
        } else if (!err.response) {
          setError('서버가 응답하지 않습니다. 네트워크를 확인하거나 서버 상태를 점검해주세요.')
        } else {
          setError(`알 수 없는 오류입니다. (${err.message})`)
        }
      } else {
        setError('예기치 못한 오류가 발생했습니다.')
      }
    }
  }


  return (
    <div className="login-container">
      <h2>로그인</h2>
      <input type="text" placeholder="아이디" value={id} 
        onChange={(e) => setId(e.target.value)}/>

      <input type="password" placeholder="비밀번호" value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        onKeyDown={(e) => {if (e.key === 'Enter') handleLogin()}}/> {/* 엔터 키 눌렀을 때도 로그인 실행 */}
      
      <button onClick={handleLogin}>로그인</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default LoginPage

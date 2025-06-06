import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import type { RootState } from '../store'
import api from '../api/axios'
import '../components/EditProfilePage.css'
import { login } from '../store/userSlice'

const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const location = useLocation()
  const passwordFromPrev = location.state?.password || ''
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    id: user.id || '',
    name: user.name || '',
    authority: user.authority || '',
    affiliate: user.affiliate || '',
    generation: user.generation || 0,
    nickname: user.nickname || '',
    boj_id: user.boj_id || '',
    password: passwordFromPrev,
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const hasEmpty = Object.entries(form).some(([key, val]) => {
      if (key === 'id' || key === 'boj_id')
         return false // id와 boj_id는 제외하고 검증

      return typeof val === 'string' && val.trim() === ''
    })

    if (hasEmpty || form.generation === 0) {
      setError('모든 필수 항목을 입력해 주세요. (BOJ 아이디는 선택)')
      return
    }

    try {
      const res = await api.put(`/user`, form)
      const updatedUser = res.data
      // const isProfileComplete = !!(updatedUser.name.trim() && updatedUser.nickname.trim() && updatedUser.affiliate.trim())
      
      dispatch(login(updatedUser))
      console.log(user)
      alert('회원정보가 수정되었습니다.')
      navigate('/mypage')
    } 
    
    catch (err) {
      setError('수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="edit-profile-container">
      <h2>회원정보 수정</h2>
      <div className="edit-profile-form">
        <label>비밀번호</label><br />
        <input type="password" name="password" value={form.password} onChange={handleChange} /><br />

        <label>이름</label><br />
        <input type="text" name="name" value={form.name} onChange={handleChange} /><br />

        <label>계열사</label><br />
        <input type="text" name="affiliate" value={form.affiliate} onChange={handleChange} /><br />

        <label>기수</label><br />
        <input type="number" name="generation" value={form.generation} onChange={handleChange} /><br />

        <label>닉네임</label><br />
        <input type="text" name="nickname" value={form.nickname} onChange={handleChange} /><br />

        <label>BOJ 아이디</label><br />
        <input type="text" name="boj_id" value={form.boj_id} onChange={handleChange} /><br />

        {error && <p className="error-text">{error}</p>}

        <button onClick={handleSubmit}>수정 완료</button>
      </div>
    </div>
  )
}

export default EditProfile
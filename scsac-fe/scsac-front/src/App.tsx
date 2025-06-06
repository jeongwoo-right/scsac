// 📁 src/App.tsx
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CategoryListPage from './pages/CategoryListPage'
import BoardPage from './pages/BoardPage'
import WritePage from './pages/WritePage'
import SidebarLayout from './components/SidebarLayout'
import ArticleDetailPage from './pages/ArticleDetailPage'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import ArticleEditPage from './pages/ArticleEditPage'
import MyPage from './pages/MyPage'
import EditProfile from './pages/EditProfilePage'
import { useEffect, useState } from 'react'
import api from './api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/userSlice'
import RedirectIfLoggedInRoute from './components/RedirectIfLoggedInRoute'
import AlertPage from './pages/AlertPage'
import ChatButton from './components/ChatButton'
import ChatBot from './components/ChatBot'
import type { RootState } from './store'

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [showChat, setShowChat] = useState(false);
  const isLogin = useSelector((state:RootState)=>state.user.isLoggedIn)


  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("jwt")
      
      console.log(token)
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await api.get("/user/me")
        const user = res.data
        console.log("user 정보: " + user)

        dispatch(login({
          id: user.id,
          password: user.password,
          authority: user.authority,
          generation: user.generation,
          affiliate: user.affiliate,
          name: user.name,
          nickname: user.nickname,
          boj_id: user.boj_id,
        }))
      }
      
      catch (err) {
        console.log("토큰이 유효하지 않음. 자동 로그아웃" + err)
        localStorage.removeItem("jwt")
        dispatch(logout())
      }

      finally {
        setLoading(false)
      }
    }

    restoreUser()
  }, [dispatch])
  


  if (loading) 
    return null // 또는 로딩 스피너 컴포넌트



  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 누구나 접근 가능한 로그인 페이지 */}  
        {/* path에 '/'있으면 루트부터 시작하는 절대경로 */}
        <Route path="/" element={<RedirectIfLoggedInRoute><LoginPage /></RedirectIfLoggedInRoute>} />
      
        <Route element={<SidebarLayout />}>
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>}/>
          <Route path="/category" element={<PrivateRoute><CategoryListPage /></PrivateRoute>} />
          <Route path="/category/:id" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
          <Route path="/category/:id/write" element={<PrivateRoute><WritePage /></PrivateRoute>} />
          <Route path="/article/:id" element={<PrivateRoute><ArticleDetailPage /></PrivateRoute>} />
          <Route path="/article/:id/edit" element={<PrivateRoute><ArticleEditPage/></PrivateRoute>}/>
          <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
          <Route path="/alert" element={<PrivateRoute><AlertPage /></PrivateRoute>}/>
          <Route path="/editProfile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        </Route>

      </Routes>
    </BrowserRouter>
    {showChat && isLogin && <ChatBot onClose={() => setShowChat(false)} />}
    {isLogin && <ChatButton onClick={() => setShowChat((prev) => !prev)} />}

    </>
  )
}

export default App

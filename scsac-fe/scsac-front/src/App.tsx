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


function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        {/* 누구나 접근 가능한 로그인 페이지 */}  
        {/* path에 '/'있으면 루트부터 시작하는 절대경로 */}
        <Route path="/" element={<LoginPage />} />
      
        <Route element={<SidebarLayout />}>
          <Route path="/admin" element={<PrivateRoute><Admin/></PrivateRoute>}/>
          <Route path="/category" element={<PrivateRoute><CategoryListPage /></PrivateRoute>} />
          <Route path="/category/:id" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
          <Route path="/category/:id/write" element={<PrivateRoute><WritePage /></PrivateRoute>} />
          <Route path="/article/:id" element={<PrivateRoute><ArticleDetailPage /></PrivateRoute>} />
          <Route path="/article/:id/edit" element={<PrivateRoute><ArticleEditPage/></PrivateRoute>}/>
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

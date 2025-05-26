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

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<SidebarLayout />}>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/category" element={<CategoryListPage />} />
          <Route path="/category/:id" element={<BoardPage />} />
          <Route path="/category/:id/write" element={<WritePage />} />
          <Route path="article/:id" element={<ArticleDetailPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

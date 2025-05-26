// 📁 src/App.tsx
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CategoryListPage from './pages/CategoryListPage'
import BoardPage from './pages/BoardPage'
import WritePage from './pages/WritePage'

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/category" element={<CategoryListPage />} />
        <Route path="/category/:id" element={<BoardPage />} />
        <Route path="/category/:id/write" element={<WritePage />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

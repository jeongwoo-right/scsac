import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useEffect, useState } from "react"
import "../components/SidebarLayout.css"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store"


interface Category {
  id: number
  title: string
}

function SidebarLayout() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const navigate = useNavigate()

  const isAdmin = useSelector((state: RootState) => state.user.authority)===1;

  const fetchCategories = async () => {
    const res = await api.get('/category')
    setCategories(res.data)
  }

  useEffect(() => {fetchCategories()}, [])

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("게시판 이름을 입력해주세요!")
      return
    }
  

    try {
      await api.post("/category", {title: newCategory})
      alert("✅ 게시판이 생성되었습니다!")
      setNewCategory("")
      setIsModalOpen(false)
      fetchCategories()
    } catch {
      alert("❌ 생성 실패")
    } 
  }
  return (
    <div className="layout-container">
      <aside className="sidebar">
        { isAdmin &&
          <button onClick={()=>navigate(`/admin`)}>관리자 페이지</button>
        }
        <h3>📂 게시판 목록</h3>
        <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
          ➕ 게시판 생성
        </button>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}>
              {cat.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        <Outlet />
      </main>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>게시판 생성</h3>
            <input
              type="text"
              value={newCategory}
              placeholder="게시판 이름"
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleCreateCategory}>생성</button>
              <button onClick={() => setIsModalOpen(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SidebarLayout

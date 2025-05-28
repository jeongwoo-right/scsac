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

  
  const [selectedAuthority, setSelectedAuthority] = useState<string[]>([]);

  const navigate = useNavigate()

  const isAdmin = useSelector((state: RootState) => state.user.authority==="ROLE_Admin");

  const fetchCategories = async () => {
    const res = await api.get('/category')
    setCategories(res.data)
  }

  useEffect(() => {fetchCategories()}, [])

  const handleAuthorityToggle = (authority: string) => {
    setSelectedAuthority(prev =>
      prev.includes(authority)
        ? prev.filter(a => a !== authority)
        : [...prev, authority]
    );
  };

  

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("게시판 이름을 입력해주세요!")
      return
    }
  

    try {
      // 접근 권한 post 요청으로 보내기
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
            <button className="admin-btn" onClick={()=>navigate(`/admin`)}>
              🛡️ 관리자 페이지
            </button>
        }
        <hr className="sidebar-divider" />
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

      {/* 게시판 생성 모달 */}
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
            
    
          {/* 접근 권한 */}
          <div className="access-roles">
            <label>접근 권한:</label>
            <div className="checkbox-row">
              <label>
                <input type="checkbox" value="ROLE_Student" checked={selectedAuthority.includes("ROLE_Student")} onChange={() => handleAuthorityToggle("ROLE_Student")}/>
                재학생
              </label>
              <label>
                <input type="checkbox" value="ROLE_Graduate" checked={selectedAuthority.includes("ROLE_Graduate")} onChange={() => handleAuthorityToggle("ROLE_Graduate")}/>
                졸업생
              </label>
            </div>
          </div>
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

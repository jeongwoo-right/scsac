import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useEffect, useState } from "react"
import "../components/SidebarLayout.css"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import CreateCategoryModal from "./CreateCategoryModal"


interface Category {
  id: number
  title: string
  authority: string
}

function SidebarLayout() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const user = useSelector((state: RootState) => state.user)
  const isProfileComplete = user.name && user.nickname && user.affiliate

  const [selectedAuthority, setSelectedAuthority] = useState<string[]>(["ROLE_Student"]);

  const navigate = useNavigate()

  const isAdmin = useSelector((state: RootState) => state.user.authority==="ROLE_Admin");

  const fetchCategories = async () => {
    if(isProfileComplete) {
      const res = await api.get('/category')
      setCategories(res.data)
    }
  }

  useEffect(() => {fetchCategories()}, [user])
  
  

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("게시판 이름을 입력해주세요!")
      return
    }

    try {
      // 접근 권한 post 요청으로 보내기
      await api.post("/category", {title: newCategory, authority: selectedAuthority[0]})
      alert("✅ 게시판이 생성되었습니다!")
      setNewCategory("")
      setIsModalOpen(false)
      fetchCategories()
    } catch {
      alert("❌ 생성 실패")
    } 
  }
  const deleteCategory = async (id : number) => {
    try{
      await api.delete(`/category/${id}`)
      alert("게시판이 삭제되었습니다.")
    } catch {
      alert("게시판 삭제에 실패하였습니다.")
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
          {isProfileComplete ? ( categories.map((cat) => (
            <li key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}>
              {cat.title}
              {user.authority==="ROLE_Admin" && <button className="delete-button" onClick={()=>deleteCategory(cat.id)}>X</button>}
            </li>
          ))) : (
            null
          )}
        </ul>
      
      </aside>
      <main className="content">
        <Outlet />
      </main>

      {/* 게시판 생성 모달 */}
      {isModalOpen && (
        <CreateCategoryModal
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          selectedAuthority={selectedAuthority}
          setSelectedAuthority={setSelectedAuthority}
          onClose={() => {setIsModalOpen(false); setSelectedAuthority(["ROLE_Student"])}}
          onSubmit={handleCreateCategory}
        />
      )}

    </div>
  )
}

export default SidebarLayout

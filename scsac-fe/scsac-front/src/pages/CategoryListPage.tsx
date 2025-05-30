import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import '../components/CategoryListPage.css'
import scsacLogo from '../assets/scsac.png'  // ✅ 이미지 import
import MainPage from "./MainPage";


// SCSAC-Board의 메인페이지
// Todo
// 1. 게시판 새로 생성 => 다시 get 요청 보내서 새 게시판까지 보이도록
// 2. 게시판 상태 redux 저장 => 게시판 내부 들어갔을 때 게시판 header에 title store에서 가져오기(현재 게시판 id가 보임)


interface Category {
  id: number
  title: string
}


function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const navigate = useNavigate()

  // useEffect: side effect 담당 (실행할 함수 -> side effect, [의존성: 언제 실행할지 조건])
  // useEffect(fn, []): 마운트될 때 딱 1번
  const fetchCategories = async () => {
    const res = await api.get('/category')
    setCategories(res.data)
  }

  useEffect(() => {fetchCategories()}, []) // 페이지 처음 로딩될 때 1번만 실행

  
  const handleCreateCategory = async () => {
    if (!newCategory.trim()) {
      alert("게시판 이름을 입력해주세요!")
    }

    try {
      await api.post('/category', {title: newCategory})
      alert("✅ 게시판이 생성되었습니다!")
      setNewCategory("")
      setIsModalOpen(false)
      fetchCategories()
    }

    catch(err) {
      alert("❌ 생성 실패")
    }
  }


  return (
    <div className="category-page">
      <main className="category-main">
        <MainPage/>
      </main>

    </div>
    )
}

export default CategoryListPage
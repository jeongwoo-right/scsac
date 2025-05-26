import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import '../components/CategoryListPage.css'


// SCSAC-Board의 메인페이지
// Todo
// 1. 게시판 새로 생성 => 다시 get 요청 보내서 새 게시판까지 보이도록
// 2. 게시판 상태 redux 저장 => 게시판 내부 들어갔을 때 게시판 header에 title store에서 가져오기(현재 게시판 id가 보임)


interface Category {
  id: number
  name: string
}


// 카테고리 리스

function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const navigate = useNavigate()

  // useEffect: side effect 담당 (실행할 함수 -> side effect, [의존성: 언제 실행할지 조건])
  // useEffect(fn, []): 마운트될 때 딱 1번
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await api.get('/category')
      setCategories(res.data)
    }

    fetchCategories()
  }, []) // 페이지 처음 로딩될 때 1번만 실행


  return (
    <div className="category-page">
      <aside className="category-sidebar">
        <h2>📂 게시판 목록</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}>
              {cat.name}
            </li>
          ))}
        </ul>
      </aside>
      <main className="category-main">
        <p>카테고리를 선택하세요.</p>
      </main>
    </div>
  )

}

export default CategoryListPage
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/BoardPage.css'


interface ArticleSummary {
  id: number
  title: string
  created_at: string
  views: number
  is_updated: number
}

function BoardPage() {
  const {id} = useParams() // category id (문자열로 들어옴) -> url의 :id 가져옴
  const categoryId = Number(id) // 숫자로 변환
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  // const [categoryTitle, setCategoryTitle] = useState<string>("")
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await api.get(`/category/${categoryId}`)
      // setCategoryTitle(res.data.category.title)
      setArticles(res.data)
    }

    fetchBoard()
  }, [id])

  
  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시글 목록</h2>
        <button className="write-button" onClick={() => navigate(`write`)}>
          ➕ 글쓰기
        </button>
      </div>

      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {articles.slice(0, 10).map((article) => (
            <tr key={article.id} onClick={()=>navigate(`/article/${article.id}`)}>
              <td>{article.title}</td>
              <td>{article.views}</td>
              <td>{article.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default BoardPage
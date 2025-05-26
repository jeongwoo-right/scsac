import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/BoardPage.css'


interface ArticleSummary {
  id: number
  title: string
  createdAt: string
  views: number
  isUpdated: number
}

function BoardPage() {
  const {id} = useParams() // category id (문자열로 들어옴) -> url의 :id 가져옴
  const categoryId = Number(id) // 숫자로 변환
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  const navigate = useNavigate()
  

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await api.get(`/category/${categoryId}`)
      setArticles(res.data)
    }

    fetchBoard()
  }, [id])

  
  return (
    <div className="board-container">
      <h2>게시글 목록</h2>
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
            <tr key={article.id}>
              <td>{article.title}</td>
              <td>{article.views}</td>
              <td>{article.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default BoardPage
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/BoardPage.css'

interface User {
  name: string | null
}

interface ArticleSummary {
  id: number
  title: string
  created_at: string
  views: number
  is_updated: number
  user: User
}

function BoardPage() {
  const {id} = useParams() // category id (문자열로 들어옴) -> url의 :id 가져옴
  const categoryId = Number(id) // 숫자로 변환
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  const [page, setPage] = useState(0) // 백엔드는 0-indexed
  const [size, setSize] = useState(10) // 몇개씩 볼건지
  const [sort, setSort] = useState("dateDesc") // "created_at" 또는 "views"
  const [condition, setCondition] = useState("title") // title 또는 writer
  const [keyword, setKeyword] = useState("")
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)


  const navigate = useNavigate()
  const fetchBoard = async () => {
    try {
      // alert("게시글 정렬 시작")
      const res = await api.get(`/category/${categoryId}`, {params: {page, size, sort, condition, keyword}});
      setArticles(res.data.content)
      setTotalPages(res.data.totalPages)
      console.log(res.data)
      
    } catch (err) {
      alert("게시글 불러오기 실패: " + err)
    }  finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchBoard()
  }, [id, page, size, sort, condition, keyword])

  if (loading)
    return 

  return (
    <div className="board-container">
      <div className="board-header">
        <h2>게시글 목록</h2>
        <button className="write-button" onClick={() => navigate(`write`)}>
          ➕ 글쓰기
        </button>
      </div>

      <div className="board-controls">

      {/* 제목, 작성자로 검색 */}
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </select>

      <input type="text" placeholder="검색어를 입력하세요" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
      <button onClick = {() => {setPage(0); fetchBoard()}}> 검색</button>      

      {/* 글을 한 페이지에 몇 개씩 볼 것인지 */}
        <select value={size} onChange={(e) => {setSize(Number(e.target.value)); setPage(0)}}>
          <option value="3">3개씩 보기</option>
          <option value="30">30개씩 보기</option>
        </select>

      </div>

      {/* 정렬 버튼 추가 */}
      <div className="board-sorting">
        <button
          className={sort === "dateDesc" ? "active" : ""}
          onClick={() => { setSort("dateDesc"); setPage(0); }}
        >
          최신순
        </button>
        <button
          className={sort === "dateAsc" ? "active" : ""}
          onClick={() => { setSort("dateAsc"); setPage(0); }}
        >
          오래된순
        </button>
        <button
          className={sort === "viewCount" ? "active" : ""}
          onClick={() => { setSort("viewCount"); setPage(0); }}
        >
          조회수순
        </button>
      </div>

      
      <table className="board-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} onClick={()=>navigate(`/article/${article.id}`)}>
              <td>{article.title}</td>
              <td>{article.user.name}</td>
              <td>{article.views}</td>
              <td>{new Date(article.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => setPage(i)} className={page === i ? "active" : ""} > 
            {i+1} 
          </button>
        ))}

      </div>

    </div>
  )

}

export default BoardPage
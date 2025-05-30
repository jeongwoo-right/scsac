import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/BoardPage.css'
import { useSelector } from "react-redux"
import type { RootState } from "../store"

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
  const [size, setSize] = useState(5) // 몇개씩 볼건지
  const [sort, setSort] = useState("dateDesc") // "created_at" 또는 "views"
  const [condition, setCondition] = useState("title") // title 또는 writer
  const [keyword, setKeyword] = useState("")
  const [tempKeyword, setTempKeyword] = useState(""); // input에 바인딩되는 임시 상태

  const [total_pages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isComposing, setIsComposing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempKeyword(e.target.value)
  }

  const handleCompositionStart = () => {
    setIsComposing(true)
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    setTempKeyword(e.currentTarget.value)
  }

  const fetchBoard = async () => {

    setLoading(true)

    try {
      const res = await api.get(`/category/${categoryId}`, {params: {page, size, sort, condition, keyword}}); // 백엔드에서 게시판 정보 가져오기


      setArticles(res.data.content)
      setTotalPages(res.data.total_pages)


    } 

    catch (err) {
      console.error("게시판에 접속할 수 있는 권한이 없습니다.");
      alert("❌ 게시판에 접속할 수 있는 권한이 없습니다.");
      navigate("/category");
    } 
    
    finally {
      setLoading(false)
    }
  }


  
  // page 상태 등 변경될 때마다 자동 fetch
  useEffect(() => {
    if (!isComposing) {
      fetchBoard()
    }
  }, [id, page, size, sort, condition, keyword])
  
  useEffect(()=> {
    setPage(0)
    setKeyword("")
    setCondition("title")
    setSort("dateDesc")
  }, [categoryId])


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




      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
          if (!isComposing) {
            setPage(0); // 검색 트리거
            setKeyword(tempKeyword); // ✅ 여기서만 실제 keyword 반영
          }
        }}      
      >
        
        {/* 제목, 작성자로 검색 */}
        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
          <option value="title">제목</option>
          <option value="writer">작성자</option>
        </select>

        {/* 검색창 */}
        <input
          ref={inputRef} // ✅ ref 연결
          type="text" 
          placeholder="검색어를 입력하세요" 
          value={tempKeyword} 
          onChange={handleChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <button type="submit"> 검색</button>


      {/* 글을 한 페이지에 몇 개씩 볼 것인지 */}
        <select value={size} onChange={(e) => {setSize(Number(e.target.value)); setPage(0)}}>
          <option value="5">5개씩 보기</option>
          <option value="10">10개씩 보기</option>
        </select>
      </form>
      </div>

      {/* 정렬 버튼 */}
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

      {/* 페이지네이션 UI */}
      <div className="pagination">
        {/* 이전 페이지 버튼 */}
        <button
          className="pagination-button"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          style={{ visibility: page === 0 ? 'hidden' : 'visible' }}
        >
          &lt;
        </button>
        {/* 현재 페이지 / 전체 페이지 */}
        <form
          className="pagination-form"
          onSubmit={(e) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const input = form.elements.namedItem("pageInput") as HTMLInputElement
            const value = parseInt(input.value, 10)

            if (!isNaN(value) && value >= 1 && value <= total_pages)
              setPage(value-1)
            else
              alert(`1부터 ${total_pages} 사이의 숫자를 입력하세요.`)
          }
        }
        >
          <input type="number" name="pageInput" defaultValue={page+1} min={1} max={total_pages} className="pagination-input" />
          <span className="pagination-total"> / {total_pages}</span>

        </form>

        {/* 다음 페이지 버튼 */}
        <button
          className="pagination-button"
          onClick={() => setPage((prev) => Math.min(prev + 1, total_pages - 1))}
          style={{ visibility: page === total_pages - 1 ? 'hidden' : 'visible' }}
        >
          &gt;
        </button>

      </div>

    </div>
  )

}

export default BoardPage
import { useEffect, useState } from "react"
import { replace, useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/ArticleDetailPage.css'
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { FaTrashAlt } from "react-icons/fa"



interface Category {
  id: number
  title: string
}

interface Article {
  id: number
  title: string
  content: string
  created_at: string
  views: number
  user: {
    id: number
    name: string
    generation: number
    affiliate: string
  }
  category: Category
  comments: Comment[]
}

interface Comment {
  id: number
  article_id: number
  content: string
  created_at: string
  user: {
    id: number
    name: string
    affiliate: string
    generation: number
  }
}

function ArticleDetailPage() {
  const {id} = useParams()
  const [article, setArticle] = useState<Article | null>(null) /** 처음에는 (null), 그 이후에는 Article 형태로 */
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/article/${id}`)
        setArticle(res.data)
      }
      
      catch(err){
        alert('❌ 게시글을 불러오는 데 실패했습니다.')
        navigate(-1) /* 뒤로 가기 */
      }
      
    }
    
    fetchArticle()
  }, [id]) /** id가 바뀔 때마다 useEffect가 실행 */



  // 게시글 삭제
  const handleDelete = async () => {
    const confirm = window.confirm("정말 삭제하시겠습니까?")
    if (!confirm) 
      return 

    try {
      await api.delete(`/article/${id}`)
      alert("삭제 완료!")
      navigate(`/category`) // 해당 게시판으로 이동(수정 예정)
    }
    
    catch (err) {
      alert("삭제 실패")
    }
  }
  

  // 댓글 작성
  const handleCommentSubmit = async() => {
    if (!newComment.trim()) {
      alert("댓글을 입력해주세요.")
      return
    }

    try {
      await api.post("/comment", {
        article_id: Number(id), user_id: user.id, content: newComment
      })

      setNewComment("")

      // 전체 게시글 다시 요청 + 댓글 포함
      const res  = await api.get(`article/${id}`)
      setArticle(res.data)
    }

    catch {
      alert("❌ 댓글 작성 실패")
    }
  }


  const handleDeleteComment = async (comment_id: number) => {
    const ok = window.confirm("정말 이 댓글을 삭제하시겠습니까?")
    if (!ok)
      return

    try {
      await api.delete(`comment/${comment_id}`)
      alert("댓글 삭제 완료!")
    
      // 최신 댓글 목록으로 갱신
      const res = await api.get(`/article/${id}`)
      setArticle(res.data)
    }

    catch {
      alert("❌ 댓글 삭제 실패")
    }
  }
  

  if (!article)
    return <div> 로딩 중 ... </div> 


  return (
    <div className = "article-detail">
      {/* ✅ 게시글 섹션 */}
      <h2>{article.title}</h2>
      <div className="article-meta">
        👤 작성자: {article.user.name}({article.user.affiliate}) | 🕒 {article.created_at} | 👁️ {article.views} 조회
      </div>
      <div className="article-content"> {article.content} </div>
      
      <div className="article-buttons">
        <button className="back-button" onClick={() => navigate(`/category/${article.category.id}`, {replace: true})}>← 뒤로가기</button>
        {article.user.id == Number(user.id) && (
          <div className="action-buttons">
            <button className="edit-button" onClick={()=> navigate(`/article/${article.id}/edit`, {replace: true})}>수정</button>
            <button className="delete-button" onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>
      
      {/* ✅ 댓글 섹션 */}
      <div className="comment-section">
        <h3>💬 댓글</h3>
 
        {article.comments.length === 0 ? (
          <p className = "no-comment">아직 댓글이 없습니다.</p>
        ) : (
          <ul className="comment-list">
            {article.comments.map((c) => (
              <li key={c.id} className="comment-item">
                <strong className="comment-author">{c.user.name}({c.user.generation}기, {c.user.affiliate})</strong>: {c.content}
                <span className="comment-time">
                  ({new Date(c.created_at).toLocaleString()})
                </span>
                
                {/* 내가 쓴 댓글이면 삭제 버튼 표시 */}
                {Number(c.user.id) === Number(user.id) && (
                  <FaTrashAlt className="delete-icon" onClick={() => handleDeleteComment(c.id)} />
                )}

              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="comment-form">
        <input type="text" className="comment-input" placeholder="댓글을 입력하세요." value={newComment} onChange={(e)=>setNewComment(e.target.value)}/>
        <button className="comment-submit" onClick={handleCommentSubmit}>등록</button>
      </div>

    </div>
  )
}

export default ArticleDetailPage


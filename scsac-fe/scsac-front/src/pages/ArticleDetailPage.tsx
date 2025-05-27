import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/ArticleDetailPage.css'
import type { RootState } from "../store"
import { useSelector } from "react-redux"


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
}

function ArticleDetailPage() {
  const {id} = useParams()
  const [article, setArticle] = useState<Article | null>(null) /** 처음에는 (null), 그 이후에는 Article 형태로 */
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

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


  if (!article)
    return <div> 로딩 중 ... </div> 


  return (
    <div className = "article-detail">
      <h2>{article.title}</h2>
      <div className="article-meta">
        👤 작성자: {article.user.name}({article.user.affiliate}) | 🕒 {article.created_at} | 👁️ {article.views} 조회
      </div>
      <div className="article-content"> {article.content} </div>
      
      <div className="article-buttons">
        <button className="back-button" onClick={() => navigate(-1)}>← 뒤로가기</button>
        {article.user.id == Number(user.id) && (
          <div className="action-buttons">
            <button className="edit-button" onClick={()=> navigate(`/article/${article.id}/edit`)}>수정</button>
            <button className="delete-button" onClick={handleDelete}>삭제</button>
          </div>
        )}
      </div>

    </div>
  )
}

export default ArticleDetailPage


import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/ArticleDetailPage.css'


interface Article {
  id: number
  title: string
  content: string
  createdAt: string
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

  if (!article)
    return <div> 로딩 중 ... </div> 

  return (
    <div className = "article-detail">
      <h2>{article.title}</h2>
      <div className="article-meta">
        👤 작성자: {article.user.name}({article.user.affiliate}) | 🕒 {article.createdAt} | 👁️ {article.views} 조회
      </div>
      <div className="article-content"> {article.content} </div>
      <button onClick={() => navigate(-1)}>← 뒤로가기</button>

    </div>
  )
}

export default ArticleDetailPage


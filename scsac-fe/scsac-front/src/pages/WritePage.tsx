import { useState } from "react"
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import '../components/WritePage.css'


function WritePage() {
  const {id} = useParams() // category id 가져오기
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용 모두 입력해주세요.")
      return
    }

    try {
      const res = await api.post('/article', {
        title,
        content,
        category_id: Number(id),
        user_id: user.id,
      })
      
      const articleId = res.data.id

      alert("✅ 게시글이 등록되었습니다.")
      // navigate(`/category/${id}`) /** 경로, detail로 이동하도록 변경하기 */
      navigate(`/article/${articleId}`)
    } 
    
    catch(err) {
      alert("게시글 작성 실패")
    }

  }

  return (
    <div className ="write-page">
      <h2>✍️ 게시글 작성</h2>
      <input 
        type="text"
        placeholder="제목을 입력하세요" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea 
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="write-buttons">
          <button onClick={handleSubmit}>작성</button>
          <button onClick={() => navigate(-1)}>취소</button> {/* 뒤로 가기 */}
        </div>
    </div>
  )
}

export default WritePage
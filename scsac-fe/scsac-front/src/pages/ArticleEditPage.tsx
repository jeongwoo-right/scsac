

// 게시글 수정 페이지

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function ArticleEditPage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category_id, setCategoryId] = useState(-1)

  // 1. 기존 글 정보 불러오기
  useEffect(() => {
    const fetchArticle = async () => {
      const res = await api.get(`/article/${id}`)
      setTitle(res.data.title)
      setContent(res.data.content)
      setCategoryId(res.data.category.id)
    }


    fetchArticle() 
  }, [id])

  // 2. PUT 요청으로 수정 전송
  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.")
      return
    }

    try {
      await api.put(`/article/${id}`, {title, content, category_id}) // 카테고리 아이디 추가
      alert("✅ 게시글이 수정되었습니다.")
      navigate(`/article/${id}`)
    } catch(err) {
      alert("❌ 수정 실패")
    }
  }

  return (
    <div className="edit-page">
      <h2>✏ 게시글 수정</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <textarea value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
      <div className="edit-buttons">
        <button onClick={handleUpdate}>수정</button>
        <button onClick={() => navigate(-1)}>취소</button>
      </div>
    </div>
  )


}
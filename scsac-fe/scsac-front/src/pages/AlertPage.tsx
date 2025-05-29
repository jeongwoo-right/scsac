// 📁 src/pages/AlertPage.tsx

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store'
import api from '../api/axios'
import '../components/AlertPage.css'
import { markAlertAsRead, setAlerts } from '../store/alertSlice'

function AlertPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.user.id)
  const alerts = useSelector((state: RootState) => state.alert.alerts)

  useEffect(() => {
    
    const fetchAlerts = async () => {
      try {
        const res = await api.get(`/alert?id=${userId}`)
        dispatch(setAlerts(res.data))
      } catch (err) {
        console.error("알림 조회 실패", err)
      }
    }
    
    if (userId) fetchAlerts()
    }, [userId, dispatch])
  
  const sortedAlerts = [...alerts].sort((a, b) => {
    const timeA = new Date(a.recieve_comment?.created_at ?? 0).getTime()
    const timeB = new Date(b.recieve_comment?.created_at ?? 0).getTime()
    return timeB - timeA
  })
  
  
  const checkAlert = async (alertId: number, articleId: number) => {
    try {
      await api.put(`/alert/${alertId}`)
      dispatch(markAlertAsRead(alertId))
      navigate(`/article/${articleId}`)
    } catch (err) {
      console.error("알림 확인 실패", err)
    }
  }
  
  return (
    <div className="alert-page">
      <h2>받은 알림</h2>
      <div className="alert-list">
        {sortedAlerts.length === 0 ? (
          <div className="no-alert">알림이 없습니다.</div>
        ) : (
          sortedAlerts.map((alert) => (
            <div key={alert.id} className={`alert-card ${alert.checked === 0 ? 'new' : ''}`}>
              <div className="alert-content"  onClick={() => checkAlert(alert.id!, alert.article.id)}>
                {alert.type === 'comment' ? (
                  <div>
                    <strong>{alert.send_user.name}</strong>님이 회원님의 글
                    <strong> [{alert.article.title}]</strong>에 댓글을 달았습니다.
                  </div>
                ) : (
                  <div>
                    <strong>{alert.send_user.name}</strong>님이
                    <strong> [{alert.article.title}]</strong>의 댓글에서 회원님을 언급했습니다.
                  </div>
                )}
                <div className="alert-time">{new Date(alert.recieve_comment.created_at).toLocaleString()}</div>
              </div>
              {alert.checked === 0 && <span className="new-badge">NEW</span>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AlertPage

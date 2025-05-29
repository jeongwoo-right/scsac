import React from "react"
import "./AlertDropdown.css"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { markAlertAsRead } from "../store/alertSlice"

const AlertDropdown: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const alerts = useSelector((state: RootState) => state.alert.alerts)
  const uncheckedAlerts = alerts.filter(alert => alert.checked === 0)

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
    <div className="alert-dropdown">
      {uncheckedAlerts.length > 0 ? (
        uncheckedAlerts.map((alert) => (
          <div key={alert.id} className="alert-item" onClick={() => checkAlert(alert.id!, alert.article.id)}>
            {alert.type === 'comment' &&
              <div>{alert.send_user.name}님이 게시글 [{alert.article.title}]에 댓글을 달았습니다.</div>}
            {alert.type === 'mention' &&
              <div>{alert.send_user.name}님이 게시글 [{alert.article.title}]에서 회원님을 언급했습니다.</div>}
          </div>
        ))
      ) : (
        <div className="alert-item">알림이 없습니다.</div>
      )}
    </div>
  )
}

export default AlertDropdown
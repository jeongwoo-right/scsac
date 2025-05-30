// 📁 src/pages/MainPage.tsx
import React, { useEffect, useState } from "react";
import "../components/MainPage.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { markAlertAsRead, type Alert } from "../store/alertSlice";

function MainPage() {
  const user = useSelector((state: RootState) => state.user);
  const alerts = useSelector((state:RootState)=>state.alert.alerts)
  const [myStats, setMyStats] = useState({ articles: 0, comments: 0 });
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const checkAlert = async (alertId: number, articleId: number) => {
    try {
      await api.put(`/alert/${alertId}`)
      dispatch(markAlertAsRead(alertId))
      navigate(`/article/${articleId}`)
    } catch (err) {
      console.error("알림 확인 실패", err)
    }
  }

  useEffect(() => {
    const fetchMyStats = async () => {
      try {
        const newMyState = {articles:0, comments:0}
        const articles = await api.get(`article/user?id=${user.id}`);
        const comments = await api.get(`comment/user?id=${user.id}`);
        newMyState.articles=articles.data.length
        newMyState.comments=comments.data.length

        setMyStats(newMyState);
      } catch (err) {
        console.error("요약 정보 불러오기 실패", err);
      }
    };

    const recent = [...alerts] // 배열 복사
    .sort((a, b) => new Date(b.recieve_comment.created_at).getTime() - new Date(a.recieve_comment.created_at).getTime())
    .slice(0, 5);
  
  setRecentAlerts(recent);

    if (user.id) {
      fetchMyStats();
    }
  }, [user, alerts]);



  return (
    <div className="main-container">
      <h2 className="welcome">👋 {user.name}님, 환영합니다!</h2>

      <div className="stats-box">
        <div className="stat-item">
          <h3>📝 작성한 게시글</h3>
          <p>{myStats.articles}개</p>
        </div>
        <div className="stat-item">
          <h3>💬 작성한 댓글</h3>
          <p>{myStats.comments}개</p>
        </div>
      </div>

      <div className="alert-box">
        <h3>🔔 최근 알림</h3>
        {recentAlerts.length === 0 ? (
          <p>최근 알림이 없습니다.</p>
        ) : (
          <ul className="alert-preview-list">
            {recentAlerts.map((alert: any) => (
              <li
                key={alert.id}
                className={`alert-preview-item ${alert.checked === 0 ? "new" : ""}`}
                onClick={() => checkAlert(alert.id, alert.article.id)}
              >
                {alert.type === "comment" ? (
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
                <div className="alert-preview-time">
                  {new Date(alert.recieve_comment.created_at).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>

        )}
      </div>
    </div>
  );
}

export default MainPage;

// 📁 src/pages/MainPage.tsx
import React, { useEffect, useState } from "react";
import "../components/MainPage.css";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function MainPage() {
  const user = useSelector((state: RootState) => state.user);
  const [myStats, setMyStats] = useState({ articles: 0, comments: 0 });
  const [recentAlerts, setRecentAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyStats = async () => {
      try {
        const res = await api.get(`/user/${user.id}/summary`);
        setMyStats(res.data);
      } catch (err) {
        console.error("요약 정보 불러오기 실패", err);
      }
    };

    const fetchAlerts = async () => {
      try {
        const res = await api.get(`/alert?id=${user.id}`);
        setRecentAlerts(res.data.slice(0, 5));
        console.log(res.data)
      } catch (err) {
        console.error("알림 불러오기 실패", err);
      }
    };

    if (user.id) {
      fetchMyStats();
      fetchAlerts();
    }
  }, [user]);

  const handleAlertClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

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
                onClick={() => handleAlertClick(alert.article.id)}
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

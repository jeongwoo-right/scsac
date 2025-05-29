import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
// 사용자 정보
interface User {
  id: string;
  authority: string;
  generation: number;
  affiliate: string;
  name: string;
  nickname: string;
  boj_id: string | null;
}

// 댓글 정보
interface Comment {
  id: number;
  article_id: number;
  content: string;
  created_at: string;
  user: User;
}

// 게시글 카테고리
interface Category {
  id: number;
  title: string;
  authority: string;
}

// 게시글 정보
interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  views: number;
  is_updated: number;
  category: Category;
  user: User;
  comments: Comment[];

}
interface Alert {
  id: number | null;
  type: 'comment' | 'mention';
  send_user: User;
  receive_user: User;
  article: Article;
  recieve_comment: Comment;
  checked: number;
}

interface AlertState {
  alerts: Alert[]
}

const initialState: AlertState = {
  alerts: []
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlerts(state, action: PayloadAction<Alert[]>) {
			state.alerts = action.payload
			console.log(state.alerts)
    },
    markAlertAsRead(state, action: PayloadAction<number>) {
      const target = state.alerts.find(a => a.id === action.payload)
      if (target) target.checked = 1
    },
    clearAlerts(state) {
      state.alerts = []
    }
  }
})



export const { setAlerts, markAlertAsRead, clearAlerts } = alertSlice.actions
export default alertSlice.reducer;

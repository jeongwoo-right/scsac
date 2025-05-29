import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import alertReducer from './alertSlice'

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    user: userReducer, // user 상태를 userSlice로 관리
    alert: alertReducer,
  },
})

// 타입 자동 추론 (useSelector, useDispatch에서 사용)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
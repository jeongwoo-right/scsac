import { createSlice } from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export type UserState = {
  isLoggedIn: boolean
  isProfileComplete: boolean
  id: string
  password: string
  authority: string
  generation: number
  affiliate: string | null
  name: string | null
  nickname: string | null
  boj_id: string | null
  
}

// 초기 상태
const initialState: UserState = {
  isLoggedIn: false,
  isProfileComplete: false,
  id: '0',
  password: '',
  authority: "ROLE_Student",
  generation: 0,
  affiliate: null,
  name: null,
  nickname: null,
  boj_id: null,
}

// ✅ Payload에는 isLoggedIn을 제외한 나머지 정보만 받도록
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action: PayloadAction<Omit<UserState, 'isLoggedIn' | 'isProfileComplete'>>) => {
      const payload = action.payload
      const isProfileComplete = !!(payload.name && payload.nickname && payload.affiliate)
      return {
        isLoggedIn: true,
        isProfileComplete,
        ...payload,
      }
    },


    logout: () => {
      localStorage.removeItem('jwt');
      return { ...initialState }
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
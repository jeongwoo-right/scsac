import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '../store'
import type { JSX } from 'react'

function PrivateRouteBypassProfileCheck({ children }: { children: JSX.Element }) {
  const user = useSelector((state: RootState) => state.user)
  console.log("PrivateRouteBypassProfileCheck로 들어왔습니다.")
  const isLoggedIn = !!user.id

  return isLoggedIn ? children : <Navigate to="/" replace />
}

export default PrivateRouteBypassProfileCheck

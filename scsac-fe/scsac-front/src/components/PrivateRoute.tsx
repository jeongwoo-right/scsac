import type { RootState } from "../store";
import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


// 비로그인 접속 시, 로그인 페이지로 경로 redirect 

function PrivateRoute({children}: {children: JSX.Element}) {
  // useSelector: Redux store 안의 상태 확인 (로그인 상태 확인)
  const user = useSelector((state: RootState) => state.user)
  const location = useLocation()

  const isLoggedIn = user.isLoggedIn

  // 조건 검사 후 redirect (Navigate: redirect 역할) 
  if (!isLoggedIn) {
    alert("로그인 후 이용하세요.")
    return <Navigate to="/" replace /> // replace: 기록을 덮어씀(뒤로가기해도 다시 그 페이지로 못 돌아감)
  } 
  
  if (!user.isProfileComplete && location.pathname !== '/editProfile') {
    console.log("회원 정보 업데이트 필요")
    alert("회원 정보 업데이트가 필요합니다.")
    return <Navigate to="/editProfile" replace />
  }

  return children // 로그인되어 있는 경우
}

export default PrivateRoute
import { useEffect, useState, type JSX } from "react"
import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

const RedirectIfLoggedInRoute = ({children}: {children: JSX.Element}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // console.log(isLoggedIn  + location.pathname)
    // console.log(isLoggedIn && location.pathname === "/" )
    if (isLoggedIn && location.pathname === "/" ) {
      alert("이미 로그인되어 있습니다")
      navigate("/category") // 내부에서 온 경우 → 이전 페이지로
    }

  }, [isLoggedIn, location])

  if (isLoggedIn) {
    return null
  } else {
    return children
  }
}

export default RedirectIfLoggedInRoute
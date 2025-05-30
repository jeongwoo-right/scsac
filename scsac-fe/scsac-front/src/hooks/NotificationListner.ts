import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import type { RootState } from "../store";
import { setAlerts } from "../store/alertSlice";

function NotificationListner(){
  const eventSourceRef = useRef<EventSource | null>(null)
  const dispatch = useDispatch()
  const userId = useSelector((state:RootState) => state.user.id)
  const alerts = useSelector((state:RootState)=>state.alert.alerts)
  
  
  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    
    if(!token) return

    const eventSource = new EventSource(`http://localhost:8080/sse?token=${token}`)
    const fetchAlerts = async () => {
      try {
        const res = await api.get(`/alert?id=${userId}`)
        dispatch(setAlerts(res.data));
      } catch (err) {
        console.error("알림 조회 실패", err)
      }
    }

    eventSource.onmessage = (event) => {
      console.log('recieve')
      fetchAlerts()
    }

    eventSource.onerror = (error) => {
      console.error("SSE 연결 오류:", error)
      eventSource.close()
    }

    eventSourceRef.current = eventSource

    return () => {
      eventSourceRef.current?.close()
    }
  }, [dispatch, userId])

  return null
}

export default NotificationListner;
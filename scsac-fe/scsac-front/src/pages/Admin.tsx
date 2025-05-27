import { useState } from 'react'
import api from '../api/axios'
import '../components/LoginPage.css'
import { useNavigate } from 'react-router-dom'
import '../components/AdminPage.css'
import { FaUserPlus, FaUserShield } from "react-icons/fa";

function Admin() {
  const navigate = useNavigate();
  const [generation, setGeneration] = useState<''|number>('');
  const [num, setNum] = useState<''|number>('');
  const [password, setPassword] = useState('');

  const addUser = async () => {
    if(!generation|| !num || !password.trim()){
      alert("정보를 정확히 입력하세요.")
    }

    const check = confirm(`${generation}기 회원 ${num}명을 초기비밀번호 ${password}로 생성하시겠습니까?`);
    if (check) {
      try {
        await api.post('/user', { generation, num, password });
        alert("사용자 생성 성공")
        navigate('/admin');
      } catch {
        alert("사용자 생성 실패");
      }
    }
  };
  
  const changeAuthority = async () => {

    const check = confirm(`모든 회원의 권한을 변경하시겠습니까?`);
    if (check) {
      try {
        await api.put('/user/admin');
        alert("권한 변경 성공")
        navigate('/admin');
      } catch {
        alert("권한 변경 실패");
      }
    }
  };

  return (
    <div className="admin-page">
      <h2>관리자 페이지</h2>

      <div className="admin-grid">

          <div className="admin-section">
          <h4><FaUserPlus style={{ marginRight: '8px' }} />회원 생성하기</h4>
          <form>
              <label htmlFor="generation">기수</label>
              <input type="number" value={generation} id="generation" onChange={(e) => setGeneration(Number(e.target.value))}/>
              <label htmlFor="num">인원</label>
              <input type="number" value={num} id="num" onChange={(e) => setNum(Number(e.target.value))}/>
              <label htmlFor="password">초기비밀번호</label>
              <input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)}/>
              <input type="button" value="생성" onClick={addUser} />
            </form>
          </div>

        <div className="admin-section">
          <h4><FaUserShield style={{ marginRight: '8px' }} />권한 변경하기</h4>
          <p className="admin-description">
            모든 회원의 권한을 일괄 변경합니다.
          </p>
          <button onClick={changeAuthority} className="full-height">변경하기</button>
        </div>
      </div>

    </div>
  );
}

export default Admin;

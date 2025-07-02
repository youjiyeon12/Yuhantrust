import { useState } from 'react';

//* req : 클라이언트가 보낸 요청 데이터
//* res : 서버가 클라이언트에게 응답

function Login({ onLogin, onSwitch }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      alert('아이디와 비밀번호를 입력하세요');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert('로그인 성공!');
        onLogin({ id }); // 로그인 상태 저장
      } else {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인</h2>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="아이디"
      /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      /><br />
      <button type="submit">로그인</button>
      <p>
        회원이 아니신가요?{' '}
        <button type="button" onClick={onSwitch}>회원가입</button>
      </p>
    </form>
  );
}

export default Login;

import { useState } from 'react';

function Signup({ onRegister, onSwitch }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [gradeSystem, setGradeSystem] = useState('2');
  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password || !name || !studentID || !isIdChecked) {
      alert('모든 항목을 입력하고 아이디 중복 확인을 해주세요.');
      return;
    }

    // 서버에 회원가입 정보 전송
    try {
      const res = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password, name, studentID, gradeSystem }),
      });

      const data = await res.json();
      if (data.success) {
        alert('회원가입 성공!');
        onRegister({ id, name }); // 로그인 상태로 전환
      } else {
        alert('회원가입 실패!');
      }
    } catch (err) {
      alert('회원가입 중 오류 발생');
      console.error(err);
    }
  };

  const checkSignupId = async () => {
    try {
      const res = await fetch('http://localhost:3001/check-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.exists) {
        alert('이미 사용 중인 아이디입니다.');
        setIsIdChecked(false);
      } else {
        alert('사용 가능한 아이디입니다!');
        setIsIdChecked(true);
      }
    } catch (err) {
      alert('중복 확인 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <div>
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            setIsIdChecked(false); // 입력 바뀌면 다시 확인 필요
          }}
          placeholder="아이디"
        /><br />
        <button type="button" onClick={checkSignupId}>중복 확인</button>
      </div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      /><br />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      /><br />
      <input
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        placeholder="학번"
      /><br />
      <div>
        <label>
          <input
            type="radio"
            value="2"
            checked={gradeSystem === '2'}
            onChange={() => setGradeSystem('2')}
          />
          2학년제
        </label>
        <label>
          <input
            type="radio"
            value="3"
            checked={gradeSystem === '3'}
            onChange={() => setGradeSystem('3')}
          />
          3학년제
        </label>
      </div>

      <button type="submit">회원가입</button>
      <p>
        이미 계정이 있으신가요?{' '}
        <button type="button" onClick={onSwitch}>로그인</button>
      </p>
    </form>
  );
}

export default Signup;

import express from 'express'; // Node.js웹 서버 프레임워크 
import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv';
import fs from 'fs';
import cors from 'cors'; // React 개발 서버에서 Node.js 서버 요청 보낼 때 필요.


dotenv.config(); // .env에서 환경변수 읽음
const app = express(); // Express 앱 생성
app.use(cors()); // 모든 CORS 요청 허용
app.use(express.json()); // JSON 파싱 미들웨어

// credentials.json 직접 읽기
const credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf-8'));

const doc = new GoogleSpreadsheet('13QT8_OnNJ0FZaPkpx0_yMHz-v8ERg14lf9CXB_7bFzA'); // 구글 시트 ID
await doc.useServiceAccountAuth(credentials); // 서비스 계정으로 인증
await doc.loadInfo(); // 시트 정보 로딩
const sheet = doc.sheetsByTitle['users']; // users 시트 연결

// 아이디 중복확인 API
app.post('/check-id', async (req, res) => {
  const { id } = req.body;
  await sheet.loadCells(); // 전체 시트 로드
  const rows = await sheet.getRows();
  const exists = rows.some(row => row.아이디 === id);
  res.json({ exists }); // true/false로 반환
});

// 회원가입 저장 API
app.post('/signup', async (req, res) => {
  const { id, password, name, studentID, gradeSystem } = req.body;
  await sheet.addRow({ 아이디: id, 비밀번호: password, 이름: name, 학번: studentID, 학년제: gradeSystem });
  res.json({ success: true });
});

app.listen(3001, () => console.log('서버 실행 중: http://localhost:3001'));

// 로그인 검증 API
app.post('/login', async (req, res) => {
  const { id, password } = req.body;
  const rows = await sheet.getRows();
  const user = rows.find(row => row.아이디 === id && row.비밀번호 === password);
  if (user) {
    res.json({ success: true, name: user.이름 });
  } else {
    res.json({ success: false });
  }
});

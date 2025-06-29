import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      {user ? (
        <h2>환영합니다, {user.id}님!</h2>
      ) : isRegistering ? (
        <Signup onRegister={setUser} onSwitch={() => setIsRegistering(false)} />
      ) : (
        <Login onLogin={setUser} onSwitch={() => setIsRegistering(true)} />
      )}
    </div>
  );
}

export default App;
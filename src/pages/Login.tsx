import { googleLogin } from "../lib/firebase";
import { useCharm } from "../CharmContext";
import './login.css';

export default function Login() {
  const { state } = useCharm();

  return (
    <div className="login-container">
      {Object.keys(state.mastered).length ? (
        <p>You’re logged in — go to Home.</p>
      ) : (
        <button onClick={googleLogin} className="google-login-button">
          Sign in with Google
        </button>
      )}
    </div>
  );
}

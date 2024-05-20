import { useContext, useState } from 'react';
import { loginUser } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function LoginForm() {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(userCredentials);

      if (response.success) setUser(response.data);
    } catch (err) {
      // todo: Implement error notification instead of redirection on login fail
      console.log(err);
      navigate('/register', { replace: true });
    }
  };

  return (
    <div className="login-form__container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          name="username"
          value={userCredentials.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
          required
        />
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        Don&apos;t have an account yet? <Link to="/register">Register!</Link>
      </p>
    </div>
  );
}

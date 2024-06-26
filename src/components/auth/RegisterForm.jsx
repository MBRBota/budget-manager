import { useState } from 'react';
import { registerUser } from '../../services/auth.service';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [userCredentials, setUserCredentials] = useState({ username: '', password: '' });
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
      // todo: Implement username, password string verifications
      const response = await registerUser(userCredentials);

      if (response.success) navigate('/login', { replace: true });
    } catch (err) {
      // todo: Implement error notification, input field highlighting
      console.log(err);
    }
  };

  return (
    <div className="register-form__container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        Already have an account? <Link to="/login">Log in!</Link>
      </p>
    </div>
  );
}

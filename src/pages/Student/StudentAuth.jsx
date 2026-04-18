import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

// Wrapper to pass hooks to class component
export function withRouterAndAuth(Child) {
  return function(props) {
    const navigate = useNavigate();
    const auth = React.useContext(AuthContext);
    return <Child {...props} navigate={navigate} auth={auth} />;
  }
}

class StudentAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  validate = () => {
    let newErrors = {};
    const { email, password, confirmPassword, isLogin } = this.state;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    this.setState({ errors: newErrors });
    return Object.keys(newErrors).length === 0;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      this.props.auth.login('student', { email: this.state.email });
      this.props.navigate('/student/dashboard');
    }
  }

  toggleAuth = () => {
    this.setState(prevState => ({
      isLogin: !prevState.isLogin,
      errors: {},
      email: '',
      password: '',
      confirmPassword: ''
    }));
  }

  render() {
    const { isLogin, email, password, confirmPassword, errors } = this.state;

    return (
      <div className="portal-wrapper">
        <div className="auth-form">
          <h2>Student {isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="text" 
                name="email" 
                value={email} 
                onChange={this.handleChange} 
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={password} 
                onChange={this.handleChange} 
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={confirmPassword} 
                  onChange={this.handleChange} 
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            <button type="submit" className="btn-primary">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="toggle-auth">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={this.toggleAuth}>
              {isLogin ? 'Sign up here' : 'Login here'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouterAndAuth(StudentAuth);

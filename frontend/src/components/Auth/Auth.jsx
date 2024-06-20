import React, { useState } from 'react';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return isLogin ? (
    <LoginScreen switchToSignup={switchToSignup} />
  ) : (
    <SignupScreen switchToLogin={switchToLogin} />
  );
};

export default Auth;

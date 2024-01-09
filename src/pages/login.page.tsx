import React, { useState } from 'react';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputGroup } from 'react-bootstrap';
import './styles/form.css';
import { AxiosError } from 'axios';
import { ServerException } from '../api/exceptions/ServerException';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type FormData = {
  email: string;
  password: string;
};

export const LogInPage = () => {
  const [ serverError, setServerError ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ rememberMe, setRememberMe ] = useState(true);
  const { login } = useAuth();

  const navigation = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email({ message: 'Invalid email. E.g. johnDoe@example.com' }),
      password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
    });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });  

  const submitData = async (data: FormData) => {
    const response = await login(data, rememberMe).catch(async (err: AxiosError<ServerException>) => {
      setServerError(err.response?.data.message ?? '');
    });
    
    if (!response) return;

    setServerError('');
    navigation('/');
  };

  return (
    <div className='form-page'>
      <form className='form-block' onSubmit={handleSubmit(submitData)}>
        <header className='header'>
          <h3>Log In</h3>
        </header>

        <InputGroup className='form-item-block'>
          <div className='input-block'>
            <i className="fa-light fa-envelope fa-lg left-icon"></i>
            <input 
              type='text' 
              placeholder='Email' 
              {...register('email')}
              className='form-input'
            />
          </div>
          {errors.email && 
          <span className='errmsg'>
            <i className="fa-light fa-circle-info error-icon">
              <span>{' ' + errors.email.message}</span>
            </i>
          </span>}
        </InputGroup>

        <InputGroup className='form-item-block'>
          <div className='input-block'>
            <i className="fa-light fa-lock fa-lg left-icon"></i>
            <input type={showPassword ? 'text' : 'password'}
              placeholder='Password' 
              {...register('password')}
              className='form-input'  
            />
            <i onClick={togglePassword} 
              className={
                showPassword ? 'fa-light fa-eye fa-lg show-password-icon' 
                  : 'fa-light fa-eye-slash fa-lg show-password-icon'
              }/>
          </div>
          {errors.password && 
          <span className='errmsg'>
            <i className="fa-light fa-circle-info error-icon">
              <span>{' ' + errors.password.message}</span>
            </i>
          </span>}
        </InputGroup>
        
        <InputGroup className='form-item-block forgot-password'>
          <a href='#' className='form-link'>Forgot password?</a>
        </InputGroup>

        <InputGroup className='form-item-block submit-block'>
          <button type='submit' className='submit-btn'>Log In</button>
          <p className='serverErrorMsg'>{serverError}</p>
        </InputGroup>

        <InputGroup className='form-item-block remember-me'>
          <label><input type='checkbox' onClick={() => setRememberMe(!rememberMe)} checked={rememberMe}/> Remember me</label>
        </InputGroup>

        <InputGroup className='form-item-block alrady-have'>
          <p>Don&apos;t have an account? <Link to='/auth/register' className='form-link'>Register here</Link></p>
        </InputGroup>
      </form>
    </div>
  );
};

export default LogInPage;

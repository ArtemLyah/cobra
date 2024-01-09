import React, { useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './styles/form.css';
import { AxiosError } from 'axios';
import { ServerException } from '../api/exceptions/ServerException';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegistrationPage = () => {
  const [ serverError, setServerError ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ rememberMe, setRememberMe ] = useState(true);
  const { signup } = useAuth();

  const navigation = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const schema: ZodType<FormData> = z
    .object({
      username: z.string()
        .min(3, { message: 'Username must contain at least 3 characters' })
        .max(20, { message: 'Username must be maximum 20 characters' }),
      email: z.string().email({ message: 'Invalid email. E.g. johnDoe@example.com' }),
      password: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
      confirmPassword: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: [ 'confirmPassword' ],
    });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });  

  const submitData = async (data: FormData) => {
    const response = await signup(data, rememberMe).catch((error: AxiosError<ServerException>) => {
      setServerError(error.response?.data.message ?? '');
    });

    if (!response) return;
    
    setServerError('');
    navigation('/');
  };

  return (
    <Container className='form-page'>
      <Form autoComplete='off' className='form-block' onSubmit={handleSubmit(submitData)}>
        <header className='header'>
          <h3>Sign up</h3>
        </header>

        <InputGroup className='form-item-block'>
          <div className='input-block'>
            <i className="fa-light fa-user left-icon"></i>
            <input type="input" placeholder="Username" className='form-input' {...register('username')} />
          </div>
          {
            errors.username && 
            <div className='errmsg'>
              <i className="fa-regular fa-circle-exclamation error-icon">
                <span>{' ' + errors.username.message}</span>
              </i>
            </div>
          }
        </InputGroup> 
        
        <InputGroup className='form-item-block'>
          <div className='input-block'>
            <i className="fa-light fa-envelope left-icon"></i>
            <input type="text" placeholder="Email" className='form-input' {...register('email')} />
          </div>
          {
            errors.email && 
            <div className='errmsg'>
              <i className="fa-regular fa-circle-exclamation error-icon">
                <span>{' ' + errors.email.message}</span>
              </i>
            </div>
          }
        </InputGroup>

        <InputGroup className='form-item-block password'>
          <div className='input-block'>
            <i className="fa-light fa-lock left-icon"></i>
            <input 
              type={ showPassword ? 'text' : 'password' } 
              placeholder="Password" 
              className='form-input' {...register('password')} 
            />
            <i onClick={toggleShowPassword} className={
              showPassword ? 'fa-light fa-eye show-password-icon'
                : 'fa-light fa-eye-slash show-password-icon'
            }></i>
          </div>
          {
            errors.password && 
            <div className='errmsg'>
              <i className="fa-regular fa-circle-exclamation error-icon">
                <span>{' ' + errors.password.message}</span>
              </i>
            </div>
          }
        </InputGroup>
     
        <InputGroup className='form-item-block repeat-password'>
          <div className='input-block'>
            <i className="fa-light fa-lock left-icon"></i>
            <input 
              type={ showPassword ? 'text' : 'password' } 
              placeholder="Repeat password" 
              className='form-input' {...register('confirmPassword')} 
            />
          </div>
          {
            errors.confirmPassword && 
            <div className='errmsg'>
              <i className="fa-regular fa-circle-exclamation error-icon">
                <span>{' ' + errors.confirmPassword.message}</span>
              </i>
            </div>
          }
        </InputGroup>

        <InputGroup className='form-item-block submit-block'>
          <button type='submit' className='submit-btn'>Submit</button>
          <p className='serverErrorMsg'>{serverError}</p>
        </InputGroup>

        <InputGroup className='form-item-block remember-me'>
          <label><input type='checkbox' onClick={() => setRememberMe(!rememberMe)} checked={rememberMe}/> Remember me</label>
        </InputGroup>

        <InputGroup className='form-item-block already-have'>
          <p>If you already have an account <Link to='/auth/login' className='form-link'>log in</Link></p>
        </InputGroup>
      </Form>
    </Container>
  );
};
 
export default RegistrationPage;
import React, { useEffect, useState } from 'react';
import { Col, Button, CardBody, FormGroup, FormLabel, Image } from 'react-bootstrap';
import { userService } from '../../../../api/services/users.service';
import { User } from '../../../../api/types/user.type';
import { useAuth } from '../../../../hooks/useAuth';
import useCookie from '../../../../hooks/useCookie';

import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ServerException } from '../../../../api/exceptions/ServerException';
import { authService } from '../../../../api/services/auth.service';

type FormData = {
  avatar?: string;
  username?: string;
  email?: string;
};

export const ProfileCard = () => {
  const { auth, setAuth } = useAuth();
  const [ username, setUsername ] = useState('');
  const [ avatar, setAvatar ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ serverError, setServerError ] = useState('');
  const [ user, setUser ] = useState<User>(new User());
  const { token, setItem } = useCookie();

  const updateUser = async () => {
    const newUser = {
      ...user,
      avatar,
      username,
      email,
    };
    
    if (!auth) return;

    const response = await userService.update(token, newUser).catch((err: AxiosError<ServerException>) => {
      setServerError(err.response?.data.message ?? '');
    });

    const newToken = await authService.updateToken(token).catch((err: AxiosError<ServerException>) => {
      setServerError(err.response?.data.message ?? '');
    });

    if (!response) return;
    if (!newToken) return;

    setServerError('');
    setUser(newUser);

    setItem('token', newToken.access_token);
    setAuth({
      username,
      avatar,
      userId: auth.userId,
    });
  };

  useEffect(() => {
    const setDefaultUser = async () => {
      if (!auth) return;
      const userResponse = await userService.get(token);
      setUser(userResponse);
      setUsername(userResponse.username);
      setEmail(userResponse.email);
      setAvatar(userResponse.avatar);
    };
    setDefaultUser();
  }, []);

  const schema: ZodType<FormData> = z
    .object({
      username: z.string().default(user.username),
      email: z
        .string()
        .email({ message: 'Invalid email. E.g. johnDoe@example.com' })
        .default(user.email),
      avatar: z.string().url({
        message: 'Link to the image is invalid',
      }).default(user.avatar),
    });

  const { 
    handleSubmit, 
    setValue,
    formState: { errors }, 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });

  return (
    <CardBody className="user-page-card-general">
      <h3>Public Profile</h3>
      <hr />
      <div className="user-page-grid user-page__tab__general-settings">
        <form onSubmit={handleSubmit(updateUser)}>
          <FormGroup className='form-group'>
            <Image 
              src={ avatar }
              alt='user avatar'
              width={80}
              height={80}
              roundedCircle
              className='user-avatar'
            />
            <FormLabel>Set avatar</FormLabel>
            <div className='input-block'>
              <input 
                type='text'
                className='form-input'
                value={avatar}
                onChange={(event) => {
                  setAvatar(event.target.value);
                  setValue('avatar', event.target.value);
                }}
              />
            </div>
            {
              errors.avatar && 
              <span className='errmsg' style={{
                padding: '0',
              }}>
                <span>{' ' + errors.avatar?.message ?? serverError}</span>
              </span>
            }
          </FormGroup>
          <FormGroup className='form-group'>
            <FormLabel>Username</FormLabel>
            <div className='input-block'>
              <input 
                type='text'
                value={ username }
                className='form-input'
                onChange={(event) => {
                  setUsername(event.target.value);
                  setValue('username', event.target.value);
                }}
              />
            </div>
          </FormGroup>
          <FormGroup className='form-group'>
            <FormLabel>Email</FormLabel>
            <div className='input-block'>
              <input 
                type='text'
                value={ email }
                className='form-input'
                onChange={(event) => {
                  setEmail(event.target.value);
                  setValue('email', event.target.value);
                }}
              />
            </div>
            {
              errors.email && 
              <span className='errmsg' style={{
                padding: '0',
              }}>
                <span>{' ' + errors.email?.message ?? serverError}</span>
              </span>
            }
          </FormGroup>

          <Col className="mt-3 user-page__confirmation-btn-container">
            <Button type='submit' className="btn save">Save Changes</Button>
            <Button 
              className="btn cancel" 
              onClick={() => {
                setUsername(user.username);
                setEmail(user.email);
                setAvatar(user.avatar);
                setValue('username', user.username);
                setValue('email', user.email);
                setValue('avatar', user.avatar);
              }}
            >Cancel</Button>
          </Col>
        </form >
      </div>
    </CardBody>
  );
};



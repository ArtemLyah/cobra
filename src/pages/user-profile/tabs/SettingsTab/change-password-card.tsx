import React, { useState } from 'react';
import { Button, CardBody, FormGroup, FormLabel, Col } from 'react-bootstrap';
import { userService } from '../../../../api/services/users.service';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ServerException } from '../../../../api/exceptions/ServerException';
import { AxiosError } from 'axios';
import useCookie from '../../../../hooks/useCookie';
import { useAuth } from '../../../../hooks/useAuth';

type FormData = {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
};

export const ChangePasswordCard = () => {

  const [ serverError, setServerError ] = useState('');
  const [ showOldPassword, setShowOldPassword ] = useState(false);
  const [ showNewPassword, setShowNewPassword ] = useState(false);

  const { token } = useCookie();
  const { auth } = useAuth();

  const schema: ZodType<FormData> = z
    .object({
      oldPassword: z.string().min(8, { message: 'Min length of password must be 8' }),
      newPassword: z.string().min(8, { message: 'Min length of password must be 8' }),
      newPassword2: z.string().min(8, { message: 'Password must contain at least 8 characters' }),
    })
    .refine((data) => data.newPassword === data.newPassword2, {
      message: 'Passwords do not match',
      path: [ 'newPassword' ],
    });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
  });  

  const updatePassword = async (data: FormData) => {
    if (!auth) return;
    
    const response = await userService.updatePassword(
      token, 
      data
    ).catch((error: AxiosError<ServerException>) => {
      setServerError(error.response?.data.message ?? '');
    });

    if (!response) return;

    setServerError('');
    
    return response;
  };

  
  return (
    <CardBody className="pb-2 user-page-card-general">
      <h3>Change Password</h3>
      <hr />
      <form onSubmit={handleSubmit(updatePassword)}>
        <FormGroup className='form-group'>
          <FormLabel className="form-label">Current password</FormLabel>
          <div className='input-block'>
            <input 
              type={ showOldPassword ? 'text' : 'password' } 
              placeholder="Old password" 
              className='form-input' {...register('oldPassword')} 
            />
            <i onClick={() => setShowOldPassword(!showOldPassword)} className={
              showOldPassword ? 'fa-light fa-eye show-password-icon'
                : 'fa-light fa-eye-slash show-password-icon'
            }></i>
          </div>
          {
            errors.oldPassword && 
            <span className='errmsg' style={{
              padding: '0',
            }}>
              <span>{' ' + errors.oldPassword?.message ?? serverError}</span>
            </span>
          }
        </FormGroup>
        
        <FormGroup className='form-group'>
          <FormLabel className="form-label">New password</FormLabel>
          <div className='input-block'>
            <input 
              type={ showNewPassword ? 'text' : 'password' } 
              placeholder="New password" 
              className='form-input' {...register('newPassword')} 
            />
            <i onClick={() => setShowNewPassword(!showNewPassword)} className={
              showNewPassword ? 'fa-light fa-eye show-password-icon'
                : 'fa-light fa-eye-slash show-password-icon'
            }></i>
          </div>
          {
            errors.newPassword && 
            <span className='errmsg' style={{
              padding: '0',
            }}>
              <span>{' ' + errors.newPassword?.message ?? serverError}</span>
            </span>
          }
        </FormGroup>
        
        <FormGroup className='form-group'>
          <FormLabel className="form-label">Repeat new password</FormLabel>
          <div className='input-block'>
            <input 
              type={ showNewPassword ? 'text' : 'password' } 
              placeholder="Repeat password" 
              className='form-input' {...register('newPassword2')} 
            />
          </div>
        </FormGroup>
        {
          errors.newPassword2 && 
          <span className='errmsg' style={{
            padding: '0',
          }}>
            <span>{' ' + errors.newPassword2?.message ?? serverError}</span>
          </span>
        }
        <Col className="mt-3 user-page__confirmation-btn-container">
          <Button type='submit' className="btn save">Save Changes</Button>
          <Button className="btn cancel">Cancel</Button>
        </Col>
        <p className='serverErrorMsg'>{serverError}</p>
      </form>
    </CardBody>
  );
};

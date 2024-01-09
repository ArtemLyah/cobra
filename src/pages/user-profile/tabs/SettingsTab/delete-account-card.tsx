import React from 'react';
import { Button, CardBody } from 'react-bootstrap';
import { userService } from '../../../../api/services/users.service';
import { useAuth } from '../../../../hooks/useAuth';
import useCookie from '../../../../hooks/useCookie';

export const DeleteAccountCard = () => {
  const { auth, logout } = useAuth();
  const { token } = useCookie();

  const submitDelete = async () => {
    if (!auth) return;

    await userService.deleteAccount(token);
    logout();
  };

  return (
    <CardBody className="pb-2 user-page-card-general">
      <h3 className="">Delete Account</h3>
      <hr />
      <p className="">Once you delete your account, there is no going back. Please be certain.</p>
      <Button
        type="button"
        className='btn deleteAccount'
        onClick={() => {
          if (confirm('Are you sure you want to delete this account?')) {
            submitDelete();
          }
        }}
      >
        Delete your account
      </Button>
    </CardBody>
  );
};
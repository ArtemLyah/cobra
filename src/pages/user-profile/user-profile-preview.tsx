import React from 'react';
import { Image } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const UserProfilePreview = () => {
  const { auth } = useAuth();

  return (
    <div className='user-page__user-preview-container user-page__use-preview__grid user-page-grid'>
      <div className='d-flex align-items-center justify-content-center'>
        <Image
          src={ auth?.avatar }
          alt='user avatar'
          roundedCircle
          style={{ width: '48px', height: '48px' }}
        />
      </div>
      <div className='user-page__user-preview__grid__item user-page__user-preview__nav'>
        <h4>
          { auth?.username }
        </h4>
      </div>
    </div>
  );
};

export default UserProfilePreview;
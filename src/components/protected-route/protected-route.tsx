import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  isAuthCheckedSelector,
  getUserLoadingSelector,
  getUser
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
}) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();
  const isLoading = useSelector(getUserLoadingSelector);
  const user = useSelector(getUser);

  if (isLoading || !isAuthChecked) {
    return <Preloader />;
  }

  const isAuthenticated = !!user;

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || '/'} />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

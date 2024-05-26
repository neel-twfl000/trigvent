import { styled } from '@mui/material/styles';

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  minHeight: '100vh'
}));

export default AuthWrapper;

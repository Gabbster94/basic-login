import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import { Box, Button } from "@mui/material";
import Router from "next/router";
import useUserApi from '../hooks/useUserApi';
import { useAppSelector } from '../redux/hooks';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}


const Navbar = ({ children }: Props) => {
  const userApi = useUserApi();
  const userSlice = useAppSelector(state => state.user);
  const authSlice = useAppSelector(state => state.auth);

  async function logOutOnClick() {
    await userApi.logOut(userSlice.email);
  }

  const handleLoginClick = () => Router.push("/login");

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">


          <Box>
            {authSlice.hasLogin ?
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Link href='/'>Home</Link>
                <Box>
                  <Link href='/weather'>Weather</Link>
                  <Button color="warning" onClick={logOutOnClick}>Logout</Button>
                </Box>
              </Box>
              :
              <Button color="warning" onClick={handleLoginClick}>Login</Button>
            }
          </Box>

        </Container>
      </AppBar >
      {children}
    </>
  );
};
export default Navbar;

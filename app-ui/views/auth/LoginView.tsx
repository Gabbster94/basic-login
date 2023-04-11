import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import useUserApi from "../../hooks/useUserApi";

export default function LoginView() {
  const router = useRouter();
  const user = useUserApi();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authSlice = useAppSelector(appState => appState.auth);

  useEffect(() => {
    if (authSlice.hasLogin && router.query.lastLoc)
      router.push(router.query.lastLoc as string);
    if (authSlice.hasLogin)
      router.back();
  }, [authSlice.hasLogin]);

  const handleLogin = async () => {

    await user.logIn({ username, password });

    if (router.query.lastLoc)
      return router.push(router.query.lastLoc as string);

    router.push("/");
  };

  return (
    <Box pb={3}>
      <Typography variant="h4" textAlign="center" my={2}>
        Log In
      </Typography>
      <Box width="80%" margin="auto" sx={{ backgroundColor: "whitesmoke", p: 1, borderRadius: 2 }}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          variant="filled"
          required
          onChange={e => setUsername(e.target.value)}
          sx={{ mb: 2, pt: 1 }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          variant="filled"
          required
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2, pt: 1 }}
        />

        <Button variant="contained" color="secondary" sx={{ m: 2 }} onClick={handleLogin}>
          Log In
        </Button>
      </Box>
    </Box >
  );
}
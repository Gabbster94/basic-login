import { Box } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

export default function Home() {
  const auth = useAppSelector(appState => appState.auth);
  const user = useAppSelector(appState => appState.user);

  if (auth.hasLogin) {
    return (
      <Box p={3}>
        <Box mb={2}>
          Hello, {user.name}!
        </Box>
        <Box>
          Here are some information regarding your profile:
          <Box mt={1}>Your email: {user.email}</Box>
          <Box>Token (ops, shouldn't share this): {user.token}</Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box textAlign='center' mt={2}>
      Sorry, no data for you as you're not logged in.
    </Box>
  );
}

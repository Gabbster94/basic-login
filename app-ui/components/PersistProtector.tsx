import { useRouter } from "next/router";
import { useAppSelector } from "../redux/hooks";

export default function PersistProtector() {
  const authSlice = useAppSelector(appState => appState.auth);
  const router = useRouter();
  const { route } = router;
  const privateRoutes: string[] = ['/weather'];

  if (privateRoutes.includes(route) && !authSlice.hasLogin)
    router.push({ pathname: '/login', query: { lastLoc: route } });

  return null;
}
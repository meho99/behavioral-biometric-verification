import { Box, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, RouteObject, useRoutes } from "react-router";
import { Button } from "../components/Button";
import { WrongPage } from "../pages/WrongPage/WrongPage";
import {
  accessTokenSelector,
  isUserLoadingSelector,
  userSelector,
} from "../store/auth/auth.selectors";
import { authActions } from "../store/auth/auth.slice";
import { authenticatedRoutes, baseRoutes } from "./router.routes";
import { CircularProgressBox } from "../components/CircularProgressBox";

export const BaseLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          py: 2,
          px: 2,
          backgroundColor: "background.paper",
          borderBottom: "1px solid #4a4a4a",
        }}
      >
        <Typography variant="h3" color="primary">
          Mouse Movement Verification
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 10,
          maxWidth: 1200,
          backgroundColor: "background.paper",
          border: "1px solid #4a4a4a",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export const AuthenticatedLayout = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(accessTokenSelector);
  const isUserLoading = useSelector(isUserLoadingSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (!accessToken) {
      dispatch(authActions.signOut());
    }
  }, [accessToken, dispatch]);

  const handleLogOut = useCallback(() => {
    dispatch(authActions.signOut());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          py: 2,
          px: 2,
          backgroundColor: "background.paper",
          borderBottom: "1px solid #4a4a4a",
        }}
      >
        <Typography variant="h3" color="primary">
          Mouse Movement Verification
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="h5">user: {user?.email}</Typography>
          <Button size="small" onClick={handleLogOut}>
            Log out
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          mt: 8,
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "background.paper",
          border: "1px solid #4a4a4a",
        }}
      >
        {isUserLoading ? <CircularProgressBox /> : <Outlet />}
      </Box>
    </Box>
  );
};

const routesConfig: RouteObject[] = [
  {
    element: <BaseLayout />,
    children: baseRoutes,
  },
  {
    element: <AuthenticatedLayout />,
    children: authenticatedRoutes,
  },
  {
    element: <WrongPage />,
    path: "*",
  },
];

export const AppRoutes = () => {
  const appRoutes = useRoutes(routesConfig);

  return appRoutes;
};

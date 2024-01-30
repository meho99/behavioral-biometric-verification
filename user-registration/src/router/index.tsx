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
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          mt: 10,
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "background.paper",
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
          justifyContent: "flex-end",
          gap: 2,
          width: "100%",
        }}
      >
        <Typography variant="h5">user: {user?.email}</Typography>
        <Button size="small" onClick={handleLogOut}>
          Log out
        </Button>
      </Box>
      <Box
        sx={{
          mt: 8,
          maxWidth: 1200,
          width: "100%",
          backgroundColor: "background.paper",
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

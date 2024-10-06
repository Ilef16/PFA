import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import SignIn from "layouts/authentication/sign-in";
import LoginRecruteur from "./componentsLoginRecruteur/LoginRecruteur";
import Test1 from "layouts/Test1/Test1";
import SignUpRecruteur from "./componentsSingRecruteur/SignUpRecruteur";
import LoginCandidat from "./componentsLoginCandidat/LoginCandidat";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [userType, setUserType] = useState(null);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        <Routes>
          <Route path="/dashboard/*" element={
            <>
              {userType === 'Recruteur' && (
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Espace Recruteur"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              )}
              {userType === 'Candidat' && (
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Espace Candidat"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              )}
              <Configurator />
              {configsButton}
              <Routes>
                {getRoutes(routes)}
              </Routes>
            </>
          } />
          <Route path="/" element={<Test1 />} />
          <Route path="/LoginRecruteur" element={<LoginRecruteur setUserType={setUserType} />} />
          <Route path="/LoginCandidat" element={<LoginCandidat setUserType={setUserType} />} />
          <Route path="/authentication/sign-in" element={<SignIn setUserType={setUserType} />} />
          <Route path="/SignUpRecruteur" element={<SignUpRecruteur />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Test1 />} />
        <Route path="/LoginRecruteur" element={<LoginRecruteur setUserType={setUserType} />} />
        <Route path="/authentication/sign-in" element={<SignIn setUserType={setUserType} />} />
        <Route path="/SignUpRecruteur" element={<SignUpRecruteur />} />
        <Route path="/*" element={
          <>
            {userType === 'Recruteur' ? (
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Espace Recruteur"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            ) : (
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Espace Candidat"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
            )}
            <Configurator />
            {configsButton}
            <Routes>
              {getRoutes(routes)}
            </Routes>
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}
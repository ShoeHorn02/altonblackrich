// Landing
import Landing from "../pages/landing/LandingList";
import Legal from "../pages/landing/Pages/Legal";
import LegalHydration from "../pages/landing/Pages/LegalHydration";
import LegalTimer from "../pages/landing/Pages/LegalTimer";
import Guidance from "../pages/misc/Guidance";






const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null,
};


const termsRoutes = {
  path: "/terms",
  name: "Landing Page",
  component: Legal,
  children: null,
};






const privacyHydrationRoutes = {
  path: "/hydration/privacy",
  name: "Hydration",
  component: LegalHydration,
  children: null
};

const privacyTimerRoutes = {
  path: "/timer/privacy",
  name: "Timer",
  component: LegalTimer,
  children: null
};

const guidanceRoutes = {
  path: "/guidance",
  name: "Guidance",
  component: Guidance,
  children: null
};



// Dashboard specific routes
export const dashboard = [

];

// Landing specific routes
export const landing = [
  guidanceRoutes,
  privacyHydrationRoutes,
  privacyTimerRoutes,
  landingRoutes,
  termsRoutes,
];

// Auth specific routes
export const page = [];

// Onboard specific routes
export const onboarding = [];



// All routes
export default [
];

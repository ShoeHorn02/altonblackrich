import async from "../components/Async";

import {
  faBook,
  faAnchor,
  faChartPie,
  faCheckSquare,
  faDesktop,
  faFile,
  faFlask,
  faHeart,
  faHome,
  faMapMarkerAlt,
  faTable,
  faSignInAlt,
  faBookOpen,
  faDumbbell,
  faDotCircle,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

// Landing
import Landing from "../pages/landing/LandingList";
import Legal from "../pages/landing/Pages/Legal";


// Auth
import SignIn from "../pages/auth/SignIn";

import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import SidebarLeft from "../pages/layouts/SidebarLeft";
import SidebarRight from "../pages/layouts/SidebarRight";
import ThemeModern from "../pages/layouts/ThemeModern";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeDark from "../pages/layouts/ThemeDark";
import ThemeLight from "../pages/layouts/ThemeLight";

// Misc
import Blank from "../pages/misc/Blank";

// UI Elements
import Alerts from "../pages/ui-elements/Alerts";
import Buttons from "../pages/ui-elements/Buttons";
import Cards from "../pages/ui-elements/Cards";
import General from "../pages/ui-elements/General";
import Grid from "../pages/ui-elements/Grid";
import Modals from "../pages/ui-elements/Modals";
import Notifications from "../pages/ui-elements/Notifications";
import Tabs from "../pages/ui-elements/Tabs";
import Typography from "../pages/ui-elements/Typography";

// Workouts
import WorkoutsDetail from "../pages/workouts/WorkoutsDetail";
import WorkoutsList from "../pages/workouts/WorkoutsList";

// Discover
import Discover from "../pages/discover/Discover";

// Profile
import Profile from "../pages/profile/Profile";


// Exercise
import ExerciseDetail from "../pages/exercises/ExerciseDetail";
import ExerciseList from "../pages/exercises/ExerciseList";

// Notifications
import NotificationList from "../pages/notifications/NotificationList";

// Albums
import AlbumList from "../pages/albums/Album/Index";
import AlbumDetail from "../pages/albums/AlbumDetail/AlbumDetail";
import PhotoDetail from "../pages/albums/PhotoDetail/PhotoDetail";

// Onboarding
import Step1 from "../pages/onboarding/Step1/Index";
import Step2 from "../pages/onboarding/Step2/Index";
import Step3 from "../pages/onboarding/Step3/Index";

// Lift Tracking
import LiftTracking from "../pages/lift_tracking/LiftTracking";

import { API_WORKOUTS_CATEGORY_PUBLIC } from '../redux/actions/API'


// Reports LiftHistory
import LiftHistory from "../pages/reports/LiftHistory/LiftHistory";

// Settings
import SettingsAccount from "../pages/settings/Account/Index";
import SettingsPassword from "../pages/settings/Password/Index";
import SettingsPrivacy from "../pages/settings/Privacy/Index";
import SettingsDelete from "../pages/settings/Delete/Index";
import SettingsSubscriptions from "../pages/settings/Subscriptions/Index";


// Messages
import MessagesMain from "../pages/messages/MessagesMain";

// Pages
const Clients = async(() => import("../pages/pages/Clients"));
const Invoice = async(() => import("../pages/pages/Invoice"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Chat = async(() => import("../pages/pages/Chat"));

// Documentation
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const Plugins = async(() => import("../pages/docs/Plugins"));
const Changelog = async(() => import("../pages/docs/Changelog"));

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));

// Timeline
const Timeline = async(() => import("../pages/dashboards/Social"));

// Forms
const Layouts = async(() => import("../pages/forms/Layouts"));
const BasicElements = async(() => import("../pages/forms/BasicElements"));
const AdvancedElements = async(() => import("../pages/forms/AdvancedElements"));
const InputGroups = async(() => import("../pages/forms/InputGroups"));
const Editors = async(() => import("../pages/forms/Editors"));
const Validation = async(() => import("../pages/forms/Validation"));

// Tables
const BootstrapTables = async(() => import("../pages/tables/Bootstrap"));
const AdvancedTables = async(() => import("../pages/tables/Advanced"));

// Charts
const Chartjs = async(() => import("../pages/charts/Chartjs"));
const ApexCharts = async(() => import("../pages/charts/ApexCharts"));

// Icons
const FontAwesome = async(() => import("../pages/icons/FontAwesome"));
const IonIcons = async(() => import("../pages/icons/IonIcons"));
const Feather = async(() => import("../pages/icons/Feather"));

// Calendar
const Calendar = async(() => import("../pages/calendar/Calendar"));


// Maps
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));

// Routes
const workout_category_list =[]

async function apiGetWorkoutCategory () {
   try {
     const resp = await fetch(`${API_WORKOUTS_CATEGORY_PUBLIC}`)

     const workoutCateogryJSON = await resp.json()

     for (let i = 0; i < workoutCateogryJSON.length; i++) {
       var newElement = {};
       newElement['path'] = "/workouts/" + workoutCateogryJSON[i].category;
       newElement['name'] = workoutCateogryJSON[i].category;
       newElement['component'] = "WorkoutsList";
       workout_category_list.push(newElement);
     }

     return workout_category_list

   } catch (err) {
        console.log(err)
     }
}

const triggerWorkoutCategory = apiGetWorkoutCategory();

const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: Landing,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "My Dashboard",
  header: "Overview",
  icon: faCalendarAlt,
  component: Default,
  children: null
};

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: faDesktop,
  children: [
    {
      path: "/layouts/sidebar-left",
      name: "Left Sidebar",
      component: SidebarLeft
    },
    {
      path: "/layouts/sidebar-right",
      name: "Right Sidebar",
      component: SidebarRight
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-dark",
      name: "Dark Theme",
      component: ThemeDark
    },
    {
      path: "/layouts/theme-light",
      name: "Light Theme",
      component: ThemeLight
    }
  ]
};

const uiRoutes = {
  path: "/ui",
  name: "User Interface",
  icon: faFlask,
  children: [
    {
      path: "/ui/alerts",
      name: "Alerts",
      component: Alerts
    },
    {
      path: "/ui/buttons",
      name: "Buttons",
      component: Buttons
    },
    {
      path: "/ui/cards",
      name: "Cards",
      component: Cards
    },
    {
      path: "/ui/general",
      name: "General",
      component: General
    },
    {
      path: "/ui/grid",
      name: "Grid",
      component: Grid
    },
    {
      path: "/ui/modals",
      name: "Modals",
      component: Modals
    },
    {
      path: "/ui/notifications",
      name: "Notifications",
      component: Notifications
    },
    {
      path: "/ui/tabs",
      name: "Tabs",
      component: Tabs
    },
    {
      path: "/ui/typography",
      name: "Typography",
      component: Typography
    }
  ]
};



const formRoutes = {
  path: "/forms",
  name: "Forms",
  icon: faCheckSquare,
  children: [
    {
      path: "/forms/layouts",
      name: "Layouts",
      component: Layouts
    },
    {
      path: "/forms/basic-elements",
      name: "Basic Elements",
      component: BasicElements
    },
    {
      path: "/forms/advanced-elements",
      name: "Advanced Elements",
      component: AdvancedElements
    },
    {
      path: "/forms/input-groups",
      name: "Input Groups",
      component: InputGroups
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors
    },
    {
      path: "/forms/validation",
      name: "Validation",
      component: Validation
    }
  ]
};

const tableRoutes = {
  path: "/tables",
  name: "Tables",
  icon: faTable,
  children: [
    {
      path: "/tables/bootstrap",
      name: "Bootstrap",
      component: BootstrapTables
    },
    {
      path: "/tables/advanced-tables",
      name: "Advanced",
      component: AdvancedTables
    }
  ]
};

const iconRoutes = {
  path: "/icons",
  name: "Icons",
  icon: faHeart,
  children: [
    {
      path: "/icons/feather",
      name: "Feather",
      component: Feather
    },
    {
      path: "/icons/ion-icons",
      name: "Ion Icons",
      component: IonIcons
    },
    {
      path: "/icons/font-awesome",
      name: "Font Awesome",
      component: FontAwesome
    }
  ]
};

const calendarRoutes = {
  path: "/calendar",
  name: "Calendar",
  icon: faCalendarAlt,
  component: Calendar,
  children: null
};

const myWorkoutRoutes = {
  path: "/myworkouts",
  name: "My Workouts",
  icon: faCalendarAlt,
  component: Calendar,
  children: null
};


const albumbRoutes = {
  path: "/albums",
  name: "My Photos",
  icon: faCalendarAlt,
  component: AlbumList,
};


const albumDetailRoutes = {
  path: "/albums/:albumID",
  name: "AlbumDetail",
  icon: faBookOpen,
  component: AlbumDetail,
};

const albumbPhotoDetailRoutes = {
  path: "/albums/:albumID/:photoID",
  name: "PhotoDetail",
  icon: faBookOpen,
  component: PhotoDetail,
};


const settingRoutes = {
  path: "/settings",
  name: "Settings",
  children: [
    {
      path: "/settings/account",
      name: "Account",
      component: SettingsAccount
    },
    {
      path: "/settings/password",
      name: "Password",
      component: SettingsPassword
    },
    {
      path: "/settings/privacy",
      name: "Privacy",
      component: SettingsPrivacy
    },
    {
      path: "/settings/delete",
      name: "Delete",
      component: SettingsDelete
    },
    {
      path: "/settings/subscriptions",
      name: "Subscriptions",
      component: SettingsSubscriptions
    }
  ]
};

const followingRoutes = {
  path: "/following",
  name: "Following",
  icon: faCalendarAlt,
  component: Calendar,
  children: null
};



const timelineRoutes = {
  path: "/timeline",
  name: "Timeline",
  header: "Discover And Spotlight",
  icon: faHome,
  component: Timeline,
  children: null
};

const mapRoutes = {
  path: "/maps",
  name: "Maps",
  icon: faMapMarkerAlt,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps
    }
  ]
};

const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: faFile,
  header: "Other",
  children: [
    {
      path: "/pages/settings",
      name: "Settings",
      component: SettingsAccount
    },
    {
      path: "/pages/clients",
      name: "Clients",
      component: Clients,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      component: Invoice
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/pages/tasks",
      name: "Tasks",
      component: Tasks
    },
    {
      path: "/pages/chat",
      name: "Chat",
      component: Chat,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

const workoutDetailRoutes = {
  path: "/workouts/detail/:workoutID",
  name: "Workouts",
  icon: faBookOpen,
  component: WorkoutsDetail,
};

const workoutCategoryDetail = {
  path: "/workouts/:categoryID",
  name: "Workouts",
  icon: faDumbbell,
  component: WorkoutsList,
};

const messagesRoutesDetail = {
  path: "/messages/detail/:chatID",
  name: "Messages",
  icon: faCalendarAlt,
  component: MessagesMain,
  children: null
};

const messagesRoutes = {
  path: "/messages/overview",
  name: "Messages",
  icon: faFlask,
  component: MessagesMain,
};

const workoutCategory = {
  path: "/workouts/",
  name: "Workouts",
  icon: faDumbbell,
  children: workout_category_list
};

const exerciseDetailRoutes = {
  path: "/exercises/detail/:exerciseID",
  name: "Exercises",
  icon: faAnchor,
  component: ExerciseDetail,
};

const exerciseRoutes = {
  path: "/exercises",
  name: "My Exercises",
  icon: faAnchor,
  component: ExerciseList,
  children: null
};


const notificationRoutes = {
  path: "/notifications",
  name: "My Notifications",
  icon: faAnchor,
  component: NotificationList,
  children: null
};



const discoverRoutes = {
  path: "/discover",
  name: "Athelets",
  icon: faUserPlus,
  component: Discover,
  children: null
};

const lift_trackingRoutes = {
  path: "/lift_tracking",
  name: "Record Lifts",
  header: "Tracking",
  icon: faDotCircle,
  component: LiftTracking,
  children: null
};


const weight_trackingRoutes = {
  path: "/weight_tracking",
  name: "Record Weight",
  icon: faDotCircle,
  component: LiftTracking,
  children: null
};

const reportRoutes = {
  path: "/reports",
  name: "My Reports",
  icon: faChartPie,
  badgeColor: "primary",
  badgeText: "New",
  children: [
    {
      path: "/reports/lift_history",
      name: "Lift History",
      component: LiftHistory
    },
    {
      path: "/reports/chartjs",
      name: "Chart.js",
      component: Chartjs
    },
    {
      path: "/reports/apexcharts",
      name: "ApexCharts",
      component: ApexCharts
    }
  ]
};

const body_trackingRoutes = {
  path: "/body_tracking",
  name: "Record Body",
  icon: faDumbbell,
  component: LiftTracking,
  children: null
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: faSignInAlt,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};


const onboardRoutes = {
  path: "/onboarding",
  name: "Onboarding",
  icon: faSignInAlt,
  children: [
    {
      path: "/onboarding/step1",
      name: "step1",
      component: Step1
    },
    {
      path: "/onboarding/step2",
      name: "step2",
      component: Step2
    },
    {
      path: "/onboarding/step3",
      name: "step3",
      component: Step3
    }
  ]
};







const documentationRoutes = {
  path: "/docs",
  name: "Documentation",
  icon: faBook,
  children: [
    {
      path: "/docs/getting-started",
      name: "Getting Started",
      component: GettingStarted
    },
    {
      path: "/docs/plugins",
      name: "Plugins",
      component: Plugins
    },
    {
      path: "/docs/changelog",
      name: "Changelog",
      component: Changelog
    },
  ]
};

// This route is not visisble in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};


// This route is not visisble in the sidebar
const profileRoutes = {
  path: "/profile",
  name: "Profile",
  children: [
    {
      path: "/profile/:memberID/:pathID/",
      name: "Member",
      component: Profile
    },
    {
      path: "/profile/:memberID/albums/:albumID/",
      name: "Member",
      component: Profile
    },
    {
      path: "/profile/:memberID/albums/:albumID/:photoID",
      name: "Member",
      component: Profile
    },
    {
      path: "/profile/:memberID/workout/:workoutID/",
      name: "Member",
      component: Profile
    }
  ]
};

const legalRoutes = {
  path: "/legal",
  name: "Legal",
  component: Legal,
  children: null
};



// Dashboard specific routes
export const dashboard = [

];

// Landing specific routes
export const landing = [
  landingRoutes,

];

// Auth specific routes
export const page = [];

// Onboard specific routes
export const onboarding = [];



// All routes
export default [

];

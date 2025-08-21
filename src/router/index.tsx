import App from "@/App";
import AboutPage from "@/pages/AboutPage";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import ContactPage from "@/pages/ContactPage";
import FaqPage from "@/pages/FaqPage";
import FeaturePage from "@/pages/FeaturePage";
import HomePage from "@/pages/HomePage";
import PricingPage from "@/pages/PricingPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "home",
        Component: HomePage,
      },
      {
        path: "about",
        Component: AboutPage,
      },
      {
        path: "feature",
        Component: FeaturePage,
      },
      {
        path: "pricing",
        Component: PricingPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "faq",
        Component: FaqPage,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

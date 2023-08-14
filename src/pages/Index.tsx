import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AppFooter from "../components/Footer";
import Contacts from "../components/Contacts";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Contacts />
      <AppFooter />
    </>
  );
}
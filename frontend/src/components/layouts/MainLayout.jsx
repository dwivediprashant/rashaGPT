import { Outlet } from "react-router";
import Navbar from "../Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

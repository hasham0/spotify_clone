import Topbar from "@/components/shared/top-bar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
}

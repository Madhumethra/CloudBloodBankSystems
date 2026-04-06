import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

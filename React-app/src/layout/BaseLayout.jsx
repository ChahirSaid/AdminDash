import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const BaseLayout = ({ onLogout }) => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
      <div>
        <Sidebar onLogout={onLogout}/>
      </div>
    </main>
  );
};

export default BaseLayout;

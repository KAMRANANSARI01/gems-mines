import { Outlet } from "react-router-dom";
// import Navbar from "../component/Navbar";

const RootLayout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;

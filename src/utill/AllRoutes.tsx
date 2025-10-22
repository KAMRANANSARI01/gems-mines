import Home from "../pages/home/Home";
import RootLayout from "../pages/RootLayout";
import RulePage from "../pages/rule/RulePage";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index:true,
        element: <Home />,
        
      },
      {
        path : "rules",
        element : <RulePage/>
      }

    ],
  },
];
export default routes;

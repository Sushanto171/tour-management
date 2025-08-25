import { Outlet } from "react-router";
import CommonLayout from "./components/layouts/CommonLayout";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <CommonLayout>
        <div className="grow-1 container mx-auto px-4">
          <Outlet />
        </div>
      </CommonLayout>
    </div>
  );
}

export default App;

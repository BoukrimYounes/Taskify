
import Navbar from "../compontnts/Navbar";

function Layout({children}) {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;

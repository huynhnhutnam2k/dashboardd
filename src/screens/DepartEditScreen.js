import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditDepartMain from "../components/deparment/EditDepartMain";

const DepartEditScreen = () => {
  // const productId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditDepartMain />
      </main>
    </>
  );
};
export default DepartEditScreen;

import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import EditDepartMain from "../components/deparment/EditDepartMain";
import EditPreliminaryMain from "../components/pre/EditPreliminaryMain";
const PreEditScreen = () => {
  // const productId = match.params.id;

  return (
    <>
      {console.log("ok")}
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditPreliminaryMain />
      </main>
    </>
  );
};
export default PreEditScreen;

import Sidebar from "../components/sidebar";
import Header from "../components/Header";
// import EditDepartMain from "../components/deparment/EditDepartMain";
import EditDiagnoseMain from "../components/diagnose/EditDiagnoseMain";
const DiagnoseEditMain = () => {
  // const productId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditDiagnoseMain  />
      </main>
    </>
  );
};
export default DiagnoseEditMain;

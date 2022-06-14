import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditQnAMain from "../components/qnas/EditQnAMain";
import EditDepartMain from "../components/deparment/EditDepartMain";
import EditTreatmentMain from "../components/treatment/EditTreatmentMain";

const TreatmentEditScreen = () => {
  // const productId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditTreatmentMain  />
      </main>
    </>
  );
};
export default TreatmentEditScreen;

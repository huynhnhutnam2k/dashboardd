import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditQnAMain from "./../components/qnas/EditQnAMain";

const QnAEditScreen = () => {
  // const productId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditQnAMain  />
      </main>
    </>
  );
};
export default QnAEditScreen;

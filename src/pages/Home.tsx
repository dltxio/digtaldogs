import { PageLayout, Cover, Count, Register } from "../components/";
import About from "../components/About/About_View";

const Home = () => {
  return (
    <PageLayout>
      <Cover />
      <About />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <Register />
        </div>
        <Count />
      </div>
    </PageLayout>
  );
};

export default Home;

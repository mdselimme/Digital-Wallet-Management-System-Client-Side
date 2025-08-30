import PageTitle from "@/utils/PageTitle";
import CallToAction from "./CallToAction";
import CustomerSection from "./CusotmerSection";
import HeroSection from "./HeroSection";

const HomePage = () => {
  return (
    <div>
      <PageTitle title="Digipay || Homepage" />
      <HeroSection />
      <CustomerSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;

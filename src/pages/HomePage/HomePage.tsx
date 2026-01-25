import PageTitle from "@/utils/PageTitle";
import CallToAction from "./CallToAction";
import CustomerSection from "./CusotmerSection";
import HeroSection from "./HeroSection";
import ContactHeroSection from "./ContactHeroSection";

const HomePage = () => {
  return (
    <div>
      <PageTitle title="Digipay || Homepage" />
      <HeroSection />
      <CustomerSection />
      <ContactHeroSection />
      <CallToAction />
    </div>
  );
};

export default HomePage;


import Footer from "./components/footer";
import Navigation from "./components/Navigation";
import Section1 from "./maincomponent/section1";
import Section2 from "./maincomponent/Section2";
import Section3 from "./maincomponent/section3";

export default function page() {
  return (
    <>
      <div className="">
         <Navigation  className="fixed"/>
        <Section3 />
        <Section2 /> 
        <Section1 />
        <Footer/>
      </div>
    </>
  );
}

import About from "./about";
import Featured from "./feature";
import Hero from "./hero";
import Navbar from "./navbar";
import Why from "./WhyFarmer";
import HowItWorks from "./Works";
import Explore from "./explore";
import Footer from "./Footer";

function App() {
  return <>
    <Navbar />
    <div id="home"><Hero /></div>
    <div id="farms"><Featured /></div>
    <div id="about"><About /></div>
    <Why />
    <HowItWorks />
    <div id="blog"><Explore /></div>
    <Footer />
  </>
}
   
export default App;

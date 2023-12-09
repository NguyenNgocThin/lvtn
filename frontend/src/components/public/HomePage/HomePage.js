import Map from "../../Map/Map";
import ShowParking from "../../Show/ShowParking";
import HowWorks from "../../Show/HowWorks";
import Footer from "../../Show/Footer";
const HomePage= (props) => {

  return(
    <>
    
      <Map />
      <ShowParking/>
      <HowWorks/>
      <Footer/>
    </>
  )
}


export default HomePage
import MobileComponent from "../media-component/home/MobileComponent";
import DesktopComponent from "../media-component/home/DesktopComponent";
import useMediaQuery from "../hooks/useMediaQuery";
import "./Home.css";

function Home() {

  const isMobile = useMediaQuery("(max-width: 520px)");

  return (
    <main className="home-layout">
      {isMobile ? <MobileComponent /> : <DesktopComponent />}
    </main>
  )
}

export default Home
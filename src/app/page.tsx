import CarouselDApiDemo from "./components/Carousel";
import Categories from "./components/Categories";
import Directories from "./components/Directories";




export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen ">
      <CarouselDApiDemo/>
      <Categories/>
      <Directories/>
    </div>
  );
}

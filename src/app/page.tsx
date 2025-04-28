import Browsers from "./components/Browsers";
import CarouselDApiDemo from "./components/Carousel";
import Categories from "./components/Categories";
import Directories from "./components/Directories";
import SubCategories from "./components/SubCategory";
import Apps from "./components/Apps";




export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen ">
      <CarouselDApiDemo/>
      <Categories/>
      <Directories/>
      <SubCategories/>
      <Browsers/>
      <Apps/>
    </div>
  );
}

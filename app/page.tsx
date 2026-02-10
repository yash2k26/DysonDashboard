import Topbar from "./Landing/UI/Topbar";
import ColorPage from "./Landing/UI/ColorPage";
import ExplodedView from "./Landing/UI/ExplodedView";
import ProductKnow from "./Landing/UI/ProductKnow";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black min-h-screen">
      <Topbar />
      <ExplodedView />
      <ProductKnow />
      <ColorPage />
    </main>
  );
}

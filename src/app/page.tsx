// components
import { Navbar, Footer } from "@/components";
import Map from "@/components/map";

export default function Campaign() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="md:p-6 lg:p-6 w-full h-full">
        <Map />
      </div>
    </div>
  );
}

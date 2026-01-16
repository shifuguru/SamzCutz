import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import LocationHours from "./components/LocationHours";
import Footer from "./components/Footer";
import StickyBookBar from "./components/StickyBookBar";
import BookingForm from "./components/BookingForm";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-onyx text-platinum">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="pattern-overlay absolute inset-0" />
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-gilded/40 via-amber-500/30 to-transparent blur-[120px]" />
        <div className="absolute bottom-0 left-[-4rem] h-80 w-80 rounded-full bg-gradient-to-br from-ember/30 via-obsidian to-transparent blur-[110px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-32 pt-8 sm:px-6 lg:px-0">
          <Hero />
          <BookingForm />
          <Services />
          <About />
          <Gallery />
          <Testimonials />
          <LocationHours />
        </main>
        <Footer />
      </div>

      <StickyBookBar />
    </div>
  );
}

export default App;

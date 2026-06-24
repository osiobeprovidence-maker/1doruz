import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Artists from './pages/Artists';
import ArtistProfile from './pages/ArtistProfile';
import Releases from './pages/Releases';
import DemoSubmission from './pages/DemoSubmission';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminArtists from './pages/AdminArtists';
import AdminReleases from './pages/AdminReleases';
import AdminNews from './pages/AdminNews';
import AdminDemos from './pages/AdminDemos';
import AdminSettings from './pages/AdminSettings';
import AdminAddArtist from './pages/AdminAddArtist';
import AdminAddRelease from './pages/AdminAddRelease';
import AdminAddEvent from './pages/AdminAddEvent';
import AdminEvents from './pages/AdminEvents';
import AdminWriteArticle from './pages/AdminWriteArticle';
import AdminNewAsset from './pages/AdminNewAsset';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence } from 'motion/react';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--background)' }}>
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
              <Route path="/releases" element={<Releases />} />
              <Route path="/submit-demo" element={<DemoSubmission />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/artists" element={<AdminArtists />} />
              <Route path="/admin/releases" element={<AdminReleases />} />
              <Route path="/admin/news" element={<AdminNews />} />
              <Route path="/admin/events" element={<AdminEvents />} />
              <Route path="/admin/demos" element={<AdminDemos />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/artists/new" element={<AdminAddArtist />} />
              <Route path="/admin/releases/new" element={<AdminAddRelease />} />
              <Route path="/admin/news/new" element={<AdminWriteArticle />} />
              <Route path="/admin/events/new" element={<AdminAddEvent />} />
              <Route path="/admin/assets/new" element={<AdminNewAsset />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

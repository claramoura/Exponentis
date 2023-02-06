import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

function Layout() {
  return (
    <>
    <Header />   
    <main className="py-3">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default Layout;
import { Navbar, Container, Nav } from 'react-bootstrap';
import ProfileMenu from './ProfileMenu.jsx';
export const Header = () => {
  return (
    <Navbar bg="primary" className='mb-4 py-4'>
        <Container>
          <Navbar.Brand href="/" className='text-white bold'>Auth</Navbar.Brand>
          <Nav className="ms-auto">
            <ProfileMenu />
          </Nav>
        </Container>
      </Navbar>
  )
}

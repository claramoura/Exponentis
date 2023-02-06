import React from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../actions.js';
import Katex from './Katex.js';

function showUserAccess(location) {
  if (location.pathname !== '/sign-in' && location.pathname !== '/sign-up') {
    return true;
  }
  else {
    return false;
  }
}

function Header() {
  const user = useSelector(state => state.signInReducer.user);

  const location = useLocation();
  
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    window.location.replace('/');
  }

  const adminPages = [
    { href:'/admin/courses', page: 'Courses' },
    { href:'/admin/examples', page: 'Examples' },
    { href:'/admin/exercises', page: 'Exercises' },
    { href:'/admin/graphs', page: 'Graphs' },
    { href:'/admin/images', page: 'Images' },
    { href:'/admin/lessons', page: 'Lessons' },
    { href:'/admin/users', page: 'Users' }
  ]


  return (
    <header>
      <Navbar bg='info' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><Katex latex='$ex^{ponentis}$' /></Navbar.Brand>
          </LinkContainer>
          {user &&
            <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='justify-content-end'>
              <Nav>
                <Nav.Item className='my-2 mx-2' style={{ color: 'black' }}>{user.username}</Nav.Item>
                <Nav.Link className='mx-2' onClick={handleSignOut}>Sign out</Nav.Link>
              </Nav>
              {user.isAdmin &&
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Admin
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {adminPages.map((admin, index) => (
                      <div key={index}>
                      {(admin.href !== window.location.pathname.slice(1)) &&
                        <LinkContainer to={admin.href}> 
                          <Dropdown.Item>
                            {admin.page}
                          </Dropdown.Item>
                        </LinkContainer>

                      }
                      </div>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              }
            </Navbar.Collapse>
            </>
          }
          {(showUserAccess(location) === true && !user) &&
            <>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='justify-content-end'>
              <Nav className='mr-auto'>
                <LinkContainer id='signInNavLink' to='/sign-in'>
                  <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
                <LinkContainer id='signUpNavLink' to='/sign-up'>
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            </>
          }
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
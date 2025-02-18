import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/Userapislice'
import { logout } from '../slices/Authslice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { userInfo } = useSelector((state)=>state.auth)

    const Navigate = useNavigate()
    const Dispatch = useDispatch() 
    const [logoutApicall] = useLogoutMutation();
    
    const logoutHandler = async() =>{
        try{
     await logoutApicall().unwrap();
     Dispatch(logout())
     Navigate('/login')
    }
    catch(err)
    {
        console.log(err)
    }
}

   return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            { userInfo ? (
             <>
             <NavDropdown title ={userInfo.name} id = 'username'>
                <LinkContainer to = '/profile'>
                    <NavDropdown.Item>
                        Profile
                    </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick = { logoutHandler }>
                        logout
                </NavDropdown.Item>
             </NavDropdown>
             </>
            ) : (
                <>
                <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                 </>
            )
        }
           

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import CustomContainer from '../components/CustomContainer.js';
import Loader from '../components/Loader.js';
import MessageAlert from '../components/MessageAlert.js';
import { signIn, signOut } from '../actions.js';


function SignIn() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const signingIn = useSelector(state => state.signInReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(username, password));
  }

  // Signs out automatically when the user's access token expires.
  if (signingIn.success) {
    const timeout = (signingIn.user.token.access_exp - signingIn.user.token.access_iat) * 1000;
    setTimeout(() => dispatch(signOut()), timeout);
    window.location.replace('/');
  }

  return (
    <>
    <CustomContainer xs={10} md={5}>
      <h2>Sign In</h2>
      
      <Form className='my-3' onSubmit={handleSubmit} >
      {signingIn.error &&
        <MessageAlert message={signingIn.error} />
      }
        <Form.Group className='my-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='username'
            placeholder='Enter username'
            value={username}
            autoComplete='on'
            required
            onChange={(e) => setUsername(e.target.value)}
            >
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            autoComplete='off'
            required
            onChange={(e) => setPassword(e.target.value)}
            >
          </Form.Control>
        </Form.Group>
        <Button className='my-2' variant='primary' type='submit'>
          {signingIn.loading ? signingIn.loading && 
            <Loader />
          :
            <span>Sign in</span>
          }
        </Button>
      </Form>
      
      <Row className='my-3'>
        <Col>
          New User? <Link to='/sign-up'>
            Sign Up
          </Link>
        </Col>
      </Row>

    </CustomContainer>
    </>
  );
}

export default SignIn;
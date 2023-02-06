import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import CustomContainer from '../components/CustomContainer.js';
import Loader from '../components/Loader.js';
import MessageAlert from '../components/MessageAlert.js';
import { signUp, signOut } from '../actions.js';

function SignUp() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const signingUp = useSelector(state => state.signUpReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      dispatch(signUp(username, password));
      setPasswordError(false);
    }
    else {
      setPasswordError(true);
    }
  }

  // Signs out automatically when the user's access token expires.
  if (signingUp.success) {
    const timeout = (signingUp.user.token.access_exp - signingUp.user.token.access_iat) * 1000;
    setTimeout(() => dispatch(signOut()), timeout);
    window.location.replace('/');
  }

  return (
    <>
    <CustomContainer xs={10} md={5}>
      <h2>Sign Up</h2>

      <Form className='my-3' onSubmit={handleSubmit} >
        
        {signingUp.error &&
          <MessageAlert message={signingUp.error} />
        }
        {passwordError &&
          <MessageAlert message="Passwords don't match." />
        }
        
        <Form.Group className='my-3' controlId='username'>
          <Form.Label>Create username</Form.Label>
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
          <Form.Label>Create password</Form.Label>
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
        <Form.Group className='my-3' controlId='passwordConfirmation'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={passwordConfirmation}
            autoComplete='off'
            required
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          >
          </Form.Control>
        </Form.Group>
        <Button className='my-2' variant='primary' type='submit'>
        {signingUp.loading ? signingUp.loading && 
          <Loader />
        : 
          <span>Sign up</span>
        }
        </Button>
      </Form>
      
      <Row className='my-3'>
        <Col>
          Already registered? <Link to='/sign-in'>
            Sign In
          </Link>
        </Col>
      </Row>

    </CustomContainer>
    </>
  );
}

export default SignUp;
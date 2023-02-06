import { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import CustomContainer from '../../components/CustomContainer.js';
import Loader from '../../components/Loader.js';
import axios from 'axios';

function ModelTableLayout(props) {

  const user = useSelector(state => state.signInReducer.user);

  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
    
  useEffect(() => {
    async function fetchData() {

      if (props.adminOnly) {
        
        const config = {
          headers: {
            Authorization: `Bearer ${user.token.access}`,
          }
        }

        const { data } = await axios.get(
          `/api/${props.path}`,
          config,
        );

        setData(data);
        setFetched(true);
      } else {
        const { data } = await axios.get(`/api/${props.path}`);
        
        setData(data);
        setFetched(true);
      }
    }
    fetchData();
  }, [props, user.isAdmin, user.token.access]);

  const handleClick = (data) => {
    window.history.pushState(data, '', `#/admin/${props.name.toLowerCase()}/${data.id}/change`);
  }


  

  if (fetched) {

    return (
      <>
      <CustomContainer xs={12} md={6}>
        {props.name !== 'User' &&
          <LinkContainer
            to={`/admin/${props.name.toLowerCase()}/add`}
          >
            <Container className='d-flex justify-content-end'>
              <Button>
                Add new {props.name.toLowerCase()}
              </Button>
            </Container>
          </LinkContainer>
        }
        <Table striped hover={true}>
          <thead>
            <tr>
              <th>{props.name}s</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, index) => {
              if (props.path === 'users') {
                return (
                  <tr 
                    key={index} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClick(data[index])}
                  >
                    <LinkContainer to={`/admin/${props.name.toLowerCase()}/${d.id}/change`}>
                      <td>{d.username}</td>
                    </LinkContainer>
                  </tr>
                )
              } else {
                return (
                  <tr 
                    key={index} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClick(data[index])}
                  >
                    <LinkContainer to={`/admin/${props.name.toLowerCase()}/${d.id}/change`}>
                      <td>{props.name} object ({d.id})</td>
                    </LinkContainer>
                  </tr>
                )
              }
            })}
          </tbody>
        </Table>
      </CustomContainer>
      </>
    );
  }
  
  return <Loader></Loader>;
}

export default ModelTableLayout;
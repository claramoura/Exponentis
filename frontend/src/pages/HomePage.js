import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import UserProgress from '../components/UserProgress.js';
import MessageAlert from '../components/MessageAlert.js';
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.signInReducer.user);
    
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/courses');
      setData(data);
    };
    fetchData();
  }, []);
    
  function formatUnitPath(unitTitle) {
    for (let i = 0; i < unitTitle.length; i++) {
      unitTitle = unitTitle.replace(' ', '-')
    }
    return unitTitle.toLowerCase();
  }

  return (
    <>
    {!user &&
      <MessageAlert homepage message='Sign in to save your progress!' />
    }
    {data.length !== 0 &&
      <Container>
        <Row xs={1} md={data.length} className="g-4">
        {data.map(d => (
          <Col key={d.course}>
            <Card>
              <Card.Body>
                {user ?
                  <div>
                  <Card.Title className="text-center my-3">{d.course}</Card.Title>
                  <UserProgress completed={user.courseProgress[d.id]} />
                  </div>
                :
                  <Card.Title className="text-center my-3">{d.course}</Card.Title>
                }
                <ListGroup className="list-group my-3">
                  {d.units.map((unit) => (
                    <LinkContainer to={`/${d.course.toLowerCase()}/${formatUnitPath(unit.title)}`} key={unit.id}>
                      <ListGroup.Item as="a" className="text-center">{unit.title}</ListGroup.Item>
                    </LinkContainer>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
        </Row>
      </Container>
    }
    </>
  );
}
            
export default HomePage;
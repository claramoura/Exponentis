import { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ExamplePlusPractice from '../components/ExamplePlusPractice';
import UserProgress from '../components/UserProgress.js';
import KeyConcept from '../components/KeyConcept.js';
import CustomContainer from '../components/CustomContainer.js';
import axios from 'axios';


function getUnitId(course, unit) {
  let id = '';
  // A unit's id starts with the first three (uppercased) letters of its parent course, unless
  // the parent course is trigonometry. 
  if (course.toLowerCase() === 'trigonometry') {
    id += 'TRIG';
  } else {
    id += course.slice(0,3).toUpperCase();
  }
  // Adds first initial of the unit title to `id`
  id += unit[0];
  // Adds remaining initials
  for (let i = 1; i < unit.length; i++) {
    if (unit[i] === '-') {
      id += unit[i+1];
    }
  }
  return id;
}

function UnitLessons() {
  
  const { course, unit } = useParams();

  const [lessons, setLessons] = useState([]);

  const user = useSelector(state => state.signInReducer.user);

  useEffect(() => {
    async function fetchLessons() {
      const { data } = await axios.get(`/api/unit/${getUnitId(course, unit)}`);
      setLessons(data);
    };
    fetchLessons();
  }, [course, unit]);

  return (
    <>
    <CustomContainer xs={14} md={7}>
      {lessons.length !== 0 &&
      <Container>
        <Container>
          {user &&
            <Card border='light'>
              <Card.Body>
                {<UserProgress 
                  completed={user.unitProgress[getUnitId(course, unit)]} 
                />}
              </Card.Body>
            </Card>
          }
        </Container>
        {lessons.map((lesson, index) => {
          return (
            <Card className='m-2' border='light' key={`${index}`}>
              <Card.Header>{lesson.title}</Card.Header>
              <Card.Body>
                <KeyConcept lesson={lesson} />
                {lesson.pairs.map((pair, index) => {
                  return (
                    <div key={`${index}`}>
                      <ExamplePlusPractice exampleId={pair.example} practiceId={pair.practice} user={user} />
                    </div>
                  )}
                )}
              </Card.Body>
            </Card> 
          )}
        )}
      </Container>
      }
    </CustomContainer>
    </>
  );

}

export default UnitLessons;

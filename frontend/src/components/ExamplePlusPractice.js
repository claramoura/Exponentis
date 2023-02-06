import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import ExampleModal from './ExampleModal.js';
import MultipleChoicePracticeModal from './MultipleChoicePracticeModal.js';
import ShortAnswerPracticeModal from './ShortAnswerPracticeModal.js';
import Checkmark from '../components/Checkmark.js';
import axios from 'axios';

function ExamplePlusPractice(props) {

  const [exampleOpen, setExampleOpen] = useState(false);
  const [practiceOpen, setPracticeOpen] = useState(false);

  const toggleModals = () => {
    if (practiceOpen) {
      setPracticeOpen(false);
      setExampleOpen(true);
    } 
    else if (exampleOpen) {
      setExampleOpen(false);
      setPracticeOpen(true);
    }
  };

  const [exampleData, setExampleData] = useState([]);
  const [practiceData, setPracticeData] = useState([]);

  useEffect(() => {
    async function fetchExampleData() {
        const { data } = await axios.get(`/api/example/${props.exampleId}`);
        setExampleData(data);
    };
    async function fetchPracticeData() {
        const { data } = await axios.get(`/api/exercise/${props.practiceId}`);
        setPracticeData(data);
    };
    fetchExampleData();
    fetchPracticeData();
  }, [props]);

  return (
    <>
    <Container className="py-2">
      <Button variant="primary" onClick={() => setExampleOpen(true)}>
        Example + Practice {props.practiceId[props.practiceId.length - 1]}
      </Button>
      {(props.user && props.user.submissions.includes(props.practiceId)) &&
        <Checkmark />
      } 
    </Container>
    <ExampleModal 
      example={exampleData} 
      open={exampleOpen} 
      close={() => setExampleOpen(false)}
      goToPractice={toggleModals}
    />
    {practiceData.responseType === 'MC' &&
      <MultipleChoicePracticeModal
        practice={practiceData} 
        open={practiceOpen}
        close={() => setPracticeOpen(false)}
        backToExample={toggleModals}
      />
    }
    {practiceData.responseType  === 'SA' &&
      <ShortAnswerPracticeModal
        practice={practiceData} 
        open={practiceOpen}
        close={() => setPracticeOpen(false)}
        backToExample={toggleModals}
      />
    }
    </>
  );
}

export default ExamplePlusPractice;
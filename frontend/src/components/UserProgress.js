import ProgressBar from 'react-bootstrap/ProgressBar';

function UserProgress(props) {
  const completed = props.completed;
  return <ProgressBar variant="info" now={completed} label={`${completed}% completed`} />;
}

export default UserProgress;
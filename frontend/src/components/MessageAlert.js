import Alert from 'react-bootstrap/Alert';

function MessageAlert(props) {

  const customStyle = {
    width: '300px',
    textAlign: 'center',
  }
  
  if (props.homepage) {
    return (
      <>
      <Alert
        className='mx-auto'
        style={customStyle}
        variant='warning'
      >
        {props.message}
      </Alert>
      </>
    );
  }

  return (
    <>
    <Alert
      style={customStyle}
      variant='warning'
    >
      {props.message}
    </Alert>
    </>
  );
}

export default MessageAlert;
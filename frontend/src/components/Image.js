import { useState, useEffect } from 'react';
import Loader from './Loader.js';
import '../stylesheets/Image.css';
import axios from 'axios';

function Image(props) {
  
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchGraph() {
      const { data } = await axios.get(`/api/image/${props.imageId}`);
      setData(data);
      setFetched(true);
    };
    fetchGraph();
  }, [props]);

  if (fetched) {
    return <img src={data.file} alt='' />
  }

  return <Loader></Loader>;
}

export default Image;
import { useState, useEffect, useLayoutEffect } from 'react';
import Loader from './Loader.js'
import '../stylesheets/Graph.css';
import axios from 'axios';

function Graph(props) {  
    
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchGraph() {
      const { data } = await axios.get(`/api/graph/${props.graphId}`);
      setData(data);
      setFetched(true);
    };
    fetchGraph();
  }, [props]);

  useLayoutEffect(() => {
    const Desmos = window['Desmos'];            
    const elt = document.getElementById(props.graphId);

    const calculator = Desmos.GraphingCalculator(elt);

    calculator.updateSettings({
      expressionsCollapsed: true,
      actions: false, 
      zoomButtons: false, 
    });

    calculator.updateSettings({
      autosize: false,
    });

    if (fetched === true) {
      // Plots an expression
      calculator.setExpression(data.expression);

      if (Object.keys(data.settings).length !== 0 || data.settings !== null) {
        // Updates settings
        calculator.updateSettings(data.settings);
      }
      if (data.points.length !== 0 || data.points !== null) {
        // Plots points for the expression above
        calculator.setExpressions(data.points);
      }
      if (Object.keys(data.mathBounds).length !== 0 || data.mathBounds !== null) {
        // Adjusts graph bounds
        calculator.setMathBounds(data.mathBounds);
      }
    }
    return () => {
      // Cleanup
      calculator.destroy();
    }
  }, [props.graphId, data, fetched]);

  if (fetched === true) {

    return <div id={props.graphId} className='desmosCalculator'></div>;

  } else {

    return <Loader></Loader>;
  }

}

export default Graph;
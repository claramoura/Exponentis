import '../stylesheets/Katex.css';

// React component to render latex strings, based on Katex.
// Go to https://github.com/zzish/react-latex for more info.

function Katex(props) {
  const Latex = require('react-latex');

  if (props.inDisplayMode) {
    return <Latex displayMode={true} strict="newLineInDisplayMode">{props.latex}</Latex>;
  }

  return <Latex>{props.latex}</Latex>;
}
export default Katex;
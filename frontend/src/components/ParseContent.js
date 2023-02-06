import { Container } from 'react-bootstrap';
import Katex from './Katex.js';
import Graph from './Graph.js';
import Image from './Image.js';

function ParseContent(props) {

    const content = props.data;

    // Props for Katex component, in inline mode.
    let katexInline = false;
    let katex1 = '';
    
    // Props for Katex component, in display mode.
    let katexDisplay = false;
    let katex2 = '';
    
    // Props for Graph component (Desmos calculator).
    let isGraph = false;
    let desmos = '';

    // Props for ImageFile component.
    let isImageFile = false;
    let imageFile = '';

    const propsArray = [];
    
    for (let i = 0; i < content.length; i++) {
        // Checks for paragraphs that may or may not contain 
        // latex expressions, in inline mode, enclosed within `§`.
        if (content[i] === '§') {
            katexInline = !katexInline;
        }
        if (katexInline === true) {
            katex1 += content[i];
        }
        if (content[i] === '§' && katexInline === false) {
            propsArray.push(katex1);
            katex1 = '';
        }
        // Checks for a graphId, enclosed within `|`.
        if (katexInline === false && katexDisplay === false) {
            if (content[i] === '|') {
                isGraph = !isGraph;
            }
            if (isGraph === true) {
                desmos += content[i];
            }
            if (content[i] === '|' && isGraph === false) {
                propsArray.push(desmos);
                desmos = '';
            }
        }

        // Checks for an imageFile, enclosed within `#`.
        if (katexInline === false && katexDisplay === false) {
            if (content[i] === '#') {
                isImageFile = !isImageFile;
            }
            if (isImageFile === true) {
                imageFile += content[i];
            }
            if (content[i] === '#' && isImageFile === false) {
                propsArray.push(imageFile);
                imageFile = '';
            }
        }

        // Checks for latex expressions, enclosed within `@`, to be rendered in display mode.
        if (content[i] === '@') {
            katexDisplay = !katexDisplay;
        }
        if (katexDisplay === true) {
            katex2 += content[i];
        }
        if (content[i] === '@' && katexDisplay === false) {
            propsArray.push(katex2);
            katex2 = '';
        }
    }

    return (
        <>
        {propsArray.map((item, index) => {
          if (item[0] === '|') {
            return (
                <Container className='py-2' key={item.slice(1)}>
                    <Graph graphId={item.slice(1)} />
                </Container>
            );  
          } else if (item[0] === '@') {
            return (
                <Container className='py-2' key={`katexDisplay${index+1}`}>
                    <Katex inDisplayMode latex={item.slice(1)} />
                </Container>
            );
          } else if (item[0] === '#') {
            return (
                <Container className='py-2' key={item.slice(1)}>
                    <Image imageId={item.slice(1)} />
                </Container>
            );
          } else {
            return (
                <Container className='py-2' key={`katexInline${index+1}`}>
                    <Katex latex={item.slice(1)} />
                </Container>
            );
          }
        })}
        </>
    );

}
export default ParseContent;
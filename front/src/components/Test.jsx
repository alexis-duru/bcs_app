import React, { useState } from 'react';
import axios from 'axios';

const Test  = () => {

    const [visible, setVisible] = useState(false);

    return (
         <>
         <h1>TEST</h1>
         <h1>TEST</h1>
         <h1>TEST</h1>
         <h1>TEST</h1>
         <h1>TEST</h1>
       


    <div>
      <button onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button>
      {visible && <div>My element</div>}
    </div>
    );
    </> );
}
 
export default Test;
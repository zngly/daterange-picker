import React, { useState } from 'react';
import './App.css';

import { DateRangePicker } from '../daterange-picker/main';

function App() {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <div className='App'>
            <button onClick={toggle} style={{ width: '100px', height: '50px' }}>
                Click Me
            </button>
            <DateRangePicker
                open={open}
                onChange={() => {}}
                toggle={() => {
                    setOpen(!open);
                }}
                wrapperClassName='daterange-picker-wrapper'
            />
        </div>
    );
}

export default App;

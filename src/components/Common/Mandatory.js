import React from 'react';

function Mandatory(props) {
    const Mandatory = {
        "color" : "red", 
        "fontWeight" : "400", 
        "textAlign" : "right", 
        "padding" : "0 10px 0 0"
    }
    return (
        <>
            <div style={Mandatory}>
                <span className="declined">*Mandatory</span>
            </div>
        </>
    );
}

export default Mandatory;
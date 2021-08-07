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
            <div style={{ display: "flex", fontWeight : "400", justifyContent: "flex-end", padding :"0 15px 10px 0" }}>
                <span className="declined">*Mandatory</span>
            </div>
        </>
    );
}

export default Mandatory;
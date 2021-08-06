import React from 'react';

function Mandatory(props) {
    return (
        <>
            <div style={{ display: "flex", fontWeight : "400", justifyContent: "flex-end", padding :"0 15px 10px 0" }}>
                <span className="declined">*Mandatory</span>
            </div>
        </>
    );
}

export default Mandatory;
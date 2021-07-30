import React from 'react';

function Mandatory(props) {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span className="declined">*Mandatory</span>
            </div>
        </>
    );
}

export default Mandatory;
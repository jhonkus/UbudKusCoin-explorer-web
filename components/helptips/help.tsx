import copy from 'copy-to-clipboard';
import { useState } from 'react';



const HelpTips = ({ tips }) => {
    return (
            <span data-toggle="tooltip" data-placement="top" style={{ cursor: 'pointer' }} title={tips}>
                <i className="bi bi-question-circle text-muted"></i>&nbsp;
            </span>
    )
}
export default HelpTips;
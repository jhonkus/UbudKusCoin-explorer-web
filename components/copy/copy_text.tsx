import copy from 'copy-to-clipboard';
import { useState } from 'react';



const CopyText = ({ msg, text }) => {
    const [isShow, setIsShow] = useState(false);

    function handleCopy() {
        setIsShow(true);
        copy(text);
        setTimeout(function() { setIsShow(false); }, 500);

    }

    return (
            <span data-toggle="tooltip" data-placement="top" style={{ cursor: 'pointer' }} title={msg} onClick={handleCopy}>
                <i className=""></i>
            {!isShow && <span>&nbsp;<i className="bi bi-files"></i></span>}
            {isShow && <span>&nbsp;<i className="bi bi-check-circle"></i> copied</span>}
            </span>
    )
}
export default CopyText;
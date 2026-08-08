import copy from 'copy-to-clipboard';
import { useState } from 'react';

const CopyText = ({ msg, text }) => {
    const [isShow, setIsShow] = useState(false);

    function handleCopy() {
        setIsShow(true);
        copy(text);
        setTimeout(function() { setIsShow(false); }, 800);
    }

    return (
        <span
            role="button"
            tabIndex={0}
            aria-label={msg}
            title={msg}
            onClick={handleCopy}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCopy(); }}
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.85em', whiteSpace: 'nowrap' }}
        >
            {!isShow && <i className="bi bi-files"></i>}
            {isShow && <span className="d-inline-flex align-items-center gap-1 text-success"><i className="bi bi-check-circle"></i> copied</span>}
        </span>
    )
}
export default CopyText;

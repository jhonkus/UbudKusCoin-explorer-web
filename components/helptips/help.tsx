import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'



const HelpTips = ({ tips }) => {

    const popoverTop = (
        <Popover id="poperHelp" title="Popover bottom" style={{ padding: '10px', marginLeft: '10px' }}>
            {tips}
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger="click"
            rootClose
            placement="top" overlay={popoverTop}>
            <i className="bi bi-question-circle text-muted" style={{ cursor: 'pointer', marginRight: '10px' }} />
        </OverlayTrigger>
    )
}
export default HelpTips;



import './Length.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

function Length({ title, changeTime, type, time }) {

    return (
        <div className="ajust-title">
            <h3 id={type+"-label"}>{title}</h3>
            <div className="time-sets d-flex justify-content-center">
                <button id={type+"-decrement"} className="button" onClick={() => changeTime(-60, type)}>
                    <FontAwesomeIcon icon={faMinus} />
                </button>
                <h3 id={type+"-length"}>{time/60}</h3>
                <button id={type+"-increment"} className="button" onClick={() => changeTime(60, type)}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
};

export default Length;
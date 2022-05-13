import "../themes.css"
import "./Toggle.css"

const Toggle = (props) => {
    return (
        <div>

            <label className={"switch"}>
                <input type="checkbox" onChange={props.toggleFunction} checked={props.darkState}/ >
                    <span className="slider round"></span>
            </label>

        </div>
    );
}

export default Toggle
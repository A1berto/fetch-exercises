import React from "react"

export default function ButtonSort(props) {

    return (
        <label>
            <input
                type="radio"
                value={props.sortType}
                className="form-check-input"
                checked={props.sorted === props.number}
                onClick={() => props.sortBy()}
            />
            {props.sortType}
        </label>
    )
}
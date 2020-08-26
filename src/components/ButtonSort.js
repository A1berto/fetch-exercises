import React from "react"
import { Radio } from '@material-ui/core';

export default function ButtonSort(props) {

    return (
        <label>
            <Radio
                value={props.sortType}
                color="primary"
                checked={props.sorted === props.number}
                onChange={() => props.sortBy()}
                //onClick={() => props.sortBy()}
            />
            {props.sortType}
        </label>
    )
}
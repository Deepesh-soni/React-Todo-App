import React, { useState } from 'react';
import './SearchPage.scss';
const { default: DisplayTasks } = require("../components/DisplayTasks");
const { default: SimpleSelect } = require("../components/SimpleSelect");


function SearchPage() {
    const [status, setStatus] = useState();
    return (
        <div className="SearchPage">
            <SimpleSelect status={status} setStatus={setStatus}/>
            <div className="Container">
                <DisplayTasks requiredStatus={status} />
            </div>
        </div>
    )
}

export default SearchPage;
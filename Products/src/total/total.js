import React from 'react';
import '../App.css';

function Total(props) {
    const [qty, setqty] = React.useState(5);

    function buy() {
        console.log('aloooo')
        const value = qty  +1
        setqty(value);
        console.log(value)
    }

    return(
        <div>
            <h3>Total Cash: {props.total}</h3>
        </div>
    )
}

export default Total;

import React, { PureComponent } from 'react';
import leftPad from 'left-pad';

export default class Luke extends PureComponent {

    render() {
        const {day, winner, bonus} = this.props.lukeData;
        return (
            <div id="luke">
                <h2>Luke #{day}</h2>

                <p>Vinner: {winner}</p>
                {bonus && <p>Bonus: {bonus}</p>}

                <img src={`imgs/${leftPad(day, 2, '0')}.gif`}/>
            </div>
        )
    }
}

import React, { PureComponent } from 'react';
import leftPad from 'left-pad';

export default class Luke extends PureComponent {
    render() {
        const {name, day, winner, bonus} = this.props.lukeData;
        return (
            <div id="luke">
                <h2>#{day}</h2>

                <img className="gif" src={`imgs/${leftPad(day, 2, '0')}.gif`}/>

                <h3>{name}</h3>

                <p>
                    <img className="icon" src="imgs/super_mushroom.png" /> <strong>{winner}</strong>
                    {bonus && <span>&nbsp;&nbsp;&nbsp;<img className="icon" src="imgs/cherry_bonus.png" /> <strong>{bonus}</strong></span>}
                </p>

            </div>
        )
    }
}

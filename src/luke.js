import React, { PureComponent } from 'react';
import leftPad from 'left-pad';

export default class Luke extends PureComponent {
    render() {
        const {name, day, extra, winner, bonus} = this.props.lukeData;
        return (
            <div id="luke">
                <h2>#{day}</h2>

                <img className="gif" src={`dest/imgs/${leftPad(day, 2, '0')}.gif`}/>

                <h3>{name}</h3>

                <p>
                    <img className="icon" src="dest/imgs/super_mushroom.png" /> <strong>{winner}</strong>
                    {bonus && <span>&nbsp;&nbsp;&nbsp;<img className="icon" src="dest/imgs/cherry_bonus.png" /> <strong>{bonus}</strong></span>}
                    {extra.name && <span>&nbsp;&nbsp;&nbsp;<img className="icon" src="dest/imgs/carrot_bonus.png" /> <strong>{extra.name}</strong>(+{extra.points})</span>}
                </p>

            </div>
        )
    }
}

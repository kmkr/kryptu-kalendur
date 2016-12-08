import React, { PureComponent } from 'react';
import leftPad from 'left-pad';

export default class Luke extends PureComponent {

    renderText() {
        const {winner, bonus} = this.props.lukeData;

        if (winner === bonus) {
            return <span><strong>{winner}</strong> var både raskest og tok bonusen!</span>;
        }

        if (bonus) {
            return (
                <span>
                    <strong>{winner}</strong> var raskest og <strong>{bonus}</strong> fikk bonus!
                </span>
            );
        }

        return (
            <span>
                <strong>{winner}</strong> vant denne!
            </span>
        );

    }

    render() {
        const {name, day, winner, bonus} = this.props.lukeData;
        return (
            <div id="luke">
                <h2>#{day}</h2>

                <img src={`imgs/${leftPad(day, 2, '0')}.gif`}/>

                <h3>{name}</h3>

                <p>
                    {this.renderText()}
                </p>

            </div>
        )
    }
}

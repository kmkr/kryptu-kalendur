import React, { PureComponent } from 'react';
import leftPad from 'left-pad';

export default class Luke extends PureComponent {
    constructor() {
        super();
        this.state = {
            loaded: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.lukeData !== this.props.lukeData) {
            this.setState({
                loaded: false
            });
        }
    }

    show() {
        this.setState({
            loaded: true
        });
    }
    render() {
        const {name, day, extra, winner, bonus} = this.props.lukeData;
        return (
            <div id="luke">
                <h2>#{day}</h2>

                {!this.state.loaded && <img className="gif" src="dest/imgs/loading.svg"/>}

                <img style={{display: this.state.loaded ? 'inline-block' : 'none'}} onLoad={this.show.bind(this)} className="gif" src={`dest/imgs/${leftPad(day, 2, '0')}.gif`}/>

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

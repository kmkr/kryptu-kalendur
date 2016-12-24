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

                <img style={{display: this.state.loaded ? 'inline-block' : 'none'}} onLoad={this.show.bind(this)} className="gif" src={`dest/imgs/${leftPad(day, 2, '0')}.gif`}/>
                {this.state.loaded ? (
                    <div>
                        <h3>{name}</h3>
                        <div>
                            <div style={{display: 'inline-block'}}>
                                <img className="icon" src="dest/imgs/super_mushroom.png" /> <strong>{winner}</strong>
                            </div>
                            <div style={{display: 'inline-block'}}>
                                {bonus && <span>&nbsp;&nbsp;&nbsp;<img className="icon" src="dest/imgs/cherry_bonus.png" /> <strong>{bonus}</strong></span>}
                            </div>
                            <div style={{display: 'inline-block'}}>
                                {extra.name && <span>&nbsp;&nbsp;&nbsp;<img className="icon" src="dest/imgs/carrot_bonus.png" /> <strong>{extra.name}</strong>(+{extra.points})</span>}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <img className="loading" src="dest/imgs/loading.svg"/>
                    </div>
                )}
            </div>
        )
    }
}

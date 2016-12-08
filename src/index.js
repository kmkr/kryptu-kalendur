import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Leaderboard from './leaderboard';
import Luke from './luke';
import './app.less';

const users = [
    {id: 1, name: 'M. Worren'},
    {id: 2, name: 'D00n'},
    {id: 3, name: 'T. Virik'},
    {id: 4, name: 'DJ MIkky'},
    {id: 5, name: 'A. Stokke'},
    {id: 6, name: 'B0Do'},
    {id: 7, name: 'H. Stokke'},
];

const calendar = [
    {winner: 1, bonus: 1}, // spirited a
    {winner: 2, bonus: 2}, // jurassic
    {winner: 3}, // moon
    {winner: 1}, // moonrise
    {winner: 5}, // fantastic planet
    {winner: 4, bonus: 6}, // napoleon
    {winner: 7, bonus: 7}, // kung fu hustle
    {winner: 5}, // under the skin
];

const scoreObj = calendar.reduce((cur, luke) => {
    cur[luke.winner] = (cur[luke.winner] || 0) + 1;
    if (luke.bonus) {
        cur[luke.bonus] = (cur[luke.bonus] || 0) + 0.5;
    }

    return cur;
}, {});

const scores = Object.keys(scoreObj).map(key => {
    return {
        name: users.find(u => `${u.id}` === key).name,
        points: scoreObj[key]
    };
}).sort((a, b) => {
    if (a.points === b.points) {
        return 0;
    }

    return a.points < b.points ? 1 : -1;
});

class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            showLeaderboard: true,
            showLukeNumber: -1
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.showLeaderboard) {
                this.setState({
                    showLeaderboard: false,
                    showLukeNumber: 0
                });
            } else {
                if (this.state.showLukeNumber === (calendar.length - 1)) {
                    this.setState({
                        showLeaderboard: true,
                        showLukeNumber: -1
                    });
                } else {
                    this.setState({
                        showLeaderboard: false,
                        showLukeNumber: this.state.showLukeNumber + 1
                    });
                }
            }
        }, 5000000)
    }

    getLukeData(num) {
        const luke = calendar[num];
        const winner = users.find(u => u.id === luke.winner).name;
        let bonus;
        if (luke.bonus) {
            bonus = users.find(u => u.id === luke.bonus).name;
        }

        return {day: num + 1, winner, bonus}
    }

    renderHeader() {
        const txt = 'Kryptu Kalendur';

        return txt.split('').map((char, idx) => (
            <span key={idx} className={`char char${idx}`}>{char}</span>
        ));
    }

    render() {
        return (
            <div>
                <h1>{this.renderHeader()}</h1>
                {this.state.showLeaderboard && <Leaderboard scores={scores}/>}
                {this.state.showLukeNumber > -1 && <Luke lukeData={this.getLukeData(this.state.showLukeNumber)}/>}
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

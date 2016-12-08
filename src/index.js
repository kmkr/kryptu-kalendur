import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import Leaderboard from './leaderboard';
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
    render() {
        return (
            <div>
                <h1>Kryptu Kalendur</h1>
                <Leaderboard scores={scores}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

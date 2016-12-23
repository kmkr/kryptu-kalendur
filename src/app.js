import React, { PureComponent } from 'react';

import Leaderboard from './leaderboard';
import Luke from './luke';
import './app.less';

const users = [
    {id: 1, name: 'M. Worren'},
    {id: 2, name: 'Dune'},
    {id: 3, name: 'T. Virik'},
    {id: 4, name: 'DJ MIkky'},
    {id: 5, name: 'A. Stokke'},
    {id: 6, name: 'B0Do'},
    {id: 7, name: 'H. Stokke'},
    {id: 8, name: 'H0mo'},
    {id: 9, name: 'Second Father'},
    {id: 10, name: 'Matty'},
    {id: 11, name: 'Guddi'},
    {id: 12, name: 'Roondi'},
];

const calendar = [
    {name: 'Spirited Away', winner: 1, bonus: 1},
    {name: 'Jurassic Park (AKA Jurussika Park)', winner: 2, bonus: 2},
    {name: 'Moon', winner: 3},
    {name: 'Moonrise Kingdom', winner: 1},
    {name: 'Fantastic Planet', winner: 5, extra: { id: 4, points: 0.5 }},
    {name: 'Napoleon Dynamite', winner: 4, bonus: 6},
    {name: 'Kung Fu Hustle', winner: 7, bonus: 7},
    {name: 'Under The Skin', winner: 5},
    {name: '2001 A Space Odyssey', winner: 5, bonus: 5},
    {name: 'Snatch', winner: 3, bonus: 3},
    {name: 'Delicatessen', winner: 1},
    {name: 'Star Wars Ep 4', winner: 8, bonus: 9, extra: { id: 10, points: 0.25 }},
    {name: 'Nausicaã', winner: 1, bonus: 1, extra: { id: 5, points: 1 } },
    {name: 'Alien', winner: 1, bonus: 5 },
    {name: 'It Follows', winner: 5 },
    {name: 'Blade Runner', winner: 5, bonus: 5, extra: { id: 7, points: 1 } },
    {name: 'The Red Turtle', winner: 11 },
    {name: 'Pulp Fiction', winner: 5 },
    {name: 'The Iron Giant', winner: 5 },
    {name: 'The Meaning of Life', winner: 6, extra: { id: 12, points: 0.75 } },
    {name: 'Corpse Bride', winner: 1 },
    {name: 'The Big Fish', winner: 1, bonus: 1 },
    {name: 'Wild Tales', winner: 8 },
    {name: 'The Intouchables', winner: 2, bonus: 1 },
];

const scoreObj = calendar.reduce((cur, luke) => {
    cur[luke.winner] = (cur[luke.winner] || 0) + 1;
    if (luke.bonus) {
        cur[luke.bonus] = (cur[luke.bonus] || 0) + 0.5;
    }

    if (luke.extra) {
        cur[luke.extra.id] = (cur[luke.extra.id] || 0) + luke.extra.points;
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

export default class App extends PureComponent {
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
        }, 2000)
    }

    getLukeData(num) {
        const luke = calendar[num];
        const winner = users.find(u => u.id === luke.winner).name;
        let bonus;
        if (luke.bonus) {
            bonus = users.find(u => u.id === luke.bonus).name;
        }

        let extra = {};
        if (luke.extra) {
            extra = {
                name: users.find(u => u.id === luke.extra.id).name,
                points: luke.extra.points
            };
        }

        return {
            day: num + 1,
            extra,
            winner,
            bonus,
            name: luke.name
        };
    }

    renderHeader() {
        const txt = 'Kryptu Kalendur';

        return txt.split('').map((char, idx) => (
            <span key={idx} className={`char${idx}`}>{char}</span>
        ));
    }

    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return (
            <div>
                <div id="wrapper">
                    <h1>{this.renderHeader()}</h1>
                    {this.state.showLeaderboard && <Leaderboard scores={scores}/>}
                    {this.state.showLukeNumber > -1 && <Luke lukeData={this.getLukeData(this.state.showLukeNumber)}/>}
                </div>
            </div>
        )
    }
}

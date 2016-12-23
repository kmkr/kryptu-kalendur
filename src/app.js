import React, { PureComponent } from 'react';

import Leaderboard from './leaderboard';
import Luke from './luke';
import Swipable from 'react-swipeable';
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
    {day: 1, name: 'Spirited Away', winner: 1, bonus: 1},
    {day: 2, name: 'Jurassic Park (AKA Jurussika Park)', winner: 2, bonus: 2},
    {day: 3, name: 'Moon', winner: 3},
    {day: 4, name: 'Moonrise Kingdom', winner: 1},
    {day: 5, name: 'Fantastic Planet', winner: 5, extra: { id: 4, points: 0.5 }},
    {day: 6, name: 'Napoleon Dynamite', winner: 4, bonus: 6},
    {day: 7, name: 'Kung Fu Hustle', winner: 7, bonus: 7},
    {day: 8, name: 'Under The Skin', winner: 5},
    {day: 9, name: '2001 A Space Odyssey', winner: 5, bonus: 5},
    {day: 10, name: 'Snatch', winner: 3, bonus: 3},
    {day: 11, name: 'Delicatessen', winner: 1},
    {day: 12, name: 'Star Wars Ep 4', winner: 8, bonus: 9, extra: { id: 10, points: 0.25 }},
    {day: 13, name: 'Nausicaã', winner: 1, bonus: 1, extra: { id: 5, points: 1 } },
    {day: 14, name: 'Alien', winner: 1, bonus: 5 },
    {day: 15, name: 'It Follows', winner: 5 },
    {day: 16, name: 'Blade Runner', winner: 5, bonus: 5, extra: { id: 7, points: 1 } },
    {day: 17, name: 'The Red Turtle', winner: 11 },
    {day: 18, name: 'Pulp Fiction', winner: 5 },
    {day: 19, name: 'The Iron Giant', winner: 5 },
    {day: 20, name: 'The Meaning of Life', winner: 6, extra: { id: 12, points: 0.75 } },
    {day: 21, name: 'Corpse Bride', winner: 1 },
    {day: 21, name: 'The Big Fish', winner: 1, bonus: 1 },
    {day: 22, name: 'Wild Tales', winner: 8 },
    {day: 23, name: 'The Intouchables', winner: 2, bonus: 1 },
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

const BACK_KEYS = [33, /* pg up */, 37/* arrow left *//* 38 arrow up */];
const NEXT_KEYS = [32/* space */, 34/* pgdn */, 39/* arrow right *//*, 40 arrow down */];

export default class App extends PureComponent {
    constructor() {
        super();
        this.state = {
            showLeaderboard: true,
            showLukeNumber: -1
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', e => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        const keyCode = e.keyCode || e.detail.keyCode;

        if (BACK_KEYS.indexOf(keyCode) !== -1) {
            this.back();
        } else if (NEXT_KEYS.indexOf(keyCode) !== -1) {
            this.next();
        }

    }

    back() {
        if (this.state.showLeaderboard) {
            this.setState({
                showLeaderboard: false,
                showLukeNumber: calendar.length - 1
            });
        } else {
            if (this.state.showLukeNumber === 0) {
                this.setState({
                    showLeaderboard: true,
                    showLukeNumber: -1
                });
            } else {
                this.setState({
                    showLeaderboard: false,
                    showLukeNumber: this.state.showLukeNumber - 1
                });
            }
        }
    }

    next() {
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
            day: luke.day,
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
            <Swipable onSwipingRight={this.next.bind(this)} onSwipingLeft={this.back.bind(this)}>
                <div id="wrapper">
                    <h1>{this.renderHeader()}</h1>
                    <div className="grid">
                        <div className="arrow-left" onClick={this.back.bind(this)}></div>

                        <div className="middle">
                            {this.state.showLeaderboard && <Leaderboard scores={scores}/>}
                            {this.state.showLukeNumber > -1 && <Luke lukeData={this.getLukeData(this.state.showLukeNumber)}/>}
                        </div>

                        <div className="arrow-right" onClick={this.next.bind(this)}></div>
                    </div>
                </div>
            </Swipable>
        )
    }
}

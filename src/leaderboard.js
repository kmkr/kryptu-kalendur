import React, { PureComponent } from 'react';

export default class Leaderboard extends PureComponent {

    render() {
        return (
            <div id="leaderboard">
                <h2>Leaderboard</h2>

                <ul>
                    {this.props.scores.map(score => <li key={score.name}>{score.name} {score.points}</li>)}
                </ul>
            </div>
        )
    }
}

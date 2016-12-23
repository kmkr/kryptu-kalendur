import React, { PureComponent } from 'react';

export default class Leaderboard extends PureComponent {

    render() {
        return (
            <div id="leaderboard">
                <ul>
                    {this.props.scores.map((score, index) => (
                        <li key={score.name} className={`leader-${index + 1}`}>
                            {score.name} ({score.points} {score.points === 1 ? 'point' : 'points'})
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

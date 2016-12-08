import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Snowfetti from 'react-snowfetti';

import App from './app';

class Wrapper extends PureComponent {
    render() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return (
            <div>
                <Snowfetti amount={100} width={width} height={height} />
                <App/>
            </div>
        )
    }
}

ReactDOM.render(<Wrapper/>, document.getElementById('app'));

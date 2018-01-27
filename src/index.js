import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="w3-button">
                {this.props.text}
            </button>
        );
    }
}

ReactDOM.render(
    <Square text={'X'}/>,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="w3-button w3-block chooseButton" onClick={() => this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        return (
            <Square text={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
        );
    }

    render() {
        const status = 'Next player: X';

        return (
            <div className="w3-center">
                <div className="status">{status}</div>
                <div className="board-row w3-row w3-bottombar">
                    <div className="w3-third">
                        {this.renderSquare(0)}
                    </div>
                    <div className="w3-third w3-leftbar w3-rightbar">
                        {this.renderSquare(1)}
                    </div>
                    <div className="w3-third">
                        {this.renderSquare(2)}
                    </div>
                </div>

                <div className="board-row w3-row w3-bottombar">
                    <div className="w3-third">
                        {this.renderSquare(4)}
                    </div>
                    <div className="w3-third w3-leftbar w3-rightbar">
                        {this.renderSquare(5)}
                    </div>
                    <div className="w3-third">
                        {this.renderSquare(6)}
                    </div>
                </div>

                <div className="board-row w3-row">
                    <div className="w3-third">
                        {this.renderSquare(7)}
                    </div>
                    <div className="w3-third w3-leftbar w3-rightbar">
                        {this.renderSquare(8)}
                    </div>
                    <div className="w3-third">
                        {this.renderSquare(9)}
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
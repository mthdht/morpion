import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="w3-button w3-block chooseButton" onClick={props.onClick}>
            {props.text}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square text={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

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
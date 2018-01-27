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
    renderSquare(i) {
        return (
            <Square text={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}/>
        );
    }

    render() {
        return (
            <div className="w3-center">
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
                        {this.renderSquare(3)}
                    </div>
                    <div className="w3-third w3-leftbar w3-rightbar">
                        {this.renderSquare(4)}
                    </div>
                    <div className="w3-third">
                        {this.renderSquare(5)}
                    </div>
                </div>

                <div className="board-row w3-row">
                    <div className="w3-third">
                        {this.renderSquare(6)}
                    </div>
                    <div className="w3-third w3-leftbar w3-rightbar">
                        {this.renderSquare(7)}
                    </div>
                    <div className="w3-third">
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        );
    }
}



class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: {
                'name': '',
                'score': 0,
            },
            player2: {
                'name': '',
                'score': 0,
            },
            xIsNext: true,
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        const squares = this.state.squares;
        console.log(squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
}
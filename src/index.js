import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="w3-button w3-block chooseButton w3-xxlarge w3-text-blue-gray w3-hover-text-blue-gray" onClick={props.onClick}>
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
                    <div className="w3-col s4">
                        {this.renderSquare(0)}
                    </div>
                    <div className="w3-col s4 w3-leftbar w3-rightbar">
                        {this.renderSquare(1)}
                    </div>
                    <div className="w3-col s4">
                        {this.renderSquare(2)}
                    </div>
                </div>

                <div className="board-row w3-row w3-bottombar">
                    <div className="w3-col s4">
                        {this.renderSquare(3)}
                    </div>
                    <div className="w3-col s4 w3-leftbar w3-rightbar">
                        {this.renderSquare(4)}
                    </div>
                    <div className="w3-col s4">
                        {this.renderSquare(5)}
                    </div>
                </div>

                <div className="board-row w3-row">
                    <div className="w3-col s4">
                        {this.renderSquare(6)}
                    </div>
                    <div className="w3-col s4 w3-leftbar w3-rightbar">
                        {this.renderSquare(7)}
                    </div>
                    <div className="w3-col s4">
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
                'name': 'mat',
                'score': 0,
            },
            player2: {
                'name': 'max',
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
        let status;
        if (winner) {
            status = 'Winner: ' + (winner === 'X' ? this.state.player1.name : this.state.player2.name);
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? this.state.player1.name : this.state.player2.name);
        }

        return (
            <div className="game w3-content">
                <div className="game-info  w3-container ">
                    <div className="scores w3-section">
                        <h5 className="w3-light-gray w3-row w3-padding">
                            <span className="w3-col s3 w3-text-dark-gray">Scores:</span>
                            <span className="w3-col s4 w3-center w3-text-blue-gray">
                                <span className="">player 1</span> <br/> {this.state.player1.score}
                            </span>
                            <span className="w3-col s4 w3-center w3-text-blue-gray">
                                <span className="">Player 2 </span><br/>{this.state.player1.score}
                            </span>
                        </h5>

                    </div>
                    <div className='status w3-padding w3-text-blue-gray'>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                <div className="game-board w3-container w3-margin-bottom">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="bottombar w3-bottom w3-bar w3-blue-gray w3-hide-medium w3-hide-large">
                    <div className="w3-bar-item w3-button">Rejouer</div>
                    <div className="w3-bar-item w3-button">link</div>
                    <div className="w3-bar-item w3-button">link</div>
                    <div className="w3-bar-item w3-button">link</div>
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
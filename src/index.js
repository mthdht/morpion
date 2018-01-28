import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function PlayerInfo(props) {
    return (
    <span className="w3-col s4 w3-center w3-text-blue-gray">
        <input type="text"
               name={props.name}
               value={props.player.name}
               className="w3-input w3-border w3-small"
               placeholder="Player 1"
               onChange={props.onChange}
        />
        {props.player.score}
    </span>
    );
}

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
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
    }

    handlePlayClick(event) {
        this.setState({
            squares: Array(9).fill(null),
        })
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        var that =this;
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
        setTimeout(function () {
            const winner = calculateWinner(that.state.squares);
            console.log(winner);
            if (winner) {
                if (winner === 'X') {
                    that.setState((prevState, props) => ({
                        player1 : {
                            name: prevState.player1.name,
                            score: prevState.player1.score + 1,
                        }
                    }));
                } else {
                    that.setState((prevState, props) => ({
                        player2 : {
                            name: prevState.player2.name,
                            score: prevState.player2.score + 1,
                        },
                        xIsNext: !this.state.xIsNext,
                    }));
                }
            }
        }, 200);
    }

    handleChange(event) {
        event.target.name === 'player1' ?
            this.setState({
                player1: {
                    'name': event.target.value,
                    'score': this.state.player1.score
                }
            }) :
            this.setState({
                player2: {
                    'name': event.target.value,
                    'score': this.state.player2.score
                }
            });
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        const squares = this.state.squares;
        let status;
        if (winner) {
            status = <span><span>Winner: </span> <span className="w3-text-blue-gray w3-xlarge">{winner === 'X' ? this.state.player1.name : this.state.player2.name}</span></span>;
        } else {
            status = <span><span>Joueur Suivant:</span> <span className="w3-text-blue-gray w3-xlarge">{this.state.xIsNext ? this.state.player1.name : this.state.player2.name}</span></span>;
        }

        return (
            <div className="game w3-content ">
                <div className="game-info ">
                    <div className="scores ">
                        <div className="w3-light-gray w3-row-padding w3-padding">
                            <span className="w3-col s3 w3-text-dark-gray">Scores:</span>
                            <PlayerInfo player={this.state.player1} name="player1" onChange={this.handleChange}/>
                            <PlayerInfo player={this.state.player2} name="player2" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className='status w3-padding w3-text-blue-gray'>{status}</div>
                </div>
                <div className="game-board w3-container">
                    <Board squares={squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="bottombar w3-bottom w3-blue-gray w3-center w3-padding">
                    <div className="w3-button w3-light-gray" onClick={this.handlePlayClick}>Re-jouer</div>
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
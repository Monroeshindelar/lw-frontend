import React, { Component } from "react";
import "./AccountDetailView.css";
import { Link } from "react-router-dom";
import { DISCORD_AVATAR_BASE_URL } from "../../constants";
import { getGamesByUserId } from "../../Utilities/GameServiceApiUtils";
import { Table } from "reactstrap";
import { GAME_DETAIL_VIEW_PATH } from "../../constants";

class AccountDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null
    }
  }

  async componentDidMount() {
    this.setState({
      games: await getGamesByUserId(this.props.account.principalId)
    });
  }

  getAvatarUrl() {
    return `${DISCORD_AVATAR_BASE_URL}/${this.props.account.principalId.toString()}/${this.props.account.avatar.toString()}.png`;
  }

  handleGameIdClick(gameId) {

  }

  render() {
    const games = [];

    var headerStyle = {
      color: "white"
    };

    if (this.state.games) {
      for(var g in this.state.games) {
        var game = this.state.games[g];
        
        games.push(
          <tr>
            <th style={headerStyle}><Link to={{
              pathname: GAME_DETAIL_VIEW_PATH,
              state: { gameId: game.id }
            }}>{game.id}</Link></th>
            <td style={headerStyle}>{game.settings.name}</td>
            <td style={headerStyle}>{game.gameState.gameStateType}</td>
            <td style={headerStyle}>{game.settings.generationId}</td>
            <td style={headerStyle}>{game.settings.difficultyMode}</td>
            <td style={headerStyle}>{game.settings.accessibility}</td>
          </tr>
        )
      }
    }

    return (
      <div className="AccountDetailView">
        <header className="App-header">
          <p>Account Detail</p>
          <p>Username: {this.props.account.username}#{this.props.account.discriminator}</p>
          <img src={this.getAvatarUrl()} alt=""></img>
          <Table>
            <thead>
              <tr>
                <th style={headerStyle}>Id</th>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>State</th>
                <th style={headerStyle}>Generation</th>
                <th style={headerStyle}>Difficulty</th>
                <th style={headerStyle}>Accessibility</th>
              </tr>
            </thead>
            <tbody>
              {games}
            </tbody>
          </Table>
          <Link to="/">Go Back to Home Page</Link>
        </header>
      </div>
    );
  }
}

export default AccountDetailView;

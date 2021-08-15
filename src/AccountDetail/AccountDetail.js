import React, { Component } from "react";
import "./AccountDetail.css";
import { Link } from "react-router-dom";
import { DISCORD_AVATAR_BASE_URL } from "../constants";

class AccountDetail extends Component {
  constructor(props) {
    super(props);
  }

  getAvatarUrl() {
    return `${DISCORD_AVATAR_BASE_URL}/${this.props.account.principalId.toString()}/${this.props.account.avatar.toString()}.png`;
  }

  render() {
    return (
      <div className="AccountDetailPage">
        <header className="App-header">
          <p>Account Detail</p>
          <p>Username: {this.props.account.username}#{this.props.account.discriminator}</p>
          <img src={this.getAvatarUrl()} alt=""></img>
          <Link to="/">Go Back to Home Page</Link>
        </header>
      </div>
    );
  }
}

export default AccountDetail;
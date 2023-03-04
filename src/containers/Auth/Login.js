import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLogin } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }
  handleOnChangeUsername = (username) => {
    this.setState({
      username: username.target.value,
    });
  };

  handleOnChangePassword = (password) => {
    this.setState({
      password: password.target.value,
    });
  };

  handleLogin = async () => {
    await handleLogin(this.state.username, this.state.password);
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: this.state.isShowPassword === false ? true : false,
    });
    console.log(this.isShowPassword);
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="..."
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label htmlFor="">Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="..."
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    class={
                      this.state.isShowPassword
                        ? "fas fa-eye-slash"
                        : "fas fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12 login-forgot">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="col-12 text-center mt-4">
              <h5>Or login with:</h5>
            </div>
            <div className="col-12 login-other">
              <button className="btn btn-danger mt-2">
                <i class="fab fa-google"></i> google
              </button>
              <button className="btn btn-primary mt-2">
                <i class="fab fa-facebook-square"></i> facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

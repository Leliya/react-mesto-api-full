import React from "react";
import FormForAuth from "./FormForAuth";

class Login extends React.Component {

  render() {
    return (
      <FormForAuth
        title="Вход"
        name="login"
        buttonName="Войти"
        onSubmit={this.props.handleLogin}
        isLoading={this.props.isLoading}
        email={this.props.email}
        password={this.props.password}
        onChange={this.props.onChange}
      />
    );
  }
}

export default Login;

import React from "react";
import { Link } from "react-router-dom";
import FormForAuth from "./FormForAuth";

class Register extends React.Component {

  render() {
    return (
      <FormForAuth
        title="Регистрация"
        name="registration"
        buttonName="Зарегистрироваться"
        onSubmit={this.props.handleRegister}
        isLoading={this.props.isLoading}
        email={this.props.email}
        password={this.props.password}
        onChange={this.props.onChange}
      >
        <span className="register__caption">
          Уже зарегистрированы? &nbsp;
          <Link to="/sign-in" className="register__caption-link">
            Войти
          </Link>
        </span>
      </FormForAuth>
    );
  }
}

export default Register;

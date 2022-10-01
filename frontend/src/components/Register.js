import React from "react";
import { Link, withRouter } from "react-router-dom";
import FormForAuth from "./FormForAuth";
import { register } from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";

class Register extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: "",
    //   password: "",
    //   isInfoTooltip: false,
    //   isRegOk: false,
    //   isLoading: false,
    // };
    //this.handleChange = this.handleChange.bind(this);
    //this.onRegister = this.onRegister.bind(this);
    // this.handlerClose = this.handlerClose.bind(this);
  }

  // handleChange(obj) {
  //   this.setState(obj);
  // }

  // onRegister() {
  //   this.setState({ isLoading: true });
  //   register(this.state.email, this.state.password)
  //     .then((res) => {
  //       if (res) {
  //         this.setState({
  //           message: "",
  //           isRegOk: true,
  //           isLoading: false,
  //         });
  //       }
  //     })
  //     .catch(() => {this.setState({
  //       message: "Что-то пошло не так! Попробуйте ещё раз.",
  //       isRegOk: false,
  //       isLoading: false,
  //     })
  //   }).finally(()=>this.setState({ isInfoTooltip: true }))
  // }

  // handlerClose() {
  //   this.setState({ isInfoTooltip: false });
  //   if (this.state.isRegOk) {
  //     this.props.history.push("./sign-in");
  //   }
  // }

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

export default withRouter(Register);

import React from "react";

function FormForAuth({
  title,
  name,
  buttonName,
  children,
  onSubmit,
  email,
  password,
  isLoading,
  onChange,
}) {
  const [isValidEmail, setValidEmailStatus] = React.useState({
    validity: false,
    message: "",
  });

  const [isValidPassword, setValidPasswordStatus] = React.useState({
    validity: false,
    message: "",
  });

  React.useEffect(() => {
    setValidEmailStatus({ validity: false, message: "" });
    setValidPasswordStatus({ validity: false, message: "" });
  }, []);

  function handleChange(e) {
    onChange(e.target.name, e.target.value);
    e.target.name === "email"
      ? setValidEmailStatus({
          validity: e.target.validity.valid,
          message: e.target.validationMessage,
        })
      : setValidPasswordStatus({
          validity: e.target.validity.valid,
          message: e.target.validationMessage,
        });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="register">
      <div className="popup__container popup__container_type_auth">
        <h2 className="popup__title popup__title_type_auth">{title}</h2>
        <form
          name={name}
          onSubmit={handleSubmit}
          className="popup__form"
          noValidate={true}
        >
          <div className="popup__fieldset">
            <input
              type="email"
              className="popup__input popup__input_type_auth popup__input_type_email"
              name="email"
              id="email"
              placeholder="Email"
              value={email || ""}
              onChange={handleChange}
              autoComplete={"off"}
              required
            />
            <span className="popup__input-error email-input-error">
              {isValidEmail.message}
            </span>
          </div>
          <div className="popup__fieldset">
            <input
              type="password"
              className="popup__input popup__input_type_auth popup__input_type_password"
              name="password"
              id="password"
              placeholder="Пароль"
              value={password || ""}
              onChange={handleChange}
              minLength={6}
              maxLength={20}
              autoComplete={"new-password"}
              required
            />
            <span className="popup__input-error password-input-error">
              {isValidPassword.message}
            </span>
          </div>
          <button
            className={
              isValidEmail.validity && isValidPassword.validity
                ? "popup__button popup__button_type_auth"
                : "popup__button popup__button_type_auth popup__button_disabled"
            }
            type="submit"
            disabled={!isValidEmail.validity && !isValidPassword.validity}
          >
            {isLoading ? "Отправка..." : buttonName}
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}

export default FormForAuth;

// import style from './index.module.scss';
import validator from 'validator';
import React, {useState} from "react";
// import isEmail from 'validator/es/lib/isEmail';

const Form = () => {
  const [values, setValues] = useState({
    login: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});

  const makeFetch = async (data) => {
    const registerUrl = "https://maliatko.herokuapp.com/v2/api-docs/login";
    const response = await fetch(registerUrl, {
      method: "POST",
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });
    console.log("response", response);
  };

  const singleCheckValidate = ({name, value}) => {
    let isValid;
    let errorText = "";
      if (name === "login") {
        isValid = validator.isEmail(value);
        if (!isValid) {
          errorText = "Введіть корректный емейл";
        }
      } else if (name === "password") {
        isValid = validator.isLength(value, {min: 8});
        if (!isValid) {
          errorText = "Введіть мінімум 8 символів";
        }
      } else if (name === "passwordConfirm") {
        isValid = validator.equals(value, values.password);
        if (!isValid) {
          errorText = "Паролі не збігаються";
        }
      }
    setErrors({...errors, [name]: errorText});
    return isValid;
  };

  const checkValidate = (values) => {
    const entriesValues = Object.entries(values);
    const formErrors = {};
    let isFormValid = true;
    for (let [key, value] of entriesValues) {
      if (key === "login") {
        const isValid = validator.isEmail(value);
        isFormValid = isFormValid && isValid;
        if (!isValid) {
          formErrors.login = "Введіть корректный емейл";
        }
      } else if (key === "password") {
        const isValid = validator.isLength(value, {min: 8});
        isFormValid = isFormValid && isValid;
        if (!isValid) {
          formErrors.password = "Введіть мінімум 8 символів";
        }
      } else if (key === "passwordConfirm") {
        const isValid = validator.equals(value, values.password);
        isFormValid = isFormValid && isValid;
        if (!isValid) {
          formErrors.passwordConfirm = "Паролі не збігаються";
        }
      }
    }
    setErrors({...formErrors});
    return isFormValid;
  };

  const handleInputChange = ({target: {name, value}}) => {
    setValues({...values, [name]: value});
  }

  const handleInputBlur = ({target: {name, value}}) => {
    singleCheckValidate({name, value});
  }

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();
    const isValid = checkValidate(values);
    if (isValid) {
      const userInfo = {
        user: values.login,
        password: values.password,
      }
      console.log(userInfo);
      makeFetch(userInfo);
    } else {
      console.log("Invalid");
    }
  };
  return (
    <div
      className="registrationPage_form"
    >
      <label className="registrationPage_form_label login" htmlFor="loginReg">
        Логін
      </label>
      <input
        name="login"
        placeholder="Email"
        className="registrationPage_form_login login"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <p className="registrationPage_form_loginError">{errors.login}</p>
      <label
        className="registrationPage_form_label password"
        htmlFor="passwordReg"
      >
        Пароль
      </label>
      <input
        name="password"
        type="password"
        placeholder="********"
        className="registrationPage_form_password password"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <p className="registrationPage_form_passwordError">{errors.password}</p>
      <label
        className="registrationPage_form_label password2"
        htmlFor="password2Reg"
      >
        Повторіть пароль
      </label>
      <input
        name="passwordConfirm"
        type="password"
        placeholder="********"
        className="registrationPage_form_password2 password2"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      <p className="registrationPage_form_passwordError2">{errors.passwordConfirm}</p>
      <button
        onClick={handleSubmitButtonClick}
        className="registrationPage_form_button button"
      >
        Зареєструватись
      </button>
    </div>
  );
}

export default Form;



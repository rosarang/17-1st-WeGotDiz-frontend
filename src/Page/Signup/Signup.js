import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Signup.scss';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      email: '',
      emailError: '',
      name: '',
      pw: '',
      pwError: '',
      pwCheck: '',
      pwCheckError: '',
    };
  }

  handleCheck = e => {
    this.setState({ checked: e.target.checked });
  };

  //Value 확인
  handleInput = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  // email value check
  isEmail = email => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  onEmailValidation = () => {
    if (!this.isEmail(this.state.email)) {
      this.setState({
        emailError: '이메일 형식이 올바르지 않습니다.',
      });
    } else {
      this.setState({ emailError: '' });
    }
  };

  // password value check
  isPassword = pw => {
    const pwRegex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return pwRegex.test(pw);
  };

  onPwValidation = () => {
    if (!this.isPassword(this.state.pw)) {
      this.setState({
        pwError: '영문, 숫자, 특수문자를 조합한 8자 이상',
      });
    } else {
      this.setState({ pwError: '' });
    }
  };

  onPwCheckValidation = () => {
    const checkPw = this.state.pwCheck;
    if (this.state.pw !== checkPw) {
      this.setState({
        pwCheckError: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      this.setState({
        pwCheckError: '',
      });
    }
  };

  goToMain = () => {
    fetch('', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        name: this.state.name,
        pw: this.state.pw,
        pwCheck: this.state.pwCheck,
      }),
    })
      .then(response => response.json())
      .then(result =>
        result.message === 'SUCCESS'
          ? this.props.history.push('/')
          : alert('회원가입 실패')
      );
  };

  render() {
    const { emailError, pwError, pwCheckError } = this.state;
    return (
      <div className="signUpContainer">
        <form className="signUpbox">
          <h1>회원가입</h1>
          <div className="agreement">
            <input
              type="checkbox"
              id="agreementCheckbox"
              checkbox={this.state.checkde}
              onChange={this.handleCheck}
            />
            <label for="inputCheckbox" className="checkboxText">
              전체 동의
            </label>
            <p>
              위갓디즈 서비스 이용약관(필수), 개인정보 수집 ∙ 이용 동의(필수),
            </p>
            <p>마케팅 정보 수신 동의(선택)</p>
          </div>
          <div className="signUpEmail">
            <input
              className="emailInput"
              type="text"
              placeholder="이메일 계정"
              name="email"
              onChange={this.handleInput}
              onKeyUp={this.onEmailValidation}
            />
            <div className="errorMessage">{emailError}</div>
          </div>
          <input
            className="nameInput"
            type="text"
            placeholder="이름"
            name="name"
            onChange={this.handleInput}
          />
          <div className="passwordInput">
            <input
              type="password"
              placeholder="비밀번호 입력"
              name="pw"
              onChange={this.handleInput}
              onKeyUp={this.onPwValidation}
            />
            {<div className="errorMessage">{pwError}</div>}
            <input
              type="password"
              placeholder="비밀번호 확인"
              name="pwCheck"
              onChange={this.handleInput}
              onKeyUp={this.onPwCheckValidation}
            />
            {<div className="errorMessage">{pwCheckError}</div>}
          </div>
          <button className="recommendBtn">완료</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);

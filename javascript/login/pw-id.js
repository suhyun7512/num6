function myFunction() {
    var x = document.getElementById("loginPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
}

function myFunction1() {
    var x = document.getElementById("regPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  var users = JSON.parse(localStorage.getItem('users')) || [];

  function isAlphaNumeric(input) {
      // 영어와 숫자만으로 이루어져 있는지 확인
      var alphanumericRegex = /^[a-zA-Z0-9]+$/;
      return alphanumericRegex.test(input);
  }
  
  function isLengthValid(input) {
      // 4~12자리인지 확인
      return input.length >= 4 && input.length <= 12;
  }

    function recoverPassword() {
        var recoveryUsername = document.getElementById("recoveryUsername").value;
        var user = users.find(u => u.username === recoveryUsername);

        if (user) {
            var recoveryResult = document.getElementById("recoveryResult");
            recoveryResult.textContent = "해당 아이디 " + user.username;
            recoveryResult.textContent = "비밀번호: " + user.password;
        } else {
            alert("입력한 아이디에 해당하는 사용자가 없습니다.");
        }
    }
  
  function register() {
      var usernameInput = document.getElementById("regUsername").value;
      var passwordInput = document.getElementById("regPassword").value;
  
      if (!isAlphaNumeric(usernameInput) || !isAlphaNumeric(passwordInput)) {
          alert("아이디와 비밀번호는 영어와 숫자만 입력 가능합니다.");
          return;
      }
  
      if (!isLengthValid(usernameInput) || !isLengthValid(passwordInput)) {
          alert("아이디와 비밀번호는 4~12자리여야 합니다.");
          return;
      }
  
      if (users.some(u => u.username === usernameInput)) {
          alert("이미 존재하는 사용자 이름입니다.");
      } else {
          users.push({ username: usernameInput, password: passwordInput });
          alert("회원 가입이 완료되었습니다.");
          localStorage.setItem('users', JSON.stringify(users));
          window.location.href = "./login.html";
      }
  
      document.getElementById("regForm").reset();
  }
  
  function login() {
      var usernameInput = document.getElementById("loginUsername").value;
      var passwordInput = document.getElementById("loginPassword").value;
  
      if (!isAlphaNumeric(usernameInput) || !isAlphaNumeric(passwordInput)) {
          alert("아이디와 비밀번호는 영어와 숫자만 입력 가능합니다.");
          return;
      }
  
      if (!isLengthValid(usernameInput) || !isLengthValid(passwordInput)) {
          alert("아이디와 비밀번호는 4~12자리여야 합니다.");
          return;
      }
  
      var user = users.find(u => u.username === usernameInput);
  
      if (user && user.password === passwordInput) {
          alert("로그인 성공!");
          window.location.href = "./idol-data-2.html";
      } else {
          alert("로그인 실패. 사용자 이름 또는 비밀번호가 올바르지 않습니다.");
      }
  
      document.getElementById("loginForm").reset();
  }
  
  
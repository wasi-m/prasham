$(document).ready(function () {
  // show or hide Menstrual Trait
  $("#inputGender").change(function () {
    if ($(this).val() !== "male") {
      $("div.toshow").show();
    } else if ($(this).val() === "male") {
      $("div.toshow").hide();
    }
  });

  // Name and Email validation Function.
  function validation(personalInfo) {
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      personalInfo.name === "" ||
      personalInfo.email === "" ||
      personalInfo.birthDate === "" ||
      personalInfo.gender === "" ||
      personalInfo.city === "" ||
      personalInfo.height === "" ||
      personalInfo.weight === ""
    ) {
      alert("Please fill all fields.");
      return false;
    } else if (!personalInfo.email.match(emailReg)) {
      alert("Invalid Email.");
      return false;
    } else {
      return true;
    }
  }

  $("#generateReport").click(function () {
    var data = {
      personalInfo: {},
      questionerSingleOption: {},
      questionerMultipleOption: {},
    };

    data.personalInfo.name = document.getElementById("inputName").value;
    data.personalInfo.email = document.getElementById("inputEmail4").value;
    data.personalInfo.birthDate =
      document.getElementById("inputBirthDate").value;
    data.personalInfo.gender = document.getElementById("inputGender").value;
    data.personalInfo.city = document.getElementById("inputCity").value;
    data.personalInfo.height = document.getElementById("inputHeight").value;
    data.personalInfo.weight = document.getElementById("inputWeight").value;

    if (validation(data.personalInfo)) {
      // Calling validation function
      $.map($("input:radio:checked"), function (elem, idx) {
        data.questionerSingleOption[$(elem).attr("name")] = $(elem).val();
      });

      $.map($("input:checkbox:checked"), function (elem, idx) {
        data.questionerMultipleOption[$(elem).attr("id")] = $(elem).val();
      });
    }
    console.log(data);
    newData = {};

    // 
    Object.keys(data.questionerSingleOption).forEach(function (key) {
      var answer = data.questionerSingleOption[key].slice(-1);
      var question = data.questionerSingleOption[key].slice(0, -1);
      newData[question] = [];
      newData[question].push(answer);
    });
    

    Object.keys(data.questionerMultipleOption).forEach(function (key) {
      var answer = data.questionerMultipleOption[key].slice(-1);
      var question = data.questionerMultipleOption[key].slice(0, -1);
      if (!newData[question]) {
        newData[question] = [];
      }
      newData[question].push(answer);
    });

    var score = {
      vaat: 0,
      pitha: 0,
      kaph: 0
    }

    Object.keys(newData).forEach(function (key) {
      newData[key].forEach(element => {
        if (element === 'a') {
          score.vaat += 1;
        } else if (element === 'b') {
          score.pitha += 1;
        } else if (element === 'c') {
          score.kaph += 1;
        }
      });
    });

    console.log(score);


  });
});

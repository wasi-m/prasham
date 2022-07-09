$(document).ready(function () {
  // show or hide Menstrual Trait
  $("#inputGender").change(function () {
    if ($(this).val() !== "male") {
      $("div.toshow").show();
    } else if ($(this).val() === "male") {
      $("div.toshow").hide();
    }
  });

  function calculateBMI(personalInfo) {
    /* Getting input from user into height variable.
    Input is string so typecasting is necessary. */
    let height = parseInt(personalInfo.height);

    /* Getting input from user into weight variable. 
    Input is string so typecasting is necessary.*/
    let weight = parseInt(personalInfo.weight);

    // Checking the user providing a proper
    // value or not
    if (height === "" || isNaN(height)) {
      personalInfo.bmiResult = "Provide a valid Height!";
      $("div.alert-danger-height").show();
      setTimeout(() => {
        $("div.alert-danger-height").hide();
      }, 4500);
    } else if (weight === "" || isNaN(weight)) {
      personalInfo.bmiResult = "Provide a valid Weight!";
      $("div.alert-danger-weight").show();
      setTimeout(() => {
        $("div.alert-danger-weight").hide();
      }, 4500);
    }
    // If both input is valid, calculate the bmi
    else {
      // Fixing upto 2 decimal places
      personalInfo.bmi = (weight / ((height * height) / 10000)).toFixed(2);

      // Dividing as per the bmi conditions
      if (personalInfo.bmi < 18.6) {
        personalInfo.bmiResult = "Under Weight";
      } else if (personalInfo.bmi >= 18.6 && personalInfo.bmi < 24.9) {
        personalInfo.bmiResult = "Normal";
      } else {
        personalInfo.bmiResult = "Over Weight";
      }
    }
  }

  function findJanmaKalaPrakriti(personalInfo) {
    const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
    const signs = [
      "Aquarius",
      "Pisces",
      "Aries",
      "Taurus",
      "Gemini",
      "Cancer",
      "Leo",
      "Virgo",
      "Libra",
      "Scorpio",
      "Sagittarius",
      "Capricorn",
    ];

    const rutu = {
      Vasant: ["Pisces", "Aries"],
      Grishma: ["Taurus", "Gemini"],
      Varsha: ["Cancer", "Leo"],
      Sharad: ["Virgo", "Libra"],
      Hemant: ["Scorpio", "Sagittarius"],
      Shishir: ["Capricorn", "Aquarius"],
    };

    var date = new Date(personalInfo.birthDate);
    let month = date.getMonth();
    let day = date.getDate();
    if (month == 0 && day <= 20) {
      month = 11;
    } else if (day < days[month]) {
      month--;
    }
    personalInfo.sign = signs[month];

    Object.keys(rutu).forEach(function (key) {
      rutu[key].forEach((sign) => {
        if (sign === personalInfo.sign) {
          personalInfo.rutu = key;
        }
      });
    });

    if (personalInfo.rutu === "Shishir" || personalInfo.rutu === "Vasant") {
      personalInfo.janmaKalaPrakriti = "kaph";
    }
    if (personalInfo.rutu === "Grishma" || personalInfo.rutu === "Varsha") {
      personalInfo.janmaKalaPrakriti = "vaat";
    }
    if (personalInfo.rutu === "Sharad" || personalInfo.rutu === "Hemant") {
      personalInfo.janmaKalaPrakriti = "pitta";
    }
  }

  function getPrakriti(data) {
    allScore = [data.score.pitta, data.score.kaph, data.score.vaat].sort();
    difference = allScore[2] - allScore[1];
    if (difference <= 7) {
      // add 2 and 1
      var prakriti1 = "";
      var prakriti2 = "";
      Object.keys(data.score).forEach(function (key) {
        if (data.score[key] === allScore[2]) {
          prakriti1 = key;
        }
        if (data.score[key] === allScore[1]) {
          prakriti2 = key;
        }
        data.prakriti = prakriti1 + " and " + prakriti2;
      });
    } else {
      // return only 1
      var prakriti = "";
      Object.keys(data.score).forEach(function (key) {
        if (data.score[key] === allScore[2]) {
          prakriti = key;
        }
        data.prakriti = prakriti;
      });
    }
  }

  // Name and Email validation Function.
  function validation(personalInfo) {
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var inputs = document.getElementsByTagName("input");
    var answerCount = 0;
    var allOptionsSelected = true;

    if (
      personalInfo.name === "" ||
      personalInfo.email === "" ||
      personalInfo.birthDate === "" ||
      personalInfo.gender === "" ||
      personalInfo.city === "" ||
      personalInfo.height === "" ||
      personalInfo.weight === ""
    ) {
      $("div.alert-dangerpersonal-info-toshow").show();
      setTimeout(() => {
        $("div.alert-dangerpersonal-info-toshow").hide();
      }, 4500);
      return false;
    } else if (!personalInfo.email.match(emailReg)) {
      $("div.alert-dangeremail-toshow").show();
      setTimeout(() => {
        $("div.alert-dangeremail-toshow").hide();
      }, 4500);
      return false;
    }

    findJanmaKalaPrakriti(data.personalInfo);
    calculateBMI(data.personalInfo);

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type === "radio" && inputs[i].checked) {
        answerCount += 1;
      }
      if (inputs[i].type === "checkbox" && inputs[i].checked) {
        answerCount += 1;
      }
    }

    if (answerCount < 34) {
      allOptionsSelected = false;
    }

    if (!allOptionsSelected) {
      $("div.alert-dangerall-toshow").show();
      setTimeout(() => {
        $("div.alert-dangerall-toshow").hide();
      }, 4500);
      return false;
    }

    return true;
  }

  var data = {
    personalInfo: {},
    questionerSingleOption: {},
    questionerMultipleOption: {},
    score: {
      vaat: 0,
      pitta: 0,
      kaph: 0,
    },
  };

  $("#generateReport").click(function () {
    data.personalInfo.name = document.getElementById("inputName").value;
    data.personalInfo.email = document.getElementById("inputEmail4").value;
    data.personalInfo.birthDate =
      document.getElementById("inputBirthDate").value;
    data.personalInfo.gender = document.getElementById("inputGender").value;
    data.personalInfo.height = document.getElementById("inputHeight").value;
    data.personalInfo.weight = document.getElementById("inputWeight").value;

    if (validation(data.personalInfo)) {
      // Calling validation function

      $("div.alert-success-toshow").show();
      setTimeout(() => {
        $("div.alert-success-toshow").hide();
      }, 4500);

      $.map($("input:radio:checked"), function (elem, idx) {
        data.questionerSingleOption[$(elem).attr("name")] = $(elem).val();
      });

      $.map($("input:checkbox:checked"), function (elem, idx) {
        data.questionerMultipleOption[$(elem).attr("id")] = $(elem).val();
      });

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

      Object.keys(newData).forEach(function (key) {
        newData[key].forEach((element) => {
          if (element === "a") {
            data.score.vaat += 1;
          } else if (element === "b") {
            data.score.pitta += 1;
          } else if (element === "c") {
            data.score.kaph += 1;
          }
        });
      });

      getPrakriti(data);

      $("form.form-tohide").hide();

      $("#head-toedit").text("Prakriti Parikshan Report");
      var reportDiv = document.getElementById("report");
      var testDiv = document.createElement("div");

      testDiv.innerHTML =
        "<p> Hello " +
        data.personalInfo.name +
        "! Thanks for taking our Prakriti Parikshan. \n Your Prakriti is " +
        data.prakriti +
        "</p>";

      reportDiv.appendChild(testDiv);

      $("div.report-toshow").show();
    }
  });
});

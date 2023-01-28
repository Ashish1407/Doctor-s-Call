const listofApp = [
  {
    date: "2023-01-09",
    totalAp: 30,
  },
  {
    date: "2023-01-10",
    totalAp: 7,
  },
  {
    date: "2023-01-13",
    totalAp: 30,
  },
  {
    date: "2023-01-26",
    totalAp: 30,
  },
];

const weekSechedule = [
  {
    day: "Sunday",
    time: "",
  },
  {
    day: "Monday",
    time: "8:30am - 5:00pm",
  },
  {
    day: "Tuesday",
    time: "8:30am - 5:00pm",
  },
  {
    day: "Wednesday",
    time: "8:30am - 5:00pm",
  },
  {
    day: "Thursday",
    time: "8:30am - 5:00pm",
  },
  {
    day: "Friday",
    time: "8:30am - 5:00pm",
  },
  {
    day: "Saturday",
    time: "8:30am - 5:00pm",
  },
];

console.log("Hello and Welcome to Doctor's Call.");

const date = dateformat(new Date().toISOString());

function dateformat(date) {
  let str = date;
  str = str.split("T")[0];
  return str;
}

console.log("Today's Date : ", date);

const htmlDates = document.getElementById("AppointmentDate");

function setMinDate(date) {
  if (checkList(date)) {
    return date;
  }
  return setMinDate(addDate(date, 1));
}

function checkList(date) {
  if (isSunday(date) || !isTime(date)) {
    console.log("sunday hai");
    return false;
  }

  console.log("evt date :", date);
  console.log("some : ", !listofApp.find((e) => e.date === date));
  if (!listofApp.find((e) => e.date === date)) {
    console.log("bug2");
    return true;
  }

  let resArr = false;
  for (let index = 0; index < listofApp.length; index++) {
    const element = listofApp[index];
    if (element.date === date) {
      if (element.totalAp < 30) {
        console.log("bug1");
        resArr = true;
      } else {
        console.log("filled");
        resArr = false;
      }
    }
  }

  return resArr;
}

function isSunday(date) {
  const res = new Date(date);
  if (res.getDay() === 0) {
    return true;
  }
  return false;
}

function isTime(date) {
  return true;
}

function addDate(date, inc) {
  let nextday = new Date(date);
  nextday = nextday.setDate(nextday.getDate() + inc);
  let nextt = dateformat(new Date(nextday).toISOString());
  return nextt;
}

const setMin = setMinDate(date);
const setMaxx = setMax(setMin);

htmlDates.min = setMin;
htmlDates.value = setMin;

htmlDates.max = setMaxx;

function setMax(date) {
  const next30 = addDate(date, 30);
  return next30;
}

htmlDates.onchange = (evt) => {
  console.log(checkList(evt.target.value));
  if (!checkList(evt.target.value)) {
    console.log("error : choose another date");
    alert("error : choose another date");
    htmlDates.value = setMin;
  } else {
    htmlDates.value = evt.target.value;
  }
};

const form = document.getElementById("aptGen");
const formname = document.getElementById("formName");
const email = document.getElementById("formEmail");
const formContact = document.getElementById("formContact");
const Symptoms = document.getElementById("Symptoms");

form.onsubmit = (evt) => {
  evt.preventDefault();
  console.log("generating");

  const token = {
    uid: Math.random().toString(16).slice(2) + new Date().getTime(),
    date: htmlDates.value,
    patname: formname.value,
    contact: formContact.value,
    symptoms: Symptoms.value,
  };

  const decision = confirm("Uid : ", token.uid, "\n date : ", token.date);
  if (decision) {
    console.log(token);
    localStorage.setItem("Current token", JSON.stringify(token));
    window.location.replace("http://127.0.0.1:5501/Pages/token.html");
  }

  form.reset();
  htmlDates.value = setMin;
};

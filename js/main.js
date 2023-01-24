$(function () {
  function countdown(elementName, minutes, seconds) {
    let element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
      return n <= 9 ? "0" + n : n;
    }

    function updateTimer() {
      msLeft = endTime - +new Date();
      if (msLeft < 1000) {
        element.innerHTML = "Час вийшов!";
      } else {
        time = new Date(msLeft);
        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
        element.innerHTML = (hours ? hours + ":" + twoDigits(mins) : mins) + ":" + twoDigits(time.getUTCSeconds());
        setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
      }
    }

    element = document.getElementById(elementName);
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
  }

  countdown("ten-countdown", 10, 0);

  $(".question__title").click(function (even) {
    if ($(".question__inner").hasClass("question__inner--one")) {
      $(".question__title").not($(this)).removeClass("active");
      $(".question__body").not($(this).next()).slideUp(300);
    }
    $(this).toggleClass("active").next().slideToggle(300);
  });
});

const tabs = document.getElementById("tabs");
const contents = document.querySelectorAll(".program__content");

const changeClass = el => {
  for (let i = 0; i < tabs.children.length; i++) {
    tabs.children[i].classList.remove("active");
  }
  el.classList.add("active");
};

tabs.addEventListener("click", e => {
  const currTab = e.target.dataset.btn;
  changeClass(e.target);

  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove("active");
    if (contents[i].dataset.content === currTab) {
      contents[i].classList.add("active");
    }
  }
});

// const changeTab = el => {
//   for (let i = 0; i < subTabs.children.length; i++) {
//     subTabs.children[i].classList.remove("active");
//   }
//   el.classList.add("active");
// };

// subTabs.addEventListener("click", e => {
//   const defines = e.target.dataset.btn;
//   changeTab(e.target);

//   for (let i = 0; i < subContents.length; i++) {
//     subContents[i].classList.remove("active");
//     if (subContents[i].dataset.content === defines) {
//       subContents[i].classList.add("active");
//     }
//   }
// });

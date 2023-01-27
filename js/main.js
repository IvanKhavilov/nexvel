$(function () {
  $(".menu__btn").on("click", function () {
    $(".menu__btn").toggleClass("active");
    $(".menu__list").toggleClass("active");
    $(".header__top").toggleClass("hide");
  });

  $(".menu a").on("click", function () {
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });

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

  $(".cases__modal-show__slider").on("click", function () {
    $(".cases__modal-slider__inner--close").css("display", "block");
  });

  $(".speaker__inner").slick({
    infinite: false,
    fade: true,
    prevArrow:
      '<button type="button" class="speaker-prev slick-prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.36035 1.28833L1.64872 7.99996L8.36035 14.7116" stroke="white" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
    nextArrow:
      '<button type="button" class="speaker-next slick-next"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.63965 1.28833L8.35128 7.99996L1.63965 14.7116" stroke="white" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
  });
  $(".cases__modal-slider").slick({
    infinite: false,
    fade: true,
    prevArrow:
      '<button type="button" class="cases__modal-prev slick-prev"><svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1308 1.2547L1.38541 13L13.1308 24.7454" stroke="#323232" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
    nextArrow:
      '<button type="button" class="cases__modal-next slick-next"><svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.869141 1.2547L12.6145 13L0.869141 24.7454" stroke="#323232" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
  });
});

const rangeSlider = document.getElementById("range__slider");

const minValue = 15000;
const maxValue = 120000;

noUiSlider
  .create(rangeSlider, {
    start: 15000,
    step: 1000,
    tooltips: true,
    format: {
      from: function (formattedValue) {
        return Number(formattedValue);
      },
      to: function (numericValue) {
        return Math.round(numericValue) + " грн";
      },
    },
    range: {
      min: [minValue],
      max: [maxValue],
    },
  })
  .on("update", function (val) {
    const currentValue = val[0].split(" ")[0] / maxValue;
    $(".noUi-horizontal .noUi-handle").toggleClass("junior", currentValue >= 0.34 && currentValue < 0.55);
    $(".noUi-horizontal .noUi-handle").toggleClass("middle", currentValue >= 0.55 && currentValue < 0.78);
    $(".noUi-horizontal .noUi-handle").toggleClass("senior", currentValue >= 0.78);
  });

const tabs = document.getElementById("tabs");
const contents = document.querySelectorAll(".program__content");

const manageTabs = tabId => {
  for (let i = 0; i < tabs.children.length; i++) {
    tabs.children[i].classList.remove("active");
  }

  document.querySelector(`.program__tab[data-btn='${tabId}']`).classList.add("active");

  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove("active");
    if (contents[i].dataset.content === tabId) {
      contents[i].classList.add("active");
    }
  }
};

tabs.addEventListener("click", e => manageTabs(e.target.dataset.btn));

const swiperBig = new Swiper(".feedback__slides-wrapp", {
  initialSlide: 2,
  slidesPerView: 5,
  spaceBetween: 32,
  centeredSlides: true,
  watchSlidesProgress: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    450: {
      initialSlide: 1,
      slidesPerView: 5,
      centeredSlides: true,
      spaceBetween: 12,
    },
  },
});
const swiper2 = new Swiper(".thumbs__swiper", {
  effect: "fade",
  initialSlide: 2,
  slidesPerView: 1,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperBig,
  },
  breakpoints: {
    450: {
      initialSlide: 1,
    },
  },
});

new Swiper(".cases__inner", {
  navigation: {
    nextEl: ".cases__btn-next",
    prevEl: ".cases__btn-prev",
  },
  slidesPerView: 3.5,
  spaceBetween: 40,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      centeredSlides: true,
    },
    900: {
      slidesPerView: 2.5,
    },
    1300: {
      slidesPerView: 3.5,
    },
  },
});

const showItems = function () {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItems = document.querySelectorAll(".select__item");

  selectHeader.forEach(item => {
    item.addEventListener("click", selectToggle);
  });

  selectItems.forEach(item => {
    item.addEventListener("click", selectItem);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("active");
  }

  function selectItem() {
    let text = this.innerText;
    let select = this.closest(".select");
    let currentText = select.querySelector(".select__title");
    currentText.innerText = text;
    select.classList.remove("active");
    manageTabs(this.dataset.btn);
  }
};

showItems();

const btnForm = document.querySelectorAll(".price__btn");
const modalWindow = document.querySelector(".modal-window");
const overlay = document.getElementById("overlay");
const btnClose = document.querySelector(".btn-close");

for (let i = 0; i < btnForm.length; i++) {
  btnForm[i].addEventListener("click", function () {
    modalWindow.classList.add("active");
  });
}

function closeModal() {
  modalWindow.classList.remove("active");
}

overlay.addEventListener("click", closeModal);
btnClose.addEventListener("click", closeModal);

$(function () {
  $('.menu__btn').on('click', function () {
    $('.menu__btn').toggleClass('active')
    $('.menu__list').toggleClass('active')
    $('.overlay__menu').toggleClass('active')
    $('.header__top').toggleClass('active')
  })

  $('.menu a').on('click', function () {
    var id = $(this).attr('href'),
      top = $(id).offset().top
    $('body,html').animate({ scrollTop: top }, 1500)
  })

  function countdown(elementName, minutes, seconds) {
    let element, endTime, hours, mins, msLeft, time
    function twoDigits(n) {
      return n <= 9 ? '0' + n : n
    }
    function updateTimer() {
      msLeft = endTime - +new Date()
      if (msLeft < 1000) {
        element.innerHTML = 'Час вийшов!'
      } else {
        time = new Date(msLeft)
        hours = time.getUTCHours()
        mins = time.getUTCMinutes()
        element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds())
        setTimeout(updateTimer, time.getUTCMilliseconds() + 500)
      }
    }
    element = document.getElementById(elementName)
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500
    updateTimer()
  }
  countdown('ten-countdown', 10, 0)

  $('.question__title').click(function (even) {
    if ($('.question__inner').hasClass('question__inner--one')) {
      $('.question__title').not($(this)).removeClass('active')
      $('.question__body').not($(this).next()).slideUp(400)
    }
    $(this).toggleClass('active').next().slideToggle(400)
  })

  $('.cases__modal-show__slider').on('click', function () {
    $('.cases__modal-slider__inner--close').toggleClass('active')
  })

  $('.speaker__inner').slick({
    infinite: false,
    fade: true,
    prevArrow:
      '<button type="button" class="speaker-prev slick-prev"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.36035 1.28833L1.64872 7.99996L8.36035 14.7116" stroke="white" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
    nextArrow:
      '<button type="button" class="speaker-next slick-next"><svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.63965 1.28833L8.35128 7.99996L1.63965 14.7116" stroke="white" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
  })
  $('.cases__slider-wrapp').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow:
      '<button type="button" class="cases-prev slick-prev"><svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1308 1.2547L1.38541 13L13.1308 24.7454" stroke="#323232" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
    nextArrow:
      '<button type="button" class="cases-next slick-next"><svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.869141 1.2547L12.6145 13L0.869141 24.7454" stroke="#323232" stroke-width="1.61918" stroke-linecap="round"/></svg></button>',
    responsive: [
      {
        breakpoint: 461,
        settings: {
          // fade: true,
          slidesToShow: 1,
          centerMode: true,
        },
      },
    ],
  })
})

var swiper = new Swiper('.cases__modal-slider__inner--close', {
  effect: 'fade',
  navigation: {
    nextEl: '.cases__modal-next',
    prevEl: '.cases__modal-prev',
  },
})

const rangeSlider = document.getElementById('range__slider')
const minValue = 15000
const maxValue = 120000
noUiSlider
  .create(rangeSlider, {
    start: 15000,
    step: 1000,
    tooltips: true,
    format: {
      from: function (formattedValue) {
        return Number(formattedValue)
      },
      to: function (numericValue) {
        return Math.round(numericValue) + ' грн'
      },
    },
    range: {
      min: [minValue],
      max: [maxValue],
    },
  })
  .on('update', function (val) {
    const currentValue = val[0].split(' ')[0] / maxValue
    $('.noUi-horizontal .noUi-handle').toggleClass('junior', currentValue >= 0.34 && currentValue < 0.55)
    $('.noUi-horizontal .noUi-handle').toggleClass('middle', currentValue >= 0.55 && currentValue < 0.78)
    $('.noUi-horizontal .noUi-handle').toggleClass('senior', currentValue >= 0.78)
  })

const tabs = document.getElementById('tabs')
const contents = document.querySelectorAll('.program__content')
const manageTabs = tabId => {
  for (let i = 0; i < tabs.children.length; i++) {
    tabs.children[i].classList.remove('active')
  }
  document.querySelector(`.program__tab[data-btn='${tabId}']`).classList.add('active')
  for (let i = 0; i < contents.length; i++) {
    contents[i].classList.remove('active')
    if (contents[i].dataset.content === tabId) {
      contents[i].classList.add('active')
    }
  }
}
tabs.addEventListener('click', e => manageTabs(e.target.dataset.btn))

const showItems = function () {
  let selectHeader = document.querySelectorAll('.select__header')
  let selectItems = document.querySelectorAll('.select__item')
  selectHeader.forEach(item => {
    item.addEventListener('click', selectToggle)
  })
  selectItems.forEach(item => {
    item.addEventListener('click', selectItem)
  })
  function selectToggle() {
    this.parentElement.classList.toggle('active')
  }
  function selectItem() {
    let text = this.innerText
    let select = this.closest('.select')
    let currentText = select.querySelector('.select__title')
    currentText.innerText = text
    select.classList.remove('active')
    manageTabs(this.dataset.btn)
  }
}
showItems()

const btnForm = document.querySelectorAll('.price__btn')
const modalWindow = document.querySelector('.modal-window')
const overlay = document.getElementById('overlay')
const btnClose = document.querySelector('.btn-close')
for (let i = 0; i < btnForm.length; i++) {
  btnForm[i].addEventListener('click', function () {
    modalWindow.classList.add('active')
  })
}
function closeModal() {
  modalWindow.classList.remove('active')
}
overlay.addEventListener('click', closeModal)
btnClose.addEventListener('click', closeModal)

const swiperBig = new Swiper('.feedback__slides-wrapp', {
  loop: true,
  spaceBetween: 32,
  slidesPerView: 'auto',
  centeredSlides: true,
  initialSlide: 2,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // breakpoints: {
  //   0: {
  //     slidesPerView: 'auto',
  //   },
  //   460: {
  //     slidesPerView: 'auto',
  //     spaceBetween: 18,
  //   },
  //   860: {
  //     slidesPerView: 'auto',
  //     spaceBetween: 30,
  //   },
  // },
})

const swiper2 = new Swiper('.thumbs__swiper', {
  loop: true,
  effect: 'fade',
  initialSlide: 2,
  slidesPerView: 1,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: swiperBig,
  },
})

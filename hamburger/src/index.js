const $ = (selector) => document.querySelector(selector)
const $menu = $('#menu')
const $toggle = $('#toggle')

$toggle.addEventListener('click', () => {
  $menu.classList.toggle('open')
})
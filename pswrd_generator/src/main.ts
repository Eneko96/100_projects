import './style.css'
const $ = (selector: any) => document.querySelector(selector);
const $copyButton = $('#copy-button') as HTMLButtonElement;
const formNames = ({
  lengthName: 'lengthPwd',
  include_numbers: 'include-numbers',
  include_symbols: 'include-symbols',
})

const charset = (inNum: boolean, inSym: boolean) => {
  const baseCharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let res = baseCharset
  if (inNum) res = baseCharset + "0123456789"
  if (inSym) res += "!@#$%^&*()_+"
  return res
}

// copy password to clipboard
function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

// generate password
function generatePassword(len = 5, inNum = false, inSym = false) {
  var length = len
  let charSet = charset(inNum, inSym)
  let retVal = ''
  for (var i = 0, n = charSet.length; i < length; ++i) {
    retVal += charSet.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}



const $generate = $('#generator') as HTMLFormElement
const $result = $('#result') as HTMLDivElement

$generate.addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.target
  const length = form?.elements[formNames.lengthName]?.value
  const includeNumbers = form?.elements[formNames.include_numbers]?.checked
  const includeSymbols = form?.elements[formNames.include_symbols]?.checked
  console.log(length, includeNumbers, includeSymbols)
  const password = generatePassword(length, includeNumbers, includeSymbols)
  $result.firstChild.textContent = password
})

$copyButton.addEventListener('click', () => {
  copyToClipboard($result.firstChild.textContent?.trim())
})


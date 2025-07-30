const input = document.getElementById('input');
const output = document.getElementById('output');

let typingTimer;
const TYPING_TIMEOUT = 200;

input.addEventListener('keydown', () => {
  input.classList.add('typing');

  clearTimeout(typingTimer);

  typingTimer = setTimeout(() => {
    input.classList.remove('typing');
  }, TYPING_TIMEOUT);

});
// ---------------LOGIC PART-------------------
const copy = document.getElementById('copy');
const encode_button = document.getElementById('encode');
const decode_button = document.getElementById('decode');
const clear_button = document.getElementById('clear');

input.value = '';
output.value = '';

copy.addEventListener('click', () => {
  input.blur();
  if (output.value == '') {
    alert('There is nothing to copy');
    copy.style.backgroundColor = '';
  }
  else {
    navigator.clipboard.writeText(output.value);
    output.style.boxShadow = 'None';
  };
});

encode_button.addEventListener('click', () => {
  input.blur();
  if (input.value == '') {
    alert(' Please Tell Us Your Secret..');
  }
  else {
    decode_button.style.backgroundColor = '';
    encode_button.style.backgroundColor = 'rgba(0, 208, 255, 0.949)';
    output.style.boxShadow = '0 0 18px 10px rgba(255, 0, 0, 10)';
    let message = input.value;
    let modified_message = encode(message);
    console.log(modified_message);
    output.value = modified_message;
  };
});

decode_button.addEventListener('click', () => {
  input.blur();
  if (input.value == '') {
    alert(' Please Tell Us Your Secret..');
  }
  else {
    encode_button.style.backgroundColor = '';
    decode_button.style.backgroundColor = 'rgba(0, 208, 255, 0.949)';
    output.style.boxShadow = '0 0 18px 10px rgba(255, 0, 0, 10)';
    let message = input.value;
    let modified_message = decode(message);
    console.log(modified_message);
    output.value = modified_message;
  };
});

clear_button.addEventListener('click', ()=> {
  input.blur();
  encode_button.style.backgroundColor = '';
  decode_button.style.backgroundColor = '';
  output.style.boxShadow = 'None';
  input.value = '';
  output.value = '';
});

function encode(message) {

  const letters = 'abcdefghijklmnopqrstuvwxyz';

  let message_list = message.split(' ');
  let len_list = message_list.length;

  for (let i = 0; i < len_list; i++) {
    let word = message_list[i];

    if (word.length >= 3){

      word = Array.from(word).reverse().join('');

      for (let j = 0; j < 3; j++) {
        word = letters[Math.floor(Math.random() * letters.length)] + word;
        word = word + letters[Math.floor(Math.random() * letters.length)];
      };
      message_list[i] = word;
    }
    else {
      message_list[i] = Array.from(word).reverse().join('');
    };
  };

  let coded_message = '';
  for (let i = 0; i < len_list; i++) {
    coded_message += message_list[i] + ' ';
  };
  return coded_message;
};

function decode(message) {
  let message_list = message.split(' ');
  let len_list = message_list.length;
  for (let i = 0; i < len_list; i++) {
    let word = message_list[i];
    if (word.length > 6) {
      word = word.slice(3);
      word = word.slice(0, -3);
      message_list[i] = Array.from(word).reverse().join('');
    }
    else {
      message_list[i] = Array.from(word).reverse().join('')
    };
  };
  let decoded_message = '';
  for (let i = 0; i < len_list; i++) {
    decoded_message += message_list[i] + ' ';
  };
  return decoded_message;
};
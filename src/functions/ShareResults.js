import html2canvas from 'html2canvas';
import $ from 'jquery';

export const shareResults = (peep, index, guesses, answer) => {
  $('#shareDiv').append(`<p>${peep}'s&nbsp;word&nbsp;was&nbsp;${answer}.</p>`);
  const ans = answer.split('');
  for (let i = 0; i < index; i++) {
    $('#shareDiv').append(`<div id="row${i}" class="shareRow"></div>`);
    let answerArray = [...ans];
    guesses[i].forEach((g, idx) => {
      switch (true) {
        case answerArray[idx] === g:
          answerArray[idx] = '*';
          $(`#row${i}`).append(`<div class='square correct'></div>`);
          break;
        case answerArray.includes(g):
          const fIndex = answerArray.findIndex((a) => a === g);
          answerArray[fIndex] = '*';
          $(`#row${i}`).append("<div class='square present'></div>");
          break;
        default:
          $(`#row${i}`).append("<div class='square absent'></div>");
          break;
      }
    });
  }
  const src = document.getElementById('shareDiv');
  html2canvas(src).then(async (canvas) => {
    const imageSrc = canvas.toDataURL('image/png', 1.0);
    $('#shareDiv').hide();
    $('#imageContainer').append(
      `<img src=${imageSrc} alt='nothing to see' id='shareMe' style="max-width: 80vw;"/>`
    );
    const img = document.getElementById('imageContainer');
    try {
      await navigator.ClipboardItem(img);
    } catch (error) {
      console.log(error.message);
    }
  });
};

/* Задание 3 */
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

const value = document.querySelector('input');
const resultNode = document.querySelector('.error');
const btnNode = document.querySelector('.j-btn-request');

 

function displayResult(apiData) {
  let cards = '';
  if( ! Number(value.value) || Number(value.value)  > 10 || Number(value.value) < 1 ) {
		resultNode.innerHTML = 'Число вне диапазона от 1 до 10';
	} else {
          apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
          style="width: 150px; margin-right: 30px"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
		  resultNode.innerHTML = cards;
	
  }
}
btnNode.addEventListener('click', () => {
	useRequest(`https://picsum.photos/v2/list/?limit=${parseInt(value.value)}`, displayResult);
});
/* Задание 5 */
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
    
const btnNode = document.querySelector('.j-btn-request');
const pageNode = document.querySelector('.input1');
const limitNode = document.querySelector('.input2');
const resultNode = document.querySelector('.j-result');
   
function displayResult(apiData) {
    let cards = '';
 
    if( ! Number(pageNode.value) || Number(pageNode.value)  > 10 || Number(pageNode.value) < 1 ) {
          resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        } else if ( ! Number(limitNode.value) || Number(limitNode.value)  > 10 || Number(limitNode.value) < 1 ) {
          resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10'; 
      } else if ( (! Number(pageNode.value) || Number(pageNode.value)  > 10 || Number(pageNode.value) < 1) && (! Number(limitNode.value)          || Number(limitNode.value)  > 10 || Number(limitNode.value) < 1)) {
        resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
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
        localStorage.setItem('cards', cards);
        cards = localStorage.getItem('cards');
    } 
}

btnNode.addEventListener('click',  () => {
    useRequest(`https://picsum.photos/v2/list?page=${parseInt(pageNode.value)}&limit=${parseInt(limitNode.value)}`, displayResult);
  
});   
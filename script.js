const docId = '6BdoNff-Uk';
const tableIdOrName = 'grid-lCLwQWEWB1';
const token = 'e8034f3b-66bc-42e2-9916-4a4f2327f91e';
const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`;
const titleId = 'c-WQVtCDqyj0';
const imageId = 'c-v5-Shpuhrs';
const priceId = 'c-swWLERIm5B';

const spinner = document.querySelector('#spinner');

const getData = () => {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .then(data => {
        spinner.innerHTML = '';
        return creatProduct(data.items);
    })
    .catch((error) => {
        console.error('Error: ', error);
    });
}

const productList = document.querySelector('#productList');

const creatProduct = (productInfo) => {
    for (let i = 0; i < productInfo.length; i++) {
        const title = productInfo[i].values[`${titleId}`];
        const image = productInfo[i].values[`${imageId}`];
        const price = productInfo[i].values[`${priceId}`];
        
        let div = document.createElement('div');
        div.classList.add('card', 'product', 'shadow-sm');
        div.innerHTML = `
        <img src="${image}"
        alt="${title}" class="card-img-top">
        <div class="card-body">
            <div class="product-info mb-2 d-flex justify-content-between flex-wrap">
                <div class="card-title col-12 col-sm-8">${title}</div>
                <div class="card-price col-12 col-sm-4">${price}</div>
            </div>
            <a class="btn btn-warning w-100" href="tel:+989125515560">سفارش سریع</a>
        </div>`
        
        productList.append(div);
    }
}

getData();

// search box
const input = document.querySelector('#searchInput');
input.addEventListener('keyup' , () => {
    let filter = input.value;
    const list = document.querySelector('#productList');
    const card = list.querySelectorAll('.card');
    
    for (let i = 0; i < card.length; i++) {
        const cardTitle = card[i].querySelectorAll('.card-title')[0];
        let txtValue = cardTitle.textContent || cardTitle.innerText ;
        if (txtValue.indexOf(filter) > -1) {
            card[i].classList.remove('hidden');
        } else {
            card[i].classList.add('hidden');
        }
    }
});
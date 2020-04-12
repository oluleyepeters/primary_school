const createButton = (page, type) => `
    <button class="btn_  results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, data, adminsPerPage) => {
    const pages = Math.ceil(data / adminsPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    }else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }
    document.querySelector('#contain').insertAdjacentHTML('beforeEnd', button);
};

const displayAdmins = (data, page = 1, adminsPerPage = 5) => {
    const start = (page - 1) * adminsPerPage;
    const end = page * adminsPerPage;

    data.slice(start, end).forEach(renderAdmin);
    renderButtons(page, data.length, adminsPerPage);
}

var renderAdmin = (data) => {
    var container = document.querySelector('#contain')
    var div = document.createElement('div');
    div.classList.add('inner-container')
    var section = document.querySelector('.settings')
    var box = document.createElement('div')
    box.classList.add('boxx')
    box.innerHTML = `
        <p>${data.username}</p>
        <p>${data.lastname}</p>
        <p>${data.othername}</p>
        <p>${data.email}</p>
        <p>${data.phone_number}</p>
    `
    var delButton = document.createElement('button');
    delButton.classList.add('link-1')
    delButton.classList.add('username')
    delButton.dataset.username = data.username
    delButton.textContent = 'Delete'
    var updButton = document.createElement('div');
    updButton.classList.add('link-1');
    updButton.classList.add('status')
    updButton.dataset.username = data.username;
    updButton.dataset.status = data.status;
    updButton.textContent = 'Update'    
    section.appendChild(box)
    section.appendChild(delButton)
    section.appendChild(updButton)    
    div.appendChild(section)
    container.appendChild(div)
}

const createButton = (page, type) => `
    <button class="btn_  results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, data, adminsPerPage) => {
    const pages = Math.ceil(data / adminsPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    }else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }
    document.querySelector('#all-admins').insertAdjacentHTML('beforeEnd', button);
};

const displayAdmins = (data, page = 1, adminsPerPage = 5) => {
    const start = (page - 1) * adminsPerPage;
    const end = page * adminsPerPage;
    data.slice(start, end).forEach(renderAdmin);
    if(data.length > 5){
        renderButtons(page, data.length, adminsPerPage);
    }
}

var renderAdmin = (data) => {
    var container = document.querySelector('#all-admins')
    var div = document.createElement('div');
    div.classList.add('btn-Container')
    var section = document.createElement('section')
    section.classList.add('all-admins');
    var box = document.createElement('div')
    box.classList.add('admin')
    box.innerHTML = `
        <p>${data.username}</p>
        <p>${data.lastname}</p>
        <p>${data.othername}</p>
        <p>${data.email}</p>
        <p>${data.phone_number}</p>
    `
    var delButton = document.createElement('button');
    delButton.classList.add('link')
    delButton.classList.add('username')
    delButton.dataset.username = data.username
    delButton.textContent = 'Delete'
    var updButton = document.createElement('button');
    updButton.classList.add('link');
    updButton.classList.add('status')
    updButton.dataset.username = data.username;
    updButton.dataset.status = data.status;
    if(data.status === 'active'){
        updButton.textContent = 'Deactivate Admin'            
    }else{
        updButton.textContent = 'Activate Admin'
    }        
    section.appendChild(box)
    div.appendChild(delButton)
    div.appendChild(updButton)
    section.appendChild(div)    
    container.appendChild(section)
}
const createButton = (page, type) => `
    <button class="btn_ results__btn--${type}" class="link" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        ${type === 'prev' ? 'Previous' : 'Next'}
    </button>
`;

const renderButtons = (page, data) => {
    console.log(page)
    const pages = data.length;
    console.log(pages)
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
    document.querySelector('#result').insertAdjacentHTML('beforeEnd', button);
};

const displayName = (data) => {
    displayNames(data)
}

const displayNames = (data) => {
    var name = document.getElementById('names')
    for(var i=0; i < `${data.length}`; i++){
        const p=document.createElement('p')
        p.classList.add('student')
        p.style.color = 'white'
        p.dataset.id = data[i].id;
        p.dataset.student_id = data[i]._id;      
        p.textContent = `${data[i].surname}`
        name.appendChild(p); 
    }    
}

const displayResult = (data, datum, page) => {
    document.querySelector('#result').innerHTML = ''    
    var box=document.createElement('section')
    box.classList.add('editresult')
    box.innerHTML= `
        <section class="stdDetails">
            <p class="person">${datum.firstName}</p>
            <p class="person">${datum.lastName}</p>            
        </section>
        <div class="direction">
            <div class="direct">
                <input value="Subject" readonly width="100px">
                <input style="text-align:left;" value="Exam" readonly class="score">
                <input style="text-align:left;" value="1st_Test" readonly class="score">
                <input style="text-align:left;" value="2nd_Test" readonly class="score">
                <input style="text-align:left;" value="Assg" readonly class="score">
            </div>
        </div>
        <section class="updResult">
            <button type="submit" data-termName=${datum.termName} id="post" class="link sbmlink">Submit</button>
        </section>
    `
    document.querySelector('#result').appendChild(box)
    appendResult(datum.subjects)
    renderButtons(page, data)    
}

const appendResult = (subjects) => {
    var direction = document.querySelector('.direction')
    for(var p=0; p < `${subjects.length}`; p++){
        var box = document.createElement('div')
        box.classList.add('direct')
        box.innerHTML = `
            <input readonly value=${subjects[p].subject}>
            <input type="number" value=${subjects[p].Examination} required min="0" max="50"
            name="${subjects[p].subject}-Examination" class="score" id="exam">
            <input type="number" value=${subjects[p].First_test} required min="0" max="15" 
            name="${subjects[p].subject}-First_test" class="score" id="1sttest">
            <input type="number" value=${subjects[p].Second_test} required min="0" max="15" 
            name="${subjects[p].subject}-Second_test" class="score" id="2ndtest">
            <input type="number" value=${subjects[p].assignment} required min="0" max="20"
            name="${subjects[p].subject}-assignment" class="score" id="ass">                
        `
        console.log(box)
        direction.appendChild(box)
    }
}
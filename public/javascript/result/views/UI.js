const getInput = () => document.querySelector('#user').value;

const clearInput = () => {
    document.querySelector('#user').value = ''
}

const clearResults = () => {
    document.querySelector('#fill').innerHTML = '';
    document.querySelector('#peter').innerHTML = '';
}

const displayOwner = (user) => {
    document.querySelector('#fill')
    fill.innerHTML=`
        <div>
            <p>${user.firstname}</p>
            <p>${user.othername}</p>
            <p>${user.surname}</p>
        </div>
    `    
}

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn_ results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, results) => {
    console.log(page)
    const pages = results.length;
    console.log(pages)
    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }
    document.querySelector('table').insertAdjacentHTML('afterend', button);
};

const renderResults = (results,currentResult,page) => {
    document.querySelector('#peter').innerHTML = ''
    renderResult(currentResult)
    // render pagination button
    renderButtons(page, results)
}

const renderResult = result => {
    var box=document.createElement('div')
    box.classList.add('resBox')
    box.innerHTML= `
        <table class="subjects">
            <thead>
                <tr class="noborder">
                    <th colspan="5" style="border-bottom:none;  text-align: center;">My Rehoboth International School</th>
                </tr>
                <tr class="noborder">
                    <th colspan="5" style="text-align: center">In God We Trust</th>
                </tr>
                <tr class="noborder>
                    <th colspan="5" style="text-align: left">Class </th>
                </tr>
                <tr class="noborder">
                    <th colspan="5" style="text-align: left">ClassTeacher : ${result.classTeacher}</th>
                </tr>
                <tr class="noborder">                 
                    <th colspan="5" style="text-align: left">Name : ${result.Term}</th>
                </tr>
                <tr class="noborder">
                    <th colspan="5" style="text-align: left">Section:${result.Term}</th>
                </tr>
                <tr class="noborder">
                    <th colspan="5" style="text-align: left">Term:</th>
                </tr>
                <tr class="head">
                    <th>Subject</th>
                    <th>Examiation</th>
                    <th>First_test</th>
                    <th>Second_test</th>
                    <th>Assignment</th>
                </tr>
                </thead>
                <tbody id="bodye">
                </tbody>
                <tfoot style=" margin-top: 10px;">
                    <tr>
                        <th colspan="2" style="text-align: left;">ClassTeacher : </th>
                        <th colspan="1" style="text-align: left;"></th>
                        <th colspan="2" style="text-align: right;">Principal :</th>
                    </tr>
                    <tr>
                        <th colspan="2" style="text-align: center;">_________</th>
                        <th colspan="1" style="text-align: left;"></th>
                        <th colspan="2" style="text-align: center;">__________</th>
                    </tr>
                </tfoot>                        
            </table>`
    document.querySelector('#peter').appendChild(box)
    appendResult(result)
}

const appendResult = (currentResult) => {
    var bodye=document.getElementById('bodye')
    for(var p=0; p < `${currentResult.subjects.length}`; p++){
        var tr=document.createElement('tr')
        tr.innerHTML = `
            <td class="sub">${currentResult.subjects[p].subject}</td>
            <td class="sub">${currentResult.subjects[p].Examination}</td>
            <td class="sub">${currentResult.subjects[p].First_test}</td>
            <td class="sub">${currentResult.subjects[p].Second_test}</td>
            <td class="sub">${currentResult.subjects[p].assignment}</td>
        `
        bodye.appendChild(tr); 
    }
    console.log(bodye)
}
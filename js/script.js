'use strict'; 

// element selector start here
const titleElm = document.querySelector('#title');
const subTitleElm = document.querySelector('#sub-title');
const assignedElm = document.querySelector('#assigneds');
const startDateElm = document.querySelector('#start');
const endDateElm = document.querySelector('#end');
const allItemElm = document.querySelector('.all-item');
const subTitleHeadingElm = document.querySelector('.sub-title-heading');

const addItemElm = document.querySelector('.all-item');
const dynamicValue = document.querySelector('.add-item');
// priority start here 
let prorityArr = document.querySelectorAll('input[name="priority"]');
// status 
let statusArr = document.querySelectorAll('input[name="status"]');
// submit btn 
const submitBtnElm = document.querySelector('form');

// main data storage
let dataBase = JSON.parse(localStorage.getItem('user-data')) || [];
console.log(dataBase)


submitBtnElm.addEventListener('submit',(evt) => 
{
	evt.preventDefault();
	// resiving value form input element
	const [title,subTitle,name,startDate,endDate] = resiveInputValue();
	// form validaatin  start here 
	const [priority,status] = radioBtn();
	// form validation
	const isError = validateForm(title,subTitle,name,startDate,endDate,priority,status);
	// console.log(isError)
	// console.log(priority)

	if(!isError)
	{
		// making unique id
		let id = dataBase.length + 1;
		let uniquId = dataBase.length;
		// set item to data base
		dataBase.push(
		{
			uniquId,
			id,
			title,
			subTitle, 
			name,
			startDate, 
			endDate,
			priority,
			status
		});
		// set item to ui
		setItemToUI(uniquId,id,title,subTitle,name,startDate,endDate,priority,status);
		// reset input field 
		resetInput(priority,status);

		// add item to localStorage 
		localStorage.setItem('user-data',JSON.stringify(dataBase))
	}
});


// delete item start here 
dynamicValue.addEventListener('click',(evt) => 
{
	evt.preventDefault()

	if(evt.target.classList.contains('delete'))
	{
		// finding uinque id
		const id = finding_unique_id(evt);
		// remove item form database 
		removeItemFromDataBase(id)
		
	}

});
// remove item form database 
function removeItemFromDataBase(id)
{
	let removeDataFromDtb = dataBase.find((product) => (product.uniquId === id));
	// console.log(removeDataFromDtb)

}


// finding uinque id
function finding_unique_id(evt)
{
	let parent = (evt.target.parentElement.parentElement.parentElement);
	return Number(parent.classList[1].split('-')[1]);
}

// form validation
function validateForm(title,subTitle,name,startDate,endDate,priority,status)
{
	let validate = false;

	// console.log(priority)
	if(title === '' || subTitle === '' || name === '' || startDate === '' || endDate === '' || priority === false || status === false)
	{
		// console.log('Please fill up the input field');
		alert('Opps!! Please fill up the input field');
		validate = true;
	}
	return validate;
}
// reset input field 
function resetInput(priority,status)
{
	titleElm.value = '';
	subTitleElm.value = '';
	assignedElm.value = '';
	startDateElm.value = '';
	endDateElm.value = '';
	allItemElm.value = '';

	priority = '';
	status = '';
}
// form validation
function radioBtn()
{
	let priority = false;
	let status = false;

	for(let i = 0; i < prorityArr.length; i++)
	{
		if(prorityArr[i].checked)
		{   
			priority = true;
			priority = prorityArr[i].value;
			break;
		}
	}
	for(let j = 0; j < statusArr.length; j++)
	{
		if(statusArr[j].checked)
		{   
			status = true;
			status = statusArr[j].value
			break;
		}
	}
	return [priority,status];
}

// set item to ui
function setItemToUI(uniquId,id,title,subTitle,name,startDate,endDate,priority,status)
{
	let htmlTemplete = `
				<div class="total-count">
					<div class="total">
						<p>Total : <span>20</span></p>
					</div>
					<div class="new">
						<p>New : <span>22</span></p>
					</div>
					<div class="prograss">
						<p>In Prograss : <span>2</span></p>
					</div>
				</div>
				
				
				<div class="sub-title">
					<div class="unique-id">
						<p>ID</p>
					</div>
					<div class="title">
						<p>Title</p>
					</div>
					<div class="priority">
						<p>Priority</p>
					</div>
					<div class="statusw">
						<p>Status</p>
					</div>
					<div class="date">
						<p>Due Date</p>
					</div>
					<div class="assigned">
						<p>Assigned To</p>
					</div>
					<div class="actions">
						<p>Action</p>
					</div>
				</div>
				
	`;
	allItemElm.innerHTML = htmlTemplete;

	let settingValuesTem = `
				<div class="item-values item-${uniquId}">
					<div class="my-last-testing">
						<span id="unique-id">${id}</span>
						<span id="titleValues">${title}</span>
						<span id="subtitleValues">${subTitle}</span>
						<span id="statusValues">${priority}</span>
						<span id="prograssValues">${status}</span>
						<span id="dateValues">${endDate}</span>
						<span id="assingValues">${name}</span>
						<span id="icons">
							<i class="fa-sharp fa-solid fa-pen-to-square updated"></i>
							<i class="fa-solid fa-square-check check-mark"></i>
							<i class="fa-solid fa-trash delete"></i>
						</span>
					</div>
				</div>
	`;
	dynamicValue.insertAdjacentHTML('beforeend',settingValuesTem);
}
// resiving value form input element
function resiveInputValue() 
{
	let title = titleElm.value;
	let subTitle = subTitleElm.value;
	let name = assignedElm.value;
	let startDate = startDateElm.value;
	let endDate = endDateElm.value;

	return [title,subTitle,name,startDate,endDate];
}

// show localStorage item to ui 
function show(storageData)
{
	storageData.forEach((data) => 
	{
			let htmlTemplete = `
				<div class="total-count">
					<div class="total">
						<p>Total : <span>20</span></p>
					</div>
					<div class="new">
						<p>New : <span>22</span></p>
					</div>
					<div class="prograss">
						<p>In Prograss : <span>2</span></p>
					</div>
				</div>
				
				
				<div class="sub-title">
					<div class="unique-id">
						<p>ID</p>
					</div>
					<div class="title">
						<p>Title</p>
					</div>
					<div class="priority">
						<p>Priority</p>
					</div>
					<div class="statusw">
						<p>Status</p>
					</div>
					<div class="date">
						<p>Due Date</p>
					</div>
					<div class="assigned">
						<p>Assigned To</p>
					</div>
					<div class="actions">
						<p>Action</p>
					</div>
				</div>
				
	`;
	allItemElm.innerHTML = htmlTemplete;
	// user data
	let settingValuesTem = `
				<div class="item-values item-${data.uniquId}">
					<div class="my-last-testing">
						<span id="unique-id">${data.id}</span>
						<span id="titleValues">${data.title}</span>
						<span id="subtitleValues">${data.subTitle}</span>
						<span id="statusValues">${data.priority}</span>
						<span id="prograssValues">${data.status}</span>
						<span id="dateValues">${data.endDate}</span>
						<span id="assingValues">${data.name}</span>
						<span id="icons">
							<i class="fa-sharp fa-solid fa-pen-to-square updated"></i>
							<i class="fa-solid fa-square-check check-mark"></i>
							<i class="fa-solid fa-trash delete"></i>
						</span>
					</div>
				</div>
	`;
	dynamicValue.insertAdjacentHTML('beforeend',settingValuesTem);
	})
}
show(dataBase);






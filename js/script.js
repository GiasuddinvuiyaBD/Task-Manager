'use strict'; 

// element selector start here
const titleElm = document.querySelector('#title');
const subTitleElm = document.querySelector('#sub-title');
const assignedElm = document.querySelector('#assigneds');
const startDateElm = document.querySelector('#start');
const endDateElm = document.querySelector('#end');
const allItemElm = document.querySelector('.all-item');
const subTitleHeadingElm = document.querySelector('.sub-title-heading');

// priority start here 
let prorityArr = document.querySelectorAll('input[name="priority"]');
// status 
let statusArr = document.querySelectorAll('input[name="status"]');

// submit btn 
const submitBtnElm = document.querySelector('form');
// main data storage
const dataBase = [];


submitBtnElm.addEventListener('submit',(evt) => 
{
	evt.preventDefault();
	// resiving value form input element
	const [title,subTitle,name,startDate,endDate] = resiveInputValue();
	// form validaatin  start here 
	const [priority,status] = validateForm();

	// making unique id
	let id = dataBase.length + 1;
	// set item to data base
	dataBase.push(
	{
		id,
		title,
		subTitle, 
		name,
		startDate, 
		endDate,
		priority,
		status
	})

	// set item to ui
	setItemToUI(id,title,subTitle,name,startDate,endDate,priority,status)
	
});
// form validation
function validateForm()
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
function setItemToUI(id,title,subTitle,name,startDate,endDate,priority,status)
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
				<div class="item-values item-${id}">
					<div class="id-value">
						<p>${id}</p>
					</div>
					<div class="title-value">
						<p>${title}</p>
					</div>
					<div class="status">
						<p>${priority}</p>
					</div>
					<div class="prograss-value">
						<p>${status}</p>
					</div>
					<div class="date-value">
						<p>${endDate}</p>
					</div>
					<div class="assigned-value">
						<p>${name}</p>
					</div>
					<div class="icon">
						<p>
							<i class="fa-sharp fa-solid fa-pen-to-square updated"></i>
							<i class="fa-solid fa-square-check check-mark"></i>
							<i class="fa-solid fa-trash delete"></i>
						</p>
					</div>
				</div>
	`;
	// allItemElm.insertAdjacentHTML('afterbegin',settingValuesTem);
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






/*
 *Decided it would be best to just have all the divs
 *responsible for holding information, to simply be available
 *everywhere.
 */
const infoTable = document.getElementById('infoTable');
const searchTable = document.getElementById('searchTable');

var onLoad = function(e) {
  init();
}

var init = function () {
  requestAllInfo();
  document.reportDriver.submit.addEventListener('click', submitBadDriver);
}

// Clears the input form at the top of the page.
var clearForm = function () {
  document.reportDriver.car.value = '';
  document.reportDriver.plate.value = '';
  document.reportDriver.city.value = '';
  document.reportDriver.road.value = '';
  document.reportDriver.description.value = '';
  // document.reportDriver.date.value = '';
}

/*
 * This function checks which button is incoming from the search
 * location on the page. Based on the button, it sends the appropriate
 * information to the search function.
 */
var performSearchForReports = function (e) {
  e.preventDefault();
  let answerLocation = e.target.nextElementSibling;
  if (e.target.name === 'findByCar') {
    requestSearchForReports('car', e.target.parentElement.car.value, answerLocation);
  }
  if (e.target.name === 'findByCity') {
    requestSearchForReports('city', e.target.parentElement.city.value, answerLocation);
  }
  if (e.target.name === 'findByRoad') {
    requestSearchForReports('road', e.target.parentElement.road.value, answerLocation);
  }
}

var performDetails = function (e) {
  requestDriver(e.target.id, e.target.parentElement.parentElement);
}

var performDelete = function (e) {
  e.preventDefault();
  requestDeleteDriver(e.target.parentElement.id.value);
}

var performUpdate = function (e) {
  e.preventDefault();
  let driver = {};
  driver.id = e.target.parentElement.id.value;
  driver.car = e.target.parentElement.car.value;
  driver.plate = e.target.parentElement.plate.value;
  driver.city = e.target.parentElement.city.value;
  driver.road = e.target.parentElement.road.value;
  driver.description = e.target.parentElement.description.value;
  requestUpdateDriver(driver, driver.id, document.getElementById(driver.id));
}

var countSearchResult = function (data, location) {
  location.textContent = data.length;
}

//removes the form called "FormOpen" from the page.
var closeForm = function () {
  let form = document.getElementById('formOpen');
  if (form != undefined) {
    let parent = form.parentElement;
    parent.removeChild(form);
  }
}

/* We are building a form here and populating it with
 * data gathered by the database on this particular
 * driver report. I'm not sure this is the right way to do this.
 * At this point, I'm purely trying to follow instrunctions
 * given in the document. This is NOT how I'd format this or
 * even present this.
 */
var populateDetails = function (driver, table) {
  let detailDiv = document.createElement('div');
  closeForm();
  let form = document.createElement('form');
  form.id = 'formOpen';

  let th = document.getElementById(driver.id)
  th.textContent = driver.car + ' with plate number: ' + driver.plate;

  table.appendChild(detailDiv);
  detailDiv.appendChild(form);

  let inputId = document.createElement('input');
  inputId.type = 'hidden';
  inputId.name = 'id';
  inputId.value = driver.id;
  form.appendChild(inputId);
  let inputCar = document.createElement('input');
  inputCar.type = 'text';
  inputCar.name = 'car';
  inputCar.value = driver.car;
  form.appendChild(inputCar);
  let inputPlate = document.createElement('input');
  inputPlate.type = 'text';
  inputPlate.name = 'plate';
  inputPlate.value = driver.plate;
  form.appendChild(inputPlate);
  let inputCity = document.createElement('input');
  inputCity.type = 'text';
  inputCity.name = 'city';
  inputCity.value = driver.city;
  form.appendChild(inputCity);
  let inputRoad = document.createElement('input');
  inputRoad.type = 'text';
  inputRoad.name = 'road';
  inputRoad.value = driver.road;
  form.appendChild(inputRoad);
  let inputDescription = document.createElement('input');
  inputDescription.type = 'text';
  inputDescription.name = 'description';
  inputDescription.value = driver.description;
  form.appendChild(inputDescription);
  //Can't figure out how to implement dates.
  // let inputDate = document.createElement('input');
  // inputDate.type = 'datetime';
  // inputDate.name = 'date';
  // inputDate.value = driver.date;
  // form.appendChild(inputDate);

  let editButton = document.createElement('input');
  editButton.type = 'submit';
  editButton.name = 'edit';
  editButton.value = 'Edit';
  editButton.addEventListener('click', performUpdate);

  let deleteButton = document.createElement('input');
  deleteButton.type = 'submit';
  deleteButton.name = 'delete';
  deleteButton.value = 'Delete';
  deleteButton.addEventListener('click', performDelete);

  let br = document.createElement('br');
  form.appendChild(br);
  form.appendChild(editButton);
  form.appendChild(deleteButton);
}

//Verify's all information on the bad driver is entered properly.
var verifyInput = function (report) {
  let errorArr = [];
  if (report.car == undefined || report.car == '') {
    errorArr.push('Driver Car is Undefined');
  }
  if (report.plate == undefined || report.plate == '') {
    errorArr.push('Driver Plate is Undefined.')
  }
  return errorArr;
}

//Submits a new bad driver into the database.
var submitBadDriver = function (e) {
  e.preventDefault();
  let driver = {};
  driver.car = e.target.parentElement.car.value;
  driver.plate = e.target.parentElement.plate.value;
  driver.city = e.target.parentElement.city.value;
  driver.road = e.target.parentElement.road.value;
  driver.description = e.target.parentElement.description.value;
  // driver.date = e.target.parentElement.date.value;

  let errorArr = verifyInput(driver);

  if (errorArr.length > 0) {
    console.error('Inproper input given');
  } else {
    clearForm();
    requestPostNewDriver(driver);
  }
}

//Build the information table of all bad drivers
var buildTable = function (data, div) {
  div.textContent = '';
  for (let i = data.length-1; i >= 0; i--) {
    let driver = data[i];
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.id = driver.id;
    th.textContent = driver.car + ' with plate number: ' + driver.plate;


    th.addEventListener('click', performDetails);

    tr.appendChild(th);
    table.appendChild(tr);
    div.appendChild(table);
  }

}

/*
 *API Request: Grabs all drivers in database and when collected
 *displays all those drivers in a table on the front page.
 */
var requestAllInfo = function () {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers';
  xhr.open('GET', url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      buildTable(data, infoTable);
    }
    if (xhr.readyState === 4 && xhr.status >= 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }

  xhr.send(null);
}

/*
 * Handles creating a new driver post and makes the request
 * to the database for the information. Upon receiving
 * information, it will make an immediate call to get all
 * bad drivers and update the list.
 */
var requestPostNewDriver = function (driver) {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers';
  xhr.open('POST', url);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 201) {
      requestAllInfo();
    }
    if (xhr.readyState === 4 && xhr.status == 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }

  let stringifiedDriver = JSON.stringify(driver);
  xhr.send(stringifiedDriver);
}

/*
 * Makes a request to the database to gather the information
 * about a specific driver record. Requires the table
 * requesting this information to also be sent to it.
 */
var requestDriver = function (id, table) {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers/' + id;
  xhr.open('GET', url);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      populateDetails(data, table);
    }
    if (xhr.readyState === 4 && xhr.status == 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }

  xhr.send(null);
}
/*
 * Makes a request to the database, to delete a driver by
 * its id.
 */
var requestDeleteDriver = function(id) {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers/' + id;

  xhr.open('DELETE', url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 204) {
      requestAllInfo();
    }
    if (xhr.readyState === 4 && xhr.status == 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }
  xhr.send(null);
}

var requestUpdateDriver = function(driver, id, table) {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers/' + id;

  xhr.open('PUT', url);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      let data = JSON.parse(xhr.responseText);
      populateDetails(data, table)
    }
    if (xhr.readyState === 4 && xhr.status == 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }
  console.log(driver);
  let stringifiedDriver = JSON.stringify(driver);
  xhr.send(stringifiedDriver);
}

var requestSearchForReports = function(searchBy, keyword, answerLocation) {
  let xhr = new XMLHttpRequest;
  let url = 'api/drivers/search/' + searchBy + '/' + keyword;

  xhr.open('GET', url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      countSearchResult(data, answerLocation);
    }
    if (xhr.readyState === 4 && xhr.status === 400) {
      console.error(xhr.status + ' ' + xhr.responseText);
    }
  }

  xhr.send(null);
}

document.reportQuery.findByCar.addEventListener('click', performSearchForReports);
document.reportQuery.findByCity.addEventListener('click', performSearchForReports);
document.reportQuery.findByRoad.addEventListener('click', performSearchForReports);



window.addEventListener('load', onLoad);

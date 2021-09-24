//Add events for first interaction
$('#sendAgeBtn').on('click', () => {
  //Get user's age
  let userAge =  $('#ageInput').val();

  //Validate user's age
  if (userAge.length == 0) swal('Try again', 'Please type an input.', 'error');

  else if (userAge < 0 || userAge > 115) swal('Try again', 'Please enter a valid age.', 'error');

  //Hide input box
  else {
    //Generate year options
    let today= new Date();
    
    let yearOptions = [today.getFullYear()-userAge-1, today.getFullYear()-userAge, today.getFullYear()-userAge+1];

    yearOptions.forEach( e => $('#userYear').append('<option value="' + e + '">' + e + '</option>"'));

    $('#box1').hide();
    $('#box2').fadeToggle(1000);
  }   
})

$('#sendBirthday').on('click', () => {
  //Get user's birthday
  let userDay = $('#userDay').val();
  let userMonth = $('#userMonth').val();
  let userYear = $('#userYear').val();

  //Validate user's date
  if (!isValidDate(`${Number(userMonth)+1}/${userDay}/${userYear}`)) swal('Try again', `${Number(userMonth)+1}/${userDay}/${userYear} is not valid`, 'error');
  else {
    
    let nextDate = findNextMathBirthday(Number(userMonth), Number(userDay), Number(userYear));

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $('#nextMathBirthday').append('<h1 class="text-center result">'+ months[nextDate.getMonth()] + " " +  nextDate.getDate() + ", " + nextDate.getFullYear() +'</h1>');
    
    $('#box2').hide();
    $('#box3').fadeToggle(1000);
  }  
})

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};


function findNextMathBirthday(month, day, year){

  let powerCounter = 1;
  day += Math.pow(10, powerCounter);

  let nextDate = new Date(year, month, day);
  let today = new Date();
  
  while (nextDate < today) {
    powerCounter++;
    day += Math.pow(10, powerCounter);
    nextDate = new Date(year, month, day);
  }

  return nextDate;
}
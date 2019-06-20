//hides elements and selects name input
$(function () {
    $('input')[0].focus();
    $('#other-role').hide();
  //NEW ADDITIONS THE FIXES
    $('#color').prepend('<option value="select">Please Select a T-Shirt Theme</option>');
    $('#color option[value="select"]').show();
    $('#color').find('option[value="select"]').prop('selected', 'selected');
//DONE
    $('#payment option:eq(1)').prop('selected',true);
   
    showCCInfo();

});
//Check all requred info is true 
let formCheck = {"name":false,
    "mail":false,
    "act":false,
    "ccnum":false,
    "zip":false,
    "cvv":false
};

//Error if name is blank
$('#name').on('input',function (e) {
  $('.nameError').remove();

    let userInput = (e.target.value);
    console.log(userInput.length);
    console.log(userInput);
    let whiteRegex = /[\s]/g;
    userInput = userInput.replace(/\s/g,"");
    if (userInput === "") {
        $(this).css("border", "5px solid #f11");
    }
    else{
        $(this).css("border", "none");
        formCheck.name = true;
        $('.nameError').hide();
    }
});
//Error if email is empty, doesnt have the @ & .com 
//
$('#mail').on('input',function (e) {

    $('.mailError').remove();
    let emailInput = (e.target.value);
    let emallForm = /[a-zA-z]*@[a-zA-z]*\.[a-z]+/g;
    let mailTotal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailInput === "") {
        $(this).css("border", "5px solid #f11");
    }
    else if (!mailTotal.test(emailInput)){
        $(this).css("border", "5px solid #f11");
    }
    else {
        $(this).css("border", "none");
        $('.mailError').hide();
        formCheck.mail = true;

    }
});

//hides payment info based on selected option
function showCCInfo(){
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
}
function showpaypalInfo(){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
}
function showbitcoinInfo(){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
}




const jobRole = document.querySelector('#title');
const fieldset = document.querySelectorAll('fieldset')[0];
//creates textarea for the other option
$('#title').change(function () {
    $('#other-title').hide();
    const currOption = $( "select#title option:checked" ).val();
    let otherRole = document.createElement('textarea');
    if (currOption === 'other') {
        $('#other-role').show();
    }
    else {
        console.log("da");
        $('#other-role').hide();
    }
});

//shows available colors for the selected theme
$('#design').change(function (e) {
    const designValue = ($('select#design option:checked')).val();
    console.log(designValue);


    if (designValue === 'js puns'){
        $('#color').show();
        $('.puns').show();
        $('.heart').hide();
    }
    else if (designValue === 'heart js'){
        $('#color').show(); 
        $('.heart').show();
        $('.puns').hide();
    }
    else if (designValue === 'Select Theme'){
        $('#color option').hide();
        $('.puns').hide();
        $('.heart').hide();
    }
});





const activities = document.querySelector('.activities');
const activityDiv = document.createElement('div');
activityDiv.setAttribute("id", "activityDiv");
activities.appendChild(activityDiv);
//Ensures no double bookings on workshops and totals the cost up for selected events
activities.addEventListener('change', (e) => {
    const inputs = $('.activities input');
    const labels = $('.activities label');
    let total=0;

    if (inputs[1].checked) {
        inputs[3].setAttribute("disabled","disabled");
    }
    else {
        inputs[3].removeAttribute("disabled");
    }
    if(inputs[3].checked) {
        inputs[1].setAttribute("disabled","disabled");
    }
    else {
        inputs[1].removeAttribute("disabled");
    }
    if (inputs[2].checked) {
        inputs[4].setAttribute("disabled","disabled");
    }
    else {
        inputs[4].removeAttribute("disabled");
    }
    if(inputs[4].checked) {
        inputs[2].setAttribute("disabled","disabled");
    }
    else {
        inputs[2].removeAttribute("disabled");
    }
    for (let i =0; i < inputs.length; i++) {
        if(inputs[i].checked){
            let str = labels[i].textContent;
            total +=parseInt(str.substring(str.indexOf("$")+1));
        }
    }
    if (total > 0) {
        activityDiv.textContent = "Total: $"+total;
        $('#activityDiv').show();
        $('.actmsg').hide();
        $('.activities').css("border","none");
        formCheck.act = true;
    }
    else {
        $('#activityDiv').hide();
        $('.activities').css("border","5px solid #f11");
        formCheck.act = false;
    }
});
//show other payment info
$('#payment').on('input',function (e) {
    const SelectedPayment = $( "select#payment option:checked" ).val();
    console.log(SelectedPayment);
    if (SelectedPayment === 'credit card' || SelectedPayment ==='select_method'){
        showCCInfo();
    }
    else if (SelectedPayment === "paypal") {
       showpaypalInfo();
       formCheck.ccnum = true;
       formCheck.zip = true;
       formCheck.cvv = true;
    }
    else{
        showbitcoinInfo();
        formCheck.ccnum = true;
        formCheck.zip = true;
        formCheck.cvv = true;
    }
});
//Ensures a 13-16 CC#
$('#ccnum').on('input',function (e) {
    $('.ccError').remove();
    const ccNum = e.target.value;
    let ccLength = /^[\d]{13,16}$/;

    if(!ccLength.test(ccNum)){
        $(this).css("border","5px solid #f11");
    }
    else {
        formCheck.ccnum = true;
        $(this).css("border","none");
    }
});
//Errors if numbers arent in inputed or if the length of the zip is > or < 5
$('#zip').on('input',function (e) {
    $('.zipError').remove();
    const zipNum = e.target.value;
    const zipNumLength = zipNum.length;
    const onlyLetters = /[a-zA-z]/;
    if (zipNumLength < 5 && !onlyLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");
    }
    else if (zipNumLength > 5 && !onlyLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");
    }
    else if (onlyLetters.test(zipNum)){
        $(this).css("border","5px solid #f11");

    }
    else {
        $(this).css("border","none");
        formCheck.zip = true;
    }
});

// Errors if cvv contains letters or is > or < 3
$('#cvv').on('input',function (e) {

    $('.cvvError').remove();
    $(this).css("border","none");
    const cvvNum = e.target.value;
    const cvvNumLength = cvvNum.length;
    const onlyLetters = /[a-zA-z]/;
    if (cvvNumLength < 3 && !onlyLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");

    }
    else if (cvvNumLength > 3 && !onlyLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");
    }
    else if (onlyLetters.test(cvvNum)){
        $(this).css("border","5px solid #f11");
    }
    else if (cvvNumLength === 3){
        console.log("good");
        $('.cvvError').remove();
        $(this).css("border","none");
        formCheck.cvv = true;
    }
});

// Ensures no blanks or invalid input will be submitted
$('#form').submit(function (e) {
    for (var key in formCheck){
        if (formCheck[key] === false){
            $('.submitmsg').remove();
            e.preventDefault();
            $('#'+key).css("border", "5px solid #f11");
            $('html,body').scrollTop(0);
        }
    }
});

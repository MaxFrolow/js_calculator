
NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
OPERATORS = ['+', '-', '*', '/', ' ']
table = document.getElementById('main-table')

table.onclick = function(event){
    console.log(document.getElementById('main-field').value != '')
    let target = event.target
    if (target.id == 'clear'){
        clearText();
    }else if (target.id == 'back'){
        backText();
    }else if (target.id == 'equals'){
        result()
    }
    else if (target.className.search('bttn') != -1){
        if(OPERATORS.includes(target.innerText) && (document.getElementById('main-field').value == '')){
            clearText()
        }
        else if (OPERATORS.includes(target.innerText) &&
            OPERATORS.includes(document.getElementById('main-field').value.charAt(document.getElementById('main-field').value.length - 1)) &&
            (document.getElementById('main-field').value != '')
            ){
            backText()
            backText()
            backText()
            document.getElementById('main-field').value +=(' ' + target.textContent + ' ');
        }else if(OPERATORS.includes(target.innerText) &&
        (document.getElementById('main-field').value != '')
        ){
            document.getElementById('main-field').value +=(' ' + target.textContent + ' ');
        }else{
            document.getElementById('main-field').value +=target.textContent;
        }
    }
};
function clearText(){
    document.getElementById('main-field').value = '' 
};

function backText(){
    document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
};
function result(){
    document.getElementById('main-field').value = 'result'
}

function format_string(data){

}
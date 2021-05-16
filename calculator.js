
NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
OPERATORS = ['+', '-', '*', '/', ' ']

//Display methods

//Getting table and start event listening
table = document.getElementById('main-table')
let parenthesisBalance = 0
table.onclick = function(event){
    //dynamic variables(changed by every event)
    let dataLen = document.getElementById('main-field').value.length
    let target = event.target
    var last_item = document.getElementById('main-field').value.charAt(document.getElementById('main-field').value.length - 1)
   
    //handling edditing buttons: clear, back, uquals
    if (target.id == 'clear'){
        clearText();
    }else if (target.id == 'back'){
        backText();
    }else if (target.id == 'equals'){
        if (parenthesisBalance == 0){
            data = document.getElementById('main-field').value;
            document.getElementById('main-field').value = result(data)
        }   
    }
    else if (dataLen <=40){
    //handling '(' and ')' signs
        if (target.innerText == '('){
            if (NUMBERS.includes(last_item) ||
                last_item == ')'    
            ){
                event.preventDefault()
            }else{
                parenthesisBalance += 1
                document.getElementById('main-field').value +=target.textContent;
            }
        }else if (target.innerText == ')'){
            if (OPERATORS.includes(last_item) ||
                last_item == '('    
            ){
                event.preventDefault()
            }else if (parenthesisBalance > 0){
                document.getElementById('main-field').value +=target.textContent;
                parenthesisBalance -= 1


            }
        }
        
        //other buttons handlers
        else if (target.className.search('bttn') != -1){
            //operators handler
            if(OPERATORS.includes(target.innerText) && (document.getElementById('main-field').value == '')){
                clearText()
            }
            else if (OPERATORS.includes(target.innerText) &&
                OPERATORS.includes(last_item) &&
                (document.getElementById('main-field').value != '')
                ){
                backText()
                document.getElementById('main-field').value +=(' ' + target.textContent + ' ');
            }else if(OPERATORS.includes(target.innerText) &&
            (document.getElementById('main-field').value != '')
            ){
                document.getElementById('main-field').value +=(' ' + target.textContent + ' ');
            }//numbers handler
            else if(last_item != ')'){
                document.getElementById('main-field').value +=target.textContent;
            }
        }
    }
}

//base buttons functions
function clearText(){
    document.getElementById('main-field').value = '' 
    parenthesisBalance = 0
}

function backText(){
    last_item = document.getElementById('main-field').value.charAt(document.getElementById('main-field').value.length - 1)
    if(last_item == ' '){
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
    }else if(last_item =='('){
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
        parenthesisBalance -= 1
    }else if(last_item ==')'){
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
        parenthesisBalance += 1
    }else{
        document.getElementById('main-field').value = document.getElementById('main-field').value.slice(0, -1)
    }

}

//main calculator handlers
function result(data){
    data = format_string(data)
    if (parenthesisBalance == 0){
        multipleDivisionHandler(data);
        additionSubstractionHandler(data)
    }
    return data[0].toString()
}


function format_string(data){

    while (data.indexOf('(') !=-1){
        let openPar, closePar
        [openPar,closePar] = collectBaseFamily(data)
        new_data = data.substring((openPar+1), closePar)
        data = data.replace(data.substring(openPar, (closePar + 1)), result(new_data).toString())
    }
    if(data.indexOf(' ') != -1){
        return data.split(' ')
    }else{
        return [data]
    }
}

function collectSign(sign, data){
    targetArray = []
    new_data = data.slice()
    while (new_data.indexOf(sign) != -1){
        if (targetArray.length == 0){
            targetArray.push(new_data.indexOf(sign))

        }else{
            targetArray.push(new_data.indexOf(sign) + targetArray[targetArray.length - 1] + 1)
        }
        new_data = new_data.slice(new_data.indexOf(sign) + 1)
    }
    return targetArray
}
let collectOpennedPar = collectSign.bind(null, '(')
let collectClosedPar = collectSign.bind(null, ')')

function collectBaseFamily(data){
    opennedPar = collectOpennedPar(data)
    closedPar = collectClosedPar(data)
    if(opennedPar.length == 1){
        return[opennedPar[0], closedPar[0]]
    }else{
        for(let i=0; i<opennedPar.length; i++){
            if (opennedPar[i+1] > closedPar[0]){
                return [opennedPar[i], closedPar[0]]
            }else if((i+1)== opennedPar.length){
                return[opennedPar[i], closedPar[0]]
            }
        }
        
    }
}



//Calculating methods

//multiplication
function multipleOperation(data){
    place = data.findIndex(item => item == '*');
    newItem = data[place - 1] * data[place + 1]
    data.splice((place - 1), 3, newItem.toString())
    
}
//division
function divisionOperation(data){
    place = data.findIndex(item => item == '/');
    newItem = data[place - 1] / data[place + 1]
    data.splice((place - 1), 3, newItem.toString())
}

//addition
function additionOperation(data){
    while (data.findIndex(item => item == '+') != -1){
        place = data.findIndex(item => item == '+');
        newItem = Number(data[place - 1]) + Number(data[place + 1])
        data.splice((place - 1), 3, newItem.toString())
    }
}
//substriction
function substractionOperation(data){
    while (data.findIndex(item => item == '-') != -1){
        place = data.findIndex(item => item == '-');
        newItem = Number(data[place - 1]) - Number(data[place + 1])
        data.splice((place - 1), 3, newItem.toString())
    }
}
// forward order multiple-division
function multipleDivisionHandler(data){
    while((data.findIndex(item => item == '*') != -1)&&
          (data.findIndex(item => item == '/') != -1)){
            mult = data.findIndex(item => item == '*');
            divis = data.findIndex(item => item == '/');
            if (mult < divis){
                multipleOperation(data)
            }else{
                divisionOperation(data)
            }
          }
    while (data.findIndex(item => item == '*') != -1){
        multipleOperation(data)
    }
    while (data.findIndex(item => item == '/') != -1){
        divisionOperation(data)
    }
}
//forward order addition-substraction
function additionSubstractionHandler(data){
    while((data.findIndex(item => item == '+') != -1)&&
          (data.findIndex(item => item == '-') != -1)){
            add = data.findIndex(item => item == '+');
            subs = data.findIndex(item => item == '-');
            if (add < subs){
                additionOperation(data)
            }else{
                substractionOperation(data)
            }
          }
    while (data.findIndex(item => item == '+') != -1){
        additionOperation(data)
    }
    while (data.findIndex(item => item == '-') != -1){
        substractionOperation(data)
    }
}


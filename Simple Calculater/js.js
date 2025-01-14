const calculatorContainer = document.getElementById('calculate-container');
const displayArea = document.getElementById('display-area');
const resultArea = document.getElementById('result-area');
let hasError = false;

calculatorContainer.addEventListener('click', e => {
    if (e.target.nodeName === "BUTTON") {
        const buttonValue = e.target.textContent;
        if (buttonValue === "C") {
            clear();  
        } else if (buttonValue === "DEL") {
            deleteOneValue(); 
        } else {
            handleInput(buttonValue);
        }
    }
});

document.addEventListener('keydown', e => {
    const key = e.key;

    if (key === "Delete") {
        clear();  
    } else if (key === "Backspace") {
        deleteOneValue(); 
    } else if (!isNaN(key) || "+-*/().".includes(key)) {
        handleInput(key); 
    } else if (key === "Enter" || key === "=") {
        e.preventDefault(); 
        if (!hasError) evaluate();
    }
});

// ⬇️ في مشكلة مش عارف اي هيا , بس لما بعمل اول عملية حسابية وتطلع النتيجة بتطلع بين الاقواس دي 
// []
function handleInput(input) {
    if (!hasError) {
        if (input === "=" || input === "Enter") {
            evaluate(); 
        } else {
            addToDisplayArea(input); 
        }
    }
}

function clear() {
    displayArea.textContent = "";
    resultArea.textContent = "";
    hasError = false; 
}

function addToDisplayArea(value) {
    displayArea.textContent += value;
}

function deleteOneValue() {
    let currentContent = displayArea.textContent;
    if (currentContent.length > 0) {
        displayArea.textContent = currentContent.substring(0, currentContent.length - 1); // حذف آخر حرف فقط
    }
}

function evaluate() {
    try {
        let calculation = math.evaluate(displayArea.textContent);
        resultArea.textContent = calculation; 
        resultArea.style.display = 'flex'; 
        setTimeout(() => {
            resultArea.style.opacity = '1'; 
            resultArea.style.transform = 'translateY(0)'; 
        }, 10); 
    } catch (error) {
        resultArea.textContent = "Error"; 
        hasError = true;
        console.error(error);
        resultArea.style.display = 'flex'; 
        setTimeout(() => {
            resultArea.style.opacity = '1'; 
            resultArea.style.transform = 'translateY(0)';
        }, 10);
    }
}



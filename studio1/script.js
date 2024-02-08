( function(){
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const formData = document.querySelectorAll("input[type=text]");

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
    
        processFormData(formData);
    });

    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (let eachWord of formData){
            if(eachWord.value){
                words.push(eachWord.value);
            } else {
                emptyfields.push(counter);
            }
            counter++;
        }
        if(emptyfields.length > 0){
            showErrors (formData, emptyfields);
        } else {
            makeMadlib(words);
        }
    }

    

    function showErrors(formData, emptyfields){
        const errorId = formData[emptyfields[0]].id;
        const errorText = `Please fill out this field ${errorId}`;
        madlib.innerHTML = errorText;
        document.querySelector(`#${errorId}`).focus();
    }

    function makeMadlib(words){

        document.querySelector('#overlay').className = "showing";

        const myText = 
        
        `<h2>Dear ${words[0]},</h2>
     <p>The Office of ${words[1]} regrets to inform you that we cannot offer you a ${words[2]} at the University of ${words[3]} in the class of ${words[4]}.</p>
     <p>We ${words[5]} over ${words[6]} ${words[7]}s this year, ${words[8]} more than last year. With that in mind, we can unfortunately only admit a ${words[9]} fraction of ${words[10]} through a very ${words[11]} reviewing process.</p>
     <p>While your ${words[7]} was impressive, we ultimately decided that the ${words[12]} it ${words[13]} renders you unsuitable for the ${words[14]} environment we foster here at the University of ${words[3]}.</p>
     <p>We are ${words[15]} for your ${words[16]} in the University of ${words[3]}, and wish you the best in your future ${words[17]}.</p>
     <p>Sincerely,</p>
        <p>${words[18]}</p>
        <p>Director of ${words[1]}</p>`
        madlib.innerHTML = myText;
        for (const eachField of formData){
            eachField.value = '';
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('#overlay').className = "hidden";
        }
    });

})();

/*`Here are the words so far: ${words[0]}, ${words[1]}, ${words[2]}, and ${words[3]}.`;*/
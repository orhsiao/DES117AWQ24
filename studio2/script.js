( function(){
    'use strict';
    console.log('Reading JS');

    const theArticles = document.querySelectorAll('article');
    const theSection = document.querySelector('section');
    const observer = new IntersectionObserver(callBack, {threshold:0.5, root: theSection});
    theArticles.forEach(function(eachArticle){
        observer.observe(eachArticle);
    });

    function callBack(entries){
        entries.forEach( function(eachEntry){
            if(eachEntry.isIntersecting){
                console.log(eachEntry.target);
                eachEntry.target.className = "show";
            } else {
                eachEntry.target.removeAttribute('class');
            }
        } );
    };
    
})();
( function(){

    'use strict';
    console.log('Reading JS');

    
    
    
    // don't do anything until all the images and everything loads!
window.addEventListener('load', function () {
    'use strict';
    const sliderContent = document.querySelector('.a');
    // Get the width of the slider
    const sliderWidth = sliderContent.offsetWidth;
    // Clone the slider and give the cloned version a class of ".b"
    const cloned = sliderContent.cloneNode(true);
    cloned.className = "b";
    // Add the cloned slider to to the .slider div so there are two copies of pictures
    document.querySelector('.slider').appendChild(cloned);

    // Get the :root from the stylesheet (which has CSS variables listed)
    const root = document.querySelector(':root');
    // set the left position of the slider so half of it is off the left side of the window.
    const endLeftPos = `-${sliderWidth}px`;
    // set the custom variable inside the stylesheet. 
    // This variable is used in the @keyframe animation   
    root.style.setProperty('--sliderwidth', endLeftPos);
    //console.log(getComputedStyle(root).getPropertyValue('--sliderwidth'));

    // Add the animate class to the slider, which will animate it.
    document.querySelector('.slider').classList.add("animate");

    // Add an event listener for hovering over the slider to pause it
    document.querySelector('.slider').addEventListener('mouseover', function(){
        document.querySelector('.animate').style.animationPlayState = 'paused';
    });

    //Add an event listener to restart the animation after pausing stopped.
    document.querySelector('.slider').addEventListener('mouseout', function(){
        document.querySelector('.animate').style.animationPlayState = 'running';
    });

    const closeBtns = document.querySelectorAll('.close');

    /* Event delegation: put the event handler on the whole document, then 
    check to see if an element with .photo class was clicked. If it was, then
    proceed with the code. This is needed because half of the photos are
    added dynamically after the page was loaded. So click handlers added to 
    the .photo class won't capture those images. */
   
    document.addEventListener('click', function(event){
        if(event.target.className == 'photo'){
            console.log(event.target.src);
            const imgSrc = event.target.src;
            //get the position in the string of the last /
            const lastSlash = imgSrc.lastIndexOf('/');
            //get the position in the string of the last .
            const lastDot = imgSrc.lastIndexOf('.');
            //get the letters between the last / and the last .
            const filename = imgSrc.substring(lastSlash+1, lastDot);
            console.log(filename);
            document.getElementById(`${filename}`).className = 'overlay showing';
            document.querySelector('.animate').style.animationPlayState = 'paused'; // ABRAR! i tried to add this (line 63) as well as line 71 and 78 to make the scroll stop while the overlay was displayed but it did not work.
        }
    } );

    for (const eachBtn of closeBtns) {
        eachBtn.addEventListener('click', function (event) {
            event.preventDefault();
            document.querySelector('.showing').className = 'overlay hidden';
            document.querySelector('.animate').style.animationPlayState = 'running';
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.showing').className = 'overlay hidden';
            document.querySelector('.animate').style.animationPlayState = 'running';
        }
    });
}); 

})();
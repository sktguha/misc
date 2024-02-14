<script>
// FOR BEST CLARITY TO DISTINGUISH SEE WHEN THE FUNCTION ITSELF IS ABLE TO RUN 
function throttle(fn, timeout){
    let timer;
    return (...args)=>{
        if(!timer){
            fn(...args);
            timer = setTimeout(()=>{ 
                timer = null; 
                clearTimeout(timer);
            }, timeout);
        }
    }
}

// https://www.freecodecamp.org/news/javascript-debounce-example/
function debounceFinal(fn, timeout){
    let timer;
    return (...args)=>{
        clearTimeout(timer); 
        timer = setTimeout(()=>fn(...args), timeout);
    }
}

// hmm not sure about this one hmm , this is leading edge
// leading means execute mine NOW, & then clear the old timeout
function debounce_leading(func, timeout = 300){
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

// it seems throttle here is similar to debounce ( line no 3 ) there of mine hmm
// function throttle(mainFunction, delay) {
//   let timerFlag = null; // Variable to keep track of the timer

//   // Returning a throttled version 
//   return (...args) => {
//     if (timerFlag === null) { // If there is no timer currently running
//       mainFunction(...args); // Execute the main function 
//       timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
//         timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
//       }, delay);
//     }
//   };
// }
</script>

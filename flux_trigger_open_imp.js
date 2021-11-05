const robot = require('robotjs');

async function delay(ms){
    await new Promise((resolve, reject)=>setTimeout(()=>resolve(),ms))
}

async function moveAndClick(){
    // robot.moveMouse(0,0);
    // TODO: add increments of x coords so can adjust quickly
    const x = 1342;
    if(process.argv[2]){
        robot.moveMouse(x-9, 25+9);  
        await delay(200);
        robot.mouseClick();
        return;  
    }
    robot.moveMouse(x, 10);
    robot.mouseClick();
    robot.moveMouse(x, 80);
    robot.mouseClick();
    robot.moveMouse(x+120+60, 150-20);
}
moveAndClick();
console.log('got:',process.argv[2])
// const ioHook = require('iohook');

// ioHook.on('keydown', (event) => {
//   console.log(event); // { type: 'mousemove', x: 700, y: 400 }
// });

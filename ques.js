canva screening interview

QUESTION 1

/**
 * Fetch data at the given URL. Returns a promise that resolves with the data.
 * Simulates random network latency up to 4 seconds.
 */
function fetch(url) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`dummy data for ${url}`), Math.random() * 4000);
    });
}


var pArr = [];
for(var i=1;i<=10;i++){
    pArr.push(fetch("/design/"+i));
}

Promise.all(pArr).then(function(res){
    console.log("Done");
})

——————————————————————————————————————————————————————————————————
QUESTION 2

/**
 * A dummy implementation of the design backend. Returns a promise which resolves with the
 * requested design.
 */
function fetchDesign(id) {
  return Promise.resolve({
    designId: id,
    shapes: [
      { shapeId: 'basic-square', color: { r: 255, g: 255, b: 255 }},
      { shapeId: 'basic-circle', color: { r: 255, g: 255, b: 255 }},
      { shapeId: 'basic-diamond', color: { r: 255, g: 0, b: 0 }},
      { shapeId: 'basic-rectangle', color: { r: 0, g: 255, b: 0 }}
    ]
  })
}

SAMPLE OUTPUT
Design 1: { r: 191.25 g: 191.25 b: 127.5 }
Design 2: { r: 191.25 g: 191.25 b: 127.5 }
...
...



var pArr = [];
for(var i=1;i<=10;i++){
    
    pArr.push(fetchDesign(i).then(function(res){
        var allShapes = res.shapes.map(function(shape){
            return shape.color;
        });
        return "Design "+ res.designId + " : " + JSON.stringify(findAvgColor(allShapes));
    }));
}

Promise.all(pArr).then(resultStrings => {
    resultStrings.forEach(r => console.log(r))
})

// Promise.all(pArr).then(function(res){
//     // [ { designId: 1, shapes: [] }  , , , ,,]
//     var map = {};
//         map[r.designId] = map[r.designId] || [];
//         map[r.designId] = map[r.designId].concat(r.shapes.map(function(shape){
//             return shape.color;
//         }));
//     for(var i in map){
//         map[i] = findAvgColor(map[i])
//         console.log("Design "+i + " :", map[i]);
//     }
//     return map;
// });

function findAvgColor(cObj){
    var r = 0, g = 0; b= 0;
    cObj.forEach(function(col){
        r += col.r;
        g += col.g;
        b += col.b;
    });
    var len = cObj.length;
    return {
        r : r/len,
        g : g/len,
        b : b/len
    }
}

——————————————————————————————————————————————————————————————————
QUESTION 3

/**
 * @param {string} id
 * @return {!Promise<!Design>}
 */
function fetchDesign(id) {
  return Promise.resolve({
    designId: id,
    shapes: [
      {shapeId: 'basic-shape', color: { r: 55, g: 40, b: 255 }, children: []},
      {shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
        {shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: []},
        {shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: []},
      ]},
      {shapeId: 'zigzag-polygon', color: { r: 205, g: 255, b: 252 }, children: []},
      {shapeId: 'fish', color: { r: 205, g: 255, b: 252 }, children: [
        {shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
          {shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: []},
          {shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: []},
          {shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: []},
        ]},
        {shapeId: 'fish-tail', color: { r: 255, g: 5, b: 255 }, children: []},
      ]},
      {shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
        {shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: []},
        {shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: []},
      ]},
    ]
  })
}

SAMPLE OUTPUT

Design 1: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 2: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 3: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 4: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 5: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 6: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 7: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 8: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 9: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
Design 10: { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }



var pArr = [];
for(var i=1;i<=10;i++){
    
    pArr.push(fetchDesign(i).then(function(res){
        return findAvgCol(res);
    }));
}

Promise.all(pArr).then(resultStrings => {
    resultStrings.forEach(r => console.log(r))
})

function findAvgCol(designObj){
//    var allColors = [];
//    designObj.shapes.forEach(function(shape){
//        allColors.push(shape.color);
//        allColors = allColors.concat(flattenColor(shape.children));
//    });
    var allColors = flattenColor(designObj.shapes)
    return "Design "+ designObj.designId + " : " + JSON.stringify(_findAvgColor(allColors));
}

function _findAvgColor(cObj){
    var r = 0, g = 0; b= 0;
    cObj.forEach(function(col){
        r += col.r;
        g += col.g;
        b += col.b;
    });
    var len = cObj.length;
    return {
        r : r/len,
        g : g/len,
        b : b/len
    }
}

//format children if colr
function flattenColor(obj){
    var res = [];
    obj.forEach(function(o){
        //handle recursive children
        if(o.children){
          res = res.concat(flattenColor(o.children));   
        }
        //handle color 
        res.push(o.color);
    });
    return res;
}
// console.log(flattenColor([
//         {shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: [
//             ]},
//         {shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
//           {shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: []},
//           {shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: []},
//           {shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: []}
//         ]}]) );

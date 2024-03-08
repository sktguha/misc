
/*
function which will take a number as input
length of the output

should return all possible magic number
*/

const map = {
    '0': 0,
    '1': 1,
    '2': null,
    '3': null,
    '4': null,
    '5': null,
    '6': 9,
    '7': null,
    '8': 8,
    '9': 6
}

// function solution(number) {
// //  124456
// //      W9
// // 0123456789 s
// const map = {
//     '0': 0,
//     '1': 1,
//     '2': null,
//     '3': null,
//     '4': null,
//     '5': null,
//     '6': 9,
//     '7': null,
//     '8': 8,
//     '9': 6
// }  
//     const len = number.length - 1;
//     for(let i =0;i<number.length;i++){
//         let ch = number.charAt(i);
//         let endCh = number.charAt(len-i);
//         console.log(ch, endCh, i)
//         if(endCh !== (map[ch]+'')){
//             return false;
//         }
//     }
//     return true;
// }

const set = [0,1,6,8,9];


function magicNos(len){
    // len 1: 0,1 8
    // len 2: 11
    if(len ===1){
        console.log("0,1,6,8,9");
        return;
    }
    // only handling even for now
    if(len%2===0){
        const lenArg = len/2;
        console.log(permute("",lenArg, false))
    } else {
        const lenArg = Math.floor(len/2);
        console.log(permute("",lenArg, true))
    }
}

// length is even , generate all permutations using 0,1,6,8,9 of length len/2
// for each of the permutations print its corresponding mirror digits from the map

// if length is odd, follow same steps as above with length-1
//  in the last mirror step add 1,8 and 0 in the middle of the permutations and print


function permute(str, len, isOdd){
    if(len===0){
        function helper(strArg, midChar){
            let strPrint = strArg;
            if(midChar){
                strPrint = strPrint + midChar;
            }
            for(let i=strArg.length-1;i>=0;i--){
                let ch = strArg.charAt(i);
                strPrint += map[ch];
            }
            console.log("end permute: ", strPrint);
            return;
        }
       
        if(isOdd){
             helper(str, '0');
             helper(str, '1')
             helper(str, '8')
            return;
        } else {
            helper(str)
        }
       
        return;
    }
    set.forEach((num)=>{
         permute(str+num, len-1, isOdd)  
    })
}

magicNos(7);
// magicNos(5);

// function placeNext(str, maxLen = 2){
//     // it will call the next digits placement
//     // assume str is called with single digits
//     // 181  16891
//     if(str.length === maxLen){
//         console.log("magic number:", str);
//         return;
//     }  
//     let startChar = str.charAt(0);
//     let endCh = map[startChar];
//     placeNext(str+endCh, maxLen);
// }

//const h=2019; const l=2012;  Array(h-l+1).fill().map((_,i)=>l+i);
function calc(init=3.2, yr=[], marker=[]){
    return yr.reduce((acc, inf, i)=>{ const res= acc + (Number(inf)/100)*acc; marker[i] && console.log('in '+marker[i]+' it is '+acc); return res;},init)
}
calc(42, [3.6, 3.43, 4.54, 2.19], [2017,2018,2019,2020]);
calc(8, [3.43,3.43,3.43,3.6, 3.43, 4.54, 2.19], [2014,2015,2016,2017,2018,2019,2020])
calc(12, [3.43,3.43,3.6, 3.43, 4.54, 2.19], [2015,2016,2017,2018,2019,2020])
//usage: calc accepts three arguments , intial salary, array of inflation per year, and third argument is the years(just for display purposes)

function revCalc(init,yr, marker=[]){ marker=marker.reverse(); return yr.reduce((acc, inf, i)=>{ const res= (acc/(1 + (inf/100))); marker[i] && console.log('in '+marker[i]+' it is '+acc); return res;},init) }
revCalc(42, [3.6, 3.43, 4.54, 2.19], [2017,2018,2019,2020]);
revCalc(42, [4.5,4.3,4.3,3.6, 3.43, 4.54, 2.19], [2014,2015,2016,2017,2018,2019,2020]);

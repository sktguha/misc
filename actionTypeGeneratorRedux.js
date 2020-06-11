function capitalize(word){
    return word[0].toUpperCase()+word.slice(1).toLowerCase();
}

var typeString = 'SHARE_SOME_THING';
var actionString = '' || typeString.split("_").map(wd => capitalize(wd.toLowerCase())).join("");
var typeFileName = 'sourceTypes';
function genActions() {
  const tmap = [typeString, `${typeString}_STARTED`, `${typeString}_SUCCESS`, `${typeString}_FAILURE`];
  const amap = [actionString, `${actionString}Started`, `${actionString}Success`, `${actionString}Failure`];
  copy(amap.map((act, i) => `export const ${act} = (data) => ({\n  type: ${typeFileName}.${tmap[i]},\n  data,\n})`).join("\n\n"));
}

function genTypes() {
  copy([typeString, `${typeString}_STARTED`, `${typeString}_SUCCESS`, `${typeString}_FAILURE`].map(str => `export const ${str} = '${str}';`).join('\n'));
}

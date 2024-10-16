const fs=require('fs');
function decodeValue(base,value){
    return parseInt(value,base);
}
function lagrangeInterpolation(points,k){
    let c=0;
    for(let i=0;i<k;i++) {
        let [xi,yi]=points[i];
        let li=1;
        for(let j=0;j<k;j++) {
            if(i!==j){
                let[xj]=points[j];
                li*=(0-xj)/(xi-xj);
            }
        }
        c+=li*yi;
    }
    return c;
}
function findSecretFromTestCase(filePath){
    const data=JSON.parse(fs.readFileSync(filePath));
    const k=data.keys.k;
    let points=[];
    for(let key in data){
        if(key!=="keys"){
            const base=parseInt(data[key].base);
            const value=data[key].value;
            const x=parseInt(key);
            const y=decodeValue(base, value);
            points.push([x, y]);
        }
    }
    points=points.slice(0,k);
    return lagrangeInterpolation(points,k);
}
const secret1=findSecretFromTestCase('testcase1.json');
const secret2=findSecretFromTestCase('testcase2.json');
console.log("Secret for Testcase 1:",secret1);
console.log("Secret for Testcase 2:",secret2);
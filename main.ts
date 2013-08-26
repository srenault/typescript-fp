import ts = require("collections");

var List = ts.collections.immutable.List

var l1 = List(1, 2, 3);
var l2 = List(4, 5, 6)
var l3 = l1.append(l2);

console.log("head " + l3.head());

var l4 = l3.map((t) => {
    return t * 2
});

l4.foreach((t) => {
    console.log(t);
});

console.log(l3, l3.length());
console.log(l4.asArray());
console.log(l4.mkString(", "));
console.log(List(1, 2).mkString(", "));
import Immutable = require("lib/package");
var List = Immutable.List;
var Option = Immutable.Option;

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

l4.mkString(", ");
List(1, 2).mkString(", ");

Option(null).isDefined();
Option(null).getOrElse(() => {
    return true;
});

Option(3).map((n) => {
    return n * 3;
});

Option(3).flatMap((n) => {
    return Option(4).map((n1) => {
        return n * n1;
    });
});

console.log("asArray", List(1,2,3,4).asArray());

console.log("reverse", List(1,2,3,4).reverse().mkString(", "));

console.log("headOption", List().headOption());

console.log("lastOption", List().lastOption());

console.log("headOption", List(1).headOption());

console.log("append", List(1,2,3,4).append(List(5,6,7,8)).mkString(", "));

console.log("prepend", List(5,6,7,8).prepend(List(1,2,3,4)).mkString(", "));

console.log("prependOne", List(5,6,7,8).prependOne(4).mkString(", "));

console.log("appendOne", List(1,2,3).appendOne(4).mkString(", "));

console.log("zip")
List(1,2,3).zip(List(1,2,3)).foreach((t) => console.log(t.toString()))

console.log("zipWithIndex")
List(1,2,3).zipWithIndex().foreach((t) => console.log(t.toString()))

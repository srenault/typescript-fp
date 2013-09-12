import _option = require('./Option');
import _tuple = require('./Tuple');

export interface IList<T> {
    head(): T;

    last(): T;

    headOption(): _option.IOption<T>;

    lastOption(): _option.IOption<T>;

    tail(): IList<T>;

    isEmpty(): boolean;

    length(): number;

    foldLeft<U>(z: U, f: (acc: U, t: T) => U): U;

    foldRight<U>(z: U, f: (t: T, acc: U) => U): U;

    reduceRight<U>(f: (t: T, acc: U) => U): U;

    reduceLeft<U>(f: (acc: U, t: T) => U): U;

    appendOne(t: T): IList<T>;

    append(l: IList<T>): IList<T>;

    prependOne(t: T): IList<T>;

    prepend(l: IList<T>): IList<T>;

    map<U>(f: (t: T) => U): IList<U>;

    flatMap<U>(f: (t: T) => IList<U>): IList<U>;

    filter(f: (t: T) => boolean): IList<T>;

    find(f: (t: T) => boolean): _option.IOption<T>;

    filterNot(f: (t: T) => boolean): IList<T>;

    foreach(f: (t: T) => void): void;

    reverse(): IList<T>;

    asArray(): T[];

    mkString(sep: string): string;

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>>;

    zipWithIndex(): IList<_tuple.Tuple2<T,number>>;

    init(): IList<T>;

    take(n: number): IList<T>;

    takeWhile(f: (t: T) => boolean): IList<T>;

    get(n: number): T;

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>>;

    count(f: (t: T) => boolean): number

    contains(t: T): boolean

    exists(f: (t: T) => boolean): boolean

    distinct(): IList<T>

    drop(n: number): IList<T>

    dropWhile(f: (t: T) => boolean): IList<T>
}

export function List<T>(...as: T[]): IList<T> {
    if(as.length == 0) {
        return new Nil<T>();
    } else {
        var tail = as.splice(1, as.length);
        return new Cons<T>(as[0], List.apply(null, tail));
    }
}

export class Nil<T> implements IList<T> {
    constructor() {
    }

    head(): T {
        throw new Error("head of empty list");
    }

    last(): T {
        throw new Error("last of empty list");
    }

    headOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    lastOption(): _option.IOption<T> {
        return new _option.None<T>();
    }

    tail(): IList<T> {
        throw new Error("tail of empty list");
    }

    isEmpty(): boolean {
        return true;
    }

    length(): number {
        return 0;
    }

    foldLeft<U> (z: U, f: (acc: U, t: T) => U): U {
        return z;
    }

    foldRight<U> (z: U, f: (t: T, acc: U) => U): U {
        return z;
    }

    reduceRight<U> (f: (t: T, acc: U) => U): U {
        throw new Error("reduceRight of empty list");
    }

    reduceLeft<U> (f: (t: T, acc: U) => U): U {
        throw new Error("reduceLeft of empty list");
    }

    appendOne(t: T): IList<T> {
        return List(t);
    }

    append(l: IList<T>): IList<T> {
        return l;
    }

    prependOne(t: T): IList<T> {
        return List(t);
    }

    prepend(l: IList<T>): IList<T> {
        return l;
    }

    map<U>(f: (t: T) => U): IList<U> {
        return new Nil<U>();
    }

    flatMap<U>(f: (t: T) => IList<U>): IList<U> {
        return new Nil<U>();
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this;
    }

    find(f: (t: T) => boolean): _option.IOption<T> {
        return new _option.None<T>();
    }

    filterNot(f: (t: T) => boolean): IList<T> {
        return this;
    }

    foreach(f: (t: T) => void): void {
    }

    reverse(): IList<T> {
        return this;
    }

    asArray(): T[] {
        return [];
    }

    mkString(sep: string): string {
        return "";
    }

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>> {
        return new Nil<_tuple.Tuple2<T,U>>();
    }

    zipWithIndex(): IList<_tuple.Tuple2<T,number>> {
        return new Nil<_tuple.Tuple2<T,number>>();
    }

    init(): IList<T> {
        throw new Error("init of empty list");
    }

    take(n: number): IList<T> {
        throw new Error("take of empty list");
    }

    takeWhile(f: (t: T) => boolean): IList<T> {
        return this;
    }

    drop(n: number): IList<T> {
        throw new Error("drop of empty list");
    }

    dropWhile(f: (t: T) => boolean): IList<T> {
        return this;
    }

    get(n: number): T {
        throw new Error("get of empty list");
    }

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>> {
        throw new Error("split of empty list");
    }

    count(f: (t) => boolean): number {
        return 0;
    }

    contains(t: T): boolean {
        return false;
    }

    exists(f: (t: T) => boolean): boolean {
        return false;
    }

    distinct(): IList<T> {
        return new Nil<T>();
    }
}

class Cons<T> implements IList<T> {
    constructor (private hd: T, private tl: IList<T>) {
    }

    head(): T {
        return this.hd;
    }

    last(): T {
        return this.reverse().head();
    }

    headOption(): _option.IOption<T> {
        return _option.Option(this.hd);
    }

    lastOption(): _option.IOption<T> {
        return _option.Option(this.last());
    }

    tail(): IList<T> {
        return this.tl;
    }

    isEmpty(): boolean {
        return false;
    }

    length(): number {
        return 1 + this.tl.length();
    }

    foldRight<U>(z: U, f: (t: T, acc: U) => U): U {
        return foldRight1(this, z, f)
    }

    foldLeft<U>(z: U, f: (acc: U, t: T) => U): U {
        return foldLeft1(this, z, f)
    }

    reduceRight<U> (f: (t: T, acc: U) => U): U {
        var z = <U><any>this.head();
        return this.tail().foldRight(z, f);
    }

    reduceLeft<U> (f: (acc: U, t: T) => U): U {
        var z = <U><any>this.head();
        return this.tail().foldLeft(z, f);
    }

    appendOne(t: T): IList<T> {
        return append1(this, List(t));
    }

    append(l: IList<T>): IList<T> {
        return append1(this, l);
    }

    prependOne(t: T): IList<T> {
        return prepend1(this, List(t));
    }

    prepend(l: IList<T>): IList<T> {
        return prepend1(this, l);
    }

    map<U>(f: (t: T) => U): IList<U> {
        return this.foldRight(new Nil<U>(), (t, acc) => {
            return new Cons<U>(f(t), acc);
        });
    }

    flatMap<U>(f: (t: T) => IList<U>): IList<U> {
        return concat1<U>(this.map<IList<U>>(f));
    }

    filter(f: (t: T) => boolean): IList<T> {
        return this.foldRight<IList<T>>(new Nil<T>(), (t, acc) => {
            if(f(t)) {
                return acc;
            } else {
                return new Cons<T>(t, acc);
            }
        });
    }

    find(f: (t: T) => boolean): _option.IOption<T> {
        var z = new _option.None<T>();
        return this.foldLeft<_option.IOption<T>>(z, (acc, t) => {
            if(f(t)) {
                return new _option.Some<T>(t);
            } else {
                return acc;
            }
        });
    }

    filterNot(f:(t: T) => boolean): IList<T> {
        return this.filter((t) => {
            return !f(t);
        });
    }

    foreach(f: (t: T) => void): void {
        this.foldLeft(new Nil<T>(), (acc, t) => {
            f(t);
            return acc;
        });
    }

    reverse(): IList<T> {
        return reverse1(this);
    }

    asArray(): T[] {
        return this.foldLeft<T[]>([], (acc, t) => {
            acc.push(t);
            return acc;
        });
    }

    mkString(sep: string): string {
        return this.foldLeft<string>("", (acc, t) => {
            if(acc == "") return t;
            else return acc + sep + t;
        });
    }

    zip<U>(l: IList<U>): IList<_tuple.Tuple2<T,U>> {
        var step = (l1: IList<T>, l2: IList<U>, acc: IList<_tuple.Tuple2<T,U>>) => {
            return l1.headOption().flatMap((t) => {
                return l2.headOption().map((u) => {
                    var res = new Cons<_tuple.Tuple2<T,U>>(new _tuple.Tuple2(t, u), acc)
                    return step(l1.tail(), l2.tail(), res)
                });
            }).getOrElse(() => {
                return acc.reverse();
            });
        }
        return step(this, l, new Nil<_tuple.Tuple2>());
    }

    zipWithIndex(): IList<_tuple.Tuple2<T,number>> {
        var indexes = List(0);
        for(var i=1; i<this.length(); i++) {
            indexes = indexes.appendOne(i)
        }
        return this.zip<number>(indexes);
    }

    init(): IList<T> {
        return this.take(this.length() - 1)
    }

    take(n: number): IList<T> {
        return this.zipWithIndex().foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(t._2 >= n) {
                return acc;
            }
            return new Cons<T>(t._1, acc);
        }).reverse();
    }

    takeWhile(f: (t: T) => boolean): IList<T> {
        return this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(f(t)) {
                return new Cons<T>(t, acc);
            } else {
                return acc;
            }
        }).reverse();
    }

    drop(n: number): IList<T> {
        return this.zipWithIndex().foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(t._2 == n) {
                return acc;
            }
            return new Cons<T>(t._1, acc);
        }).reverse();
    }

    dropWhile(f: (t: T) => boolean): IList<T> {
        return this.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
            if(f(t)) {
                return acc;
            }
            return new Cons<T>(t, acc);
        }).reverse();
    }

    get(n: number): T {
        var r;
        if(n > 0) {
            r = this.zipWithIndex().reduceRight((t, acc) => {
                if(t._2 == n) {
                    return t._1;
                } else {
                    return null;
                }
            });
            if(r) return r;
        }
        throw new Error("Index out of bounds");
    }

    splitAt(n: number): _tuple.Tuple2<IList<T>, IList<T>> {
        if(n > 0) {
            var z = new _tuple.Tuple2(new Nil<T>(), new Nil<T>());
            return this.zipWithIndex().foldLeft(z, (acc, t) => {
                if(t._2 < n) {
                    var left = acc._1.appendOne(t._1);
                    return new _tuple.Tuple2(left, acc._2);
                } else {
                    var right = acc._2.appendOne(t._1);
                    return new _tuple.Tuple2(acc._1, right);
                }
            });
        } else {
            throw new Error("Index out of bounds");
        }
    }

    count(f: (t) => boolean): number {
        return this.foldLeft(0, (acc, t) => {
            if(f(t)) {
                return acc;
            } else {
                return acc + 1;
            }
        });
    }

    contains(t: T): boolean {
        return this.find((t1) => {
            return t == t1;
        }).isDefined();
    }

    exists(f: (t: T) => boolean): boolean {
        return this.find(f).isDefined();
    }

    distinct(): IList<T> {
        return this.foldLeft(new Nil<T>(), (acc, t) => {
            if(acc.contains(t)) {
                return acc;
            } else {
                return acc.appendOne(t);
            }
        });
    }
}

function append1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
    return foldRight1(l1, l2, (t, acc) => {
        return new Cons<T>(t, acc)
    });
}

function prepend1<T>(l1: IList<T>, l2: IList<T>): IList<T> {
    return append1(l2, l1);
}

function foldLeft1<T, U>(l: IList<T>, z: U, f: (acc: U, t: T) => U): U {
    if(l.isEmpty()) {
        return z;
    } else {
        return foldLeft1<T, U>(l.tail(), f(z, l.head()), f);
    }
}

function foldRight1<T, U>(l: IList<T>, z: U, f: (t: T, acc: U) => U): U {
    return l.reverse().foldLeft<U>(z, (acc, t) => {
        return f(t, acc);
    });
}

function concat1<T>(l: IList<IList<T>>): IList<T> {
    return l.foldRight(new Nil<T>(), (t, acc) => {
        return t.append(acc);
    });
}

function reverse1<T>(l: IList<T>): IList<T> {
    return l.foldLeft<IList<T>>(new Nil<T>(), (acc, t) => {
        return new Cons<T>(t, acc);
    });
}

// function occurences1<T>(l: IList<T>): {} {
//     //Typescript.Collections.HashTable;
//     var keysValues = {};
//     l.foreach((t) => {
//         keysValues[t] = keysValues[t] ? keysValues[t] + 1 : 1;
//     });
//     return keysValues;
// }
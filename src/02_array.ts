// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Array functions

/**
 * ### chunk
 * chunk creates an array of elements split into groups the length of size. If
 * array can't be split evenly, the final chunk will be the remaining elements.
 * Two-dimensional arrays can be expressed using the T[][].
 *
 *  ## Examples
 *  _.chunk(["a", "b", "c", "d"], 2) => [["a", "b"], ["c", "d"]]
 *  _.chunk(["a", "b", "c", "d"], 3) => [["a", "b", "c"], ["d"]]
 *  _.chunk(["a", "b", "c"]) => [["a"], ["b"], ["c"]]
 * */
export function chunk<T>(array: T[], chunkSize: number = 1): T[][] {
    return array.reduce(
        (acc: T[][], elem: T, index: number) => {
            let currentChunkIndex = Math.floor(index / chunkSize);
            let chunk = acc[currentChunkIndex] || [];
            chunk.push(elem);
            acc[currentChunkIndex] = chunk;
            return acc;
        },
        []
    );
}

/**
 * ### compact
 * compact accepts an array as an argument and returns an array.
 * The returned array does not contain falsey values (such as 0, null,
 * undefined, NaN).
 *
 * ## Examples
 * _.compact([1, undefined, 2, undefined, 3]) => [1, 2, 3]
 * _.compact([1, NaN, 2, NaN, 3]) => [1, 2, 3]
 * _.compact([1, null, 2, null, 3]) => [1, 2, 3]
 * _.compact([1, 0, 2, 0, 3]) => [1, 2, 3]
 * _.compact([1, undefined, NaN, null, 0, 2, 3]) => [1, 2, 3]
 */
export function compact<T>(array: T[]): T[] {
    return array.filter((value: T) => value);
}

/**
 * ### head
 * head takes in an array and returns its first item.
 *
 *  ## Examples
 *  _.head([1, 2, 3]) => 1
 *  _.head([]) => undefined
 */
export function head<T>(array: T[]): T {
    return array[0];
}

export function tail<T>(array: T[]): T[] {
    return array.slice(1);
}

/**
 * ### initial
 * initial returns a slice of the passed in array, excluding its last item.
 *
 * ## Examples
 *  _.initial<number>([1, 2, 3]) => [1, 2]
 *
 */
export function initial<T>(array: T[]): T[] {
    return array.slice(0, array.length - 1)
}

/**
 * ### last
 * last takes in an array and returns its last item.
 *
 * ## Examples
 * _.last([1, 2, 3]) => 3
 * _.last([]) => undefined
 *
 */
export function last<T>(array: T[]): T {
    return array[array.length - 1];
}

/**
 * ### drop
 * drop takes in two arguments, an array and a count, and returns an array that
 * has count items removed from the beginning.
 * The count should be optional and default to 1.
 *
 * ## Examples
 * _.drop([1, 2, 3, 4], 2) => [3, 4]
 * _.drop([1, 2, 3, 4]) => [2, 3, 4]
 */
export function drop<T>(array: T[], elementsToDrop: number = 1): T[] {
    if (elementsToDrop == 0) {
        return array;
    }
    return drop(tail(array), elementsToDrop - 1);
}

/**
 * ### dropRight
 * dropRight works like drop, except that it removes items from the end of the
 * passed in array.
 *
 * ## Examples
 * _.dropRight([1, 2, 3, 4], 2) => [1, 2]
 * _.dropRight([1, 2, 3, 4]) => [1, 2, 3]
 *
 */
export function dropRight<T>(array: T[], elementsToDrop: number = 1): T[] {
    if (elementsToDrop == 0) {
        return array;
    }
    return dropRight(initial(array), elementsToDrop - 1);
}

interface DropWhilePredicate<T> {
    (value?: T, index?: number, collection?: Array<T>): boolean;
}

/**
 * ### dropWhile
 * dropWhile works similar to drop. It removes items from the beginning of the
 * array until the predicate returns false.
 *
 * ## Examples
 * _.dropWhile([1, 2, 3, 4, 5, 1], value => value < 3) => [3, 4, 5, 1]
 *
 */
export function dropWhile<T>(array: Array<T>, predicate: DropWhilePredicate<T>): Array<T> {
    if (predicate(head(array))) {
        return dropWhile(array.slice(1), predicate);
    }
    return array;
}

/**
 * ### dropRightWhile
 * dropRightWhile works similar to dropWhile, except that it iterates over the
 * passed in array in reversed order.
 *
 * ## Examples
 * _.dropRightWhile([5, 4, 3, 2, 1], value => value < 3) => [5, 4, 3]
 *
 */
export function dropRightWhile<T>(array: T[], predicate: DropWhilePredicate<T>): T[] {
    if (predicate(last(array))) {
        return dropRightWhile(initial(array), predicate);
    }
    return array;
}

/**
 * ### fill
 * fill mutates the passed in array. It fills collection[start] up to
 * collection[end] with a specified value.
 *
 * ## Examples
 * _.fill<any>([4, 6, 8, 10], "* ", 1, 3) => [4, "* ", "* ", 10]
 */
export function fill<T>(array: any[], fillValue: T, start: number, end: number): any[] {
    return array.map((value: any, index: number) => {
        return index >= start && index < end ? fillValue : value;
    });
}

// Here we define an interface for the predicate used in the findIndex function.
export interface FindIndexPredicate<T> {
    (value: T): boolean;
}

/**
 * ### findIndex
 * findIndex accepts three arguments:
 * 1. The array to be traversed.
 * 2. An iteratee function.
 * 3. The index from where we should start traversing the array.
 *
 * ## Examples
 * _.findIndex([4, 6, 8, 10], () => false) => -1
 * _.findIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findIndex([4, 6, 6, 8, 10], value => value === 6, 2) => 2
 *
 */
export function findIndex<T>(array: T[], predicate: FindIndexPredicate<T>, start: number = 0): number {
    function loop<T>(index: number): number {
        if (index == array.length){
            return -1;
        }
        if (predicate(array[index])){
            return index;
        }
        return loop(index + 1);
    }
    return loop(start);
}

/**
 * ### findLastIndex
 * findLastIndex works line findIndex, but traverses the collection backwards.
 * The third argument is the index from where we start traversing the array.
 *
 * ## Examples
 * _.findLastIndex([4, 6, 8, 10], () => false) => -1
 * _.findLastIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findLastIndex([4, 6, 8, 6, 10], value => value === 6) => 3
 * _.findLastIndex([4, 6, 6, 8, 10], value => value === 6, 1) => 1
 *
 */
export function findLastIndex<T>(array: T[], predicate: FindIndexPredicate<T>, start: number = array.length -1): number {
    function loop<T>(index: number): number {
        if (index == 0){
            return -1;
        }
        if (predicate(array[index])){
            return index;
        }
        return loop(index - 1);
    }
    return loop(start);
}

/**
 * ### nth
 * Given an array, should return the nth item of the passed in array.
 *
 * ## Examples
 * _.nth<number>([1, 2, 3], 0) => 1
 * _.nth<number>([1, 2, 3], 1) => 2
 * _.nth<number>([1, 2, 3], 2) => 3
 * _.nth<number>([1, 2, 3]) => 1
 *
 */
export function nth<T>(array: T[], index: number = 0): T {
    return array[index];
}

/**
 * ### zip
 *
 * ## Examples
 * // We can also use something called "union types" here.
 * _.zip<string | number | boolean>(["a", "b"], [1, 2], [true, false]) => [["a", 1, true], ["b", 2, false]]
 */
export function zip<T>(first: any[], second: any[], third: any[]): T[][] {
    return first.map((val, index) => [val, second[index], third[index]]);
}

# iOS - 3b Arrays and Loops

Source document: `iOS - 3b Arrays and Loops.pdf`

## Page 1

Arrays and Loops

## Page 2

Data Structures
A data structure is a specialized type of data type that allows us to store,
retrieve, and organize data with multiple values.
So far we have looked at basic data types in swift. For all intents and
purposes these store a single value, like “5” (Strings are an exception)
The most fundamental data structure in programming is the Array. In
swift you can think of an array as a sequential list of values. Each item in
the array has an index that marks what place the item is in.

## Page 3

Arrays
Here is an example of an array defined as a list of names. This is a
string array. It is of length 3. Alice is element 0.
var names = ["Alice", "Bob", "Charlie"]
We can reference any element like this:
print(names[0]) //returns Alice
We can update any element like this:
names[1] = Rob //updates Bob to Rob

## Page 4

Initializing Arrays
//Initializing with values
var names = ["Alice", "Bob", "Charlie"]
//Explicitly typed empty array
var intAry: [Int] = []
//Initializing with a repeating value
var highScores = Array(repeating: 0, count: 10)

## Page 5

Arrays
Arrays can be joined with + kind of like strings
let firstHalf = ["John", "Paul"]
let secondHalf = ["George", "Ringo"]
let beatles = firstHalf + secondHalf
print(beatles)
Count is used to return the size of an array
print(beatles.count)

## Page 6

Arrays
var pets = ["Pig", "Chicken", "Rat"]
pets.append("Dog") //add Dog to the end
pets.remove(at: 0) //Remove element 0, 1 becomes the new 0
pets.insert("Cat", at: 1) //insert a new element at slot 1
pets.reverse()
pets.sort() // numerically or alphabetically depending on type
if let intdex = pets.firstIndex(of: "Rat"){
print(intdex)
}

## Page 7

For Loops
Some review from last week… We use loops when we need to repeat a
task. A basic loop in swift is called a for loop or for-in loop. This simple
example uses a range.
for number in 1..<5 {
print("Number is \(number)")
}

## Page 8

Arrays & Loops
Here is where things get cool. Arrays and loops go together like chocolate and
peanut butter.
//This method returns the index
for i in (0 ..< pets.count) {
print ("\(i) = " + pets[i])
}
//This method returns the element itself
for i in pets{
print (i)
}

## Page 9

ForEach Loops
Besides While Loops and For-In Loops. There is also the ForEach loop.
ForEach loops are another way to go through every element in a data structure.
let person = ["John", "47", "New York"]
person.forEach { value in
print("\(value)")
}

## Page 10

Dictionaries
Dictionaries are another, slightly more advanced data structure. Unlike arrays
there is no index or order. Instead they use Key / Value pairs. Rather than
referencing a value by index, it is referred by key.
var person = ["name": "John", "age": "45", "city": "New York"]
person ["city"] = "LA";
person ["age"] = "48";
You can see in the dictionary definition, we include the key and the value
separated with a ‘:’.

## Page 11

Loops and Dictionaries
Here are two ways to iterate through each element in a dictionary
// for-in loop
for i in person{
print("\(i.key): \(i.value)")
}
// forEach loop
person.forEach { key, value in
print("\(key): \(value)")
}

## Page 12

SwiftUI ForEach
In swiftUI there is a special type of ForEach loop that creates view elements. It requires
an id parameter so that allows it to distinguish one view element from the next. For basic
data structures like Arrays we can set that id to \.self. Think of it like saying treat each of
these items to display as unique and the unique id is itself.
let pets = ["Chicken", "Rock", "Rat"]
var body: some View {
VStack {
ForEach(pets, id: \.self) { pet in
Text(pet)
}
}
}

## Page 13

Dynamically Generated Nav
Let’s apply what we learned so far and use ForEach to create some
SwiftUI navigation using a ForEach loop.
One such application is to create a dynamic list based navigation.
Another implementation could be for dynamic page based navigation.
Let’s look at some code…

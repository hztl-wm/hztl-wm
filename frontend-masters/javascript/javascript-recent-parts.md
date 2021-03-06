---
title: "JavaScript: The Recent Parts"
description: These are notes from the 'JavaScript':' The Recent Parts' course on Frontend Masters.
permalink: /frontend-masters/javascript-recent-parts

layout: default
pagenav:
  - name: Introduction
    href: introduction
  - name: Strings
    href: strings
  - name: Array Destructuring
    href: array-destructuring
  - name: Object Destructuring
    href: object-destructuring
  - name: Further Destructuring
    href: further-destructuring
  - name: Array Methods
    href: array-methods
  - name: Iterators & Generators
    href: iterators--generators
  - name: Regular Expressions
    href: regular-expressions
  - name: Async Await
    href: async-await
  - name: Wrap-Up
    href: wrap-up
---

[Link to the workshop exercise files](https://static.frontendmasters.com/resources/2019-03-09-js-recent-parts/js-recent-parts.zip)

## Introduction

### JavaScript New Feature Process

JavaScript fatigue? The language changes so fast it seems like every few months, theres some new blog post about some new feature. How can I possibly keep up?! Don't be afraid of the changes! It is important to remember that from 1999 to 2009 there were essentially no changes made to JavaScript. There was a period of stagnation in various areas of the web, which actually brought about new browsers. But in 2009, unity was found amongst the authors of the JavaScript spec, at which point the landscape had changed dramatically. ES5 signaled that everyone was going to get back on track and work together. But then... 2010, 2011, 2012, 2013... Nothing about JavaScript changed. Until ES6 / ES2015. 6 more years passed before any update was made to JavaScript.

And when ES6 did land, there were over 300 new features which definitely led to some blowback within the [JavaScript] community. This brought about the question of, 'how can we not stagnate and also not just show up with a massive load of changes to dump on the community?'. So it was decided that the best thing for the JavaScript language was to move forward little by little. Now, on an annual basis, updates are pushed to the language. This decision is reflected in the updated naming of the releases; ES2016, ES2017, ES2018, ES2019...

There are four stages to releasing a new feature in JavaScript. Stage 4 means that it is done, finished, and shipped. Now, in the current state of JavaScript releases and workflow, there are annual updates to the language.  Some are small, others are large, but overall, the updates are more manageable for the end users. Nonetheless, the fatigue felt amongst the community is understandable, but the annual updates to the language are necessary or else the language will get surpassed by something else.

### Declarative JavaScript

There are some important narratives happening with the evolution of JavaScript, the most important (in the instructors opinion) of those being a more declarative language. Declarative as in, declarative vs. imperative. Declarative meaning we declare the outcome, the what, and we allow the abstractions of the language to handle the how, so that the reader is more focused on the what, the outcome, and even more importantly, the why. This makes code able to communicate better. Generally speaking, more declarative code communicates better.

An example would be using the `spread operator` over `.apply` or `.slice`. The outcome is the same, but you can do it in a much cleaner and more communicative way. You'll see throughout this course that some examples are imperative or declarative, but the overarching theme will be that the updates coming to the language are being implemented in such a way that it is as clear, concise, and communicable a way as possible.

### Browser Support & Transpilers

Browser support should not be overlooked. There are still developers today who are not using things that landed, in JavaScript, in 2009! The reason being that they may have to support a legacy browser which does not support modern syntax, so they 'take comfort' in not *having* to learn the new things. But you can learn the things! Transpilers to the rescue! Babel is probably the most known transpiler which allows you to write [JavaScript] in the most current syntax, which Babel can then compile to a syntax that is supported by older browsers.

There will likely always be a gap between what you need to support and what are the most current features of the language. It is important to stay on top of the most current features! You don't have to learn and master every new feature the day it comes out, but you should be aware of them and keep your 'finger' on the 'pulse' of the language. Yes, the transpilers can be intimidating, but they are what help us to stay on top of the language updates. Don't allow the intimidation to keep you from learning about all the things. Welcome the transpiling overlords and write the new things!

### Course Overview

We are not going to cover the 300+ updates that came out of ES6, but we will look a subset of features from:

* ES6 / ES2015
* ES2016
* ES2017
* ES2018
* ES2019

Your beloved instructor believes that the things contained within this workshop are the things that you should focus on first. And those features are:

* Template Strings
* String padding / trimming
* Destructuring - by far the most complex and lengthy portion of this workshop, but totally worth it
* Array find() / includes()
* Array flat() / flatMap()
* Iterators, Generators
* RegExp Improvements
* async .. await
* async* .. yield await

The last three items in this course point to the maturation of the language in respect to asynchronous programming, which is a big thing that has been quite far behind in JavaScript for quite a long time. We'll find some exercises along the way to play with these features to develop a deeper understanding of them. This workshop will not make you an expert on any of these features, it will be up to you to go back to your codebase and try to implement these features in your code! 

## Strings

### Template Strings

Template Strings, aka Interpolated Literals, aka "Interpoliterals" (yeah right). Initially, Kyle do not like them, but over time, he do like them, interpoliterals may be one of the most important and useful features released in ES6! Ah, so Interpolated Literals is Kyle's mental model for Template Strings, because a template implies that you can reuse or re-render something over and over again, which is what Template Strings are not... Stick with calling them Template Strings so that people understand what you are talking about, but if you want to sound smart about them, use one of the above terms which no one will understand.

Anywho... what problem are template strings trying to solve? Consider this primitive looking code:

{% highlight javascript %}

var name = "Your Name";
var email = "youremail@domainaddress.com";
var title = "Your Title";

var msg = "Welcome to the things! Your " + title + " is " + name + ", contact: " + email + ".";

// Welcome to the things! Your Your Title is Your Name, contact: youremail@domainaddress.com.

{% endhighlight %}

Awful 🤦🏻‍♂️, but concatenation, am I right? Ok... so string concatenation with data is actually called interpolation, Kyle's terminology is starting to look less crazy CS guy-ish. The above code is fine, it will work as intended, but as an imperative approach to implementing a string interpolated with data, it can be cumbersome to wrap your head around what the final output would be, well at least harder than using a Template String. Here's that same code, but implemented with a template sting:

{% highlight javascript %}

var name = "Your Name";
var email = "youremail@domainaddress.com";
var title = "Your Title";

var msg = `Welcome to the things! Your ${title} is ${name}, contact: ${email}.`;

// Welcome to the things! Your Your Title is Your Name, contact: youremail@domainaddress.com.

{% endhighlight %}

Way more better! Inside of the `${...}` can be an entire JavaScript program if you like, but it will often just be a variable. Kyle thinks the best mental model for thinking about template strings is to consider them like an IIFE, an immediately invoked function expression, i.e. you describe what string you want and JavaScript immediately goes and constructs and builds that string and drops it in (to your program).

The result of a template string is an [actual] primitive string! Side note: Kyle is frustrated with JavaScript's implementation of template strings because he wrote his You Don't Know JS book series in Markdown and in Markdown if you want to highlight code, it is hard to show a template string because backticks is how Markdown delimits a code block.

Template strings will allow you to enter a return / line break without a special character! 

### Tagged Templates

Template strings have a feature that allows you to more fully control their pre-processing, with something called a tagged literal. Here is an example of that in action:

{% highlight javascript %}

var amount = 12.3;

var msg = 
    formatCurrency
`The total for your
order is ${amount}`;

// The total for your
// order is $12.30

{% endhighlight %}

`formatCurrency` is actually a function call, called a tagged template literal. The `formatCurrency` function looks like this:

{% highlight javascript %}

function formatCurrency(strings, ...values) {
    var str = "";
    for (let i = 0; i < strings.length; i++) {
        if (i > 0) {
            if(typeof values[i-1] == "number") {
                str += `$${values[i-1].toFixed(2)}`;
            }
            else {
                str += values[i-1];
            }
        }
        str += strings[i]
    }
    return str;
}

{% endhighlight %}

The above is a function that Kyle wrote for this workshop. `strings` will provide an array of all the individual strings in and then all the values that you've interpolated in another array. So then you will have 2 separate arrays and it is up to you to decide how you put them together. JavaScript will always provide an additional position in the strings array to guarantee that when you interpolate your two arrays together that there is no conflict, that they interpolate as expected. Some other use-cases for a tag function could  be; internationalization, preventing cross-site scripting, and escaping of characters. You don't even necessarily have to write these functions because there are tons of them available already written.

[Here's an example of some tag functions that I found on GitHub](https://github.com/zspecza/common-tags)

### Applying Tagged Templates

Kyle has written his own tag function for objects and error logging. Instead of `console.log` writing `[object, object]`, Kyle's tag function will stringify the object and print it to the console, he's also written in a way to log his errors so that he can see the stack trace 🔥. A tag function doesn't have to return a string. Another useful tag function is one for RegEx which allows you to have a multi-line regular expression with comments. The RegEx tag function will parse the template string and return an actual regular expression, not a string. It's almost as if you can write an entire language inside of a template literal and have a tag function interpret it. Actually, you can do exactly that. There are tag functions for JSX which allows you to write JSX and include whatever variables you want and the return or output is actual DOM elements, just like JSX, but in JavaScript!

### Tagged Template Exercise

In this exercise we are going to be building out own tagged function called `upper`, the purpose of which is to uppercase the values. The goal is to write `upper` and get the `console.log` statement to print `true`. 

{% highlight javascript %}

function upper(strings,...values) {}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	`Hello ____ (@____), welcome to ____!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);

{% endhighlight %}

### Tagged Template Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}  
{% highlight javascript %}

function upper(strings,...values) {
    var str = "";
    for (let i = 0; i < strings.length; i++) {
        if (i > 0) {
                str += String(values[i-1]).toUpperCase();
            }
        str += strings[i];
        }
    return str;
}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper `Hello ${name} (@${twitter}), welcome to ${topic}!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);

{% endhighlight %}
{% endcapture %}{% include details.html %} 

### Padding & Trimming

Kyle says that it's almost a rite of passage for developers learning JavaScript to have to learn how to write some sort of small function to add or remove characters from strings. No more! The string prototype has padding and trimming built into it. Padding was released with ES2017 and trimming with ES2019. But when thinking about padding or trimming, from which side of the string are we performing the action? From left to right or from right to left? To think in terms of left or right is inappropriate for internationalization purposes (think languages that read right to left). So what did we end up with then?

`padStart` - takes 2 arguments, the first is required, the second is optional. The first argument tells it to what length you would like to 'pad to'. Here's a few examples showing how `padStart` works:

{% highlight javascript %}

var str = "Hello";

str.padStart(5);
// "Hello"

str.padStart(8);
// "   Hello"

str.padStart(8, "*");
// "***Hello"

str.padStart(8, "12345");
// "123Hello"

str.padStart(8, "ab");
// "abaHello"

{% endhighlight %}

As you can see from the above examples, if your string is already 5 characters long and you supply 5 as the argument to `padStart`, nothing happens. If you supply 8, `padStart` adds 3 spaces. If you supply '*' as the second argument to `padStart`, 3 asterisks will be 'padded' to the string. In the last two examples, you can see what happens when you supply multiple characters as the second argument, where either the list of characters is not entirely used or starts to get repeated if needed. Similar to `padStart` is `padEnd`. I'm not going to show you the example here because it is literally the same as `padStart`, but instead of padding the start of the string, `padEnd` pads the end of the string according to the supplied arguments. BTW, padding methods do detect whether the language is LTR or RTL, but the second argument always uses the provided characters LTR.

Similar to padding, there are `trimStart` and `trimEnd`, but also a plain `trim` method exists. `trim` trims both sides of a string and `trimStart` / `trimEnd` trim either the start or end of a string. All 3 trim methods only trim white space from the sides of the string and they take no arguments. 

## Array Destructuring

### Destructuring

Destructuring

>  **de**composing a **structure** into its individual Parts

This next section is going to be pretty heavy on the typing, so it's a good thing that I am watching a recording that I can pause frequently, so that you can read along at your own pace.

When it comes to destructuring, there are certainly a lot of nuances, but it is not some sort of black box that you will never understand. It will take some time, but you (and I) **can** do it! These next sections that focus on destructuring should be super helpful in your code, this is why they were included in this workshop.

[here's a link to the Mozilla Developer Network's documentation on destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

First and foremost, you should understand that the purpose of destructuring as a feature, is to assign individual parts from a larger structure. Assign to individual variables, assign to individual properties, etc... Imagine you are pulling in a large JSON object from an API, and it looks something like this:

{% highlight javascript %}

var tmp = getSomeRecords();
// imaginary API call

var first = tmp[0];
var second = tmp[1];

var firstName = first.name;
var firstEmail = first.email !== undefined ?
    first.email : "nobody@none.tld";

var secondName = second.name;
var secondEmail = second.email !== undefined ?
    second.email : "nobody@none.tld";

{% endhighlight %}

The above may look familiar, maybe you've even written something similar while getting some data from an API? The above is functional, in the sense that it mechanically works, but it is far from ideal in terms of communicating what is happening. Without knowing exactly what the above does at first glance, it still takes a considerable amount of effort to figure out the code. It is fairly common that one would provide a large set of comments to explain what is expected to be returned from the API as well as what the code is actually doing. Comments are useful, but the problem with code comments is that they get out of date; either the API changes or the code changes, but your comments do not change, it can be misleading. Fear not! This is **the** use case, this is why destructuring was created. Destructuring this imaginary JSON object that was returned from an API call is the more declarative way to approach the 'problem'. We'll dig deeper into exactly how all of this works, but for now, take a look at the same code that utilized destructuring to accomplish the same thing:

{% highlight javascript %}

var [
    {
        name: firstName,
        email: firstEmail = "nobody@none.tld"
    },
    {
        name: secondName,
        email: secondEmail = "nobody@none.tld"
    }
] = getSomeRecords();

{% endhighlight %}

Notice in the above code that on the left-hand side of the `=` sign that we have what essentially looks like a JSON object. That is not what it is... It is not an array of objects. Because it's on the left-hand side of the `=` sign, it is not a value at all. It's actually a 'pattern'. It is a syntax that is describing the value that is expected from the right-hand side, where the `getSomeRecords` function is called. A pattern to describe what kind of value we are expecting to get, the purpose of which is not just to describe it, but to assign the individual values as needed; i.e. `name: firstName,` 'describes' that we want to assign the value of the property `name` from the first object in the array of objects returned from the `getSomeRecords` API call to the `firstName` variable. The same 'description' happens for `firstEmail`, `secondName`, and `secondEmail`, but the email(s) are unique in that they are using what is called a 'default value expression' which will set the value to `"nobody@none.tld"` if there is no property for `email` returned from the API call.

The destructuring pattern you write does not have to account for the entirety of the value. The pattern only has to account for the part of the value that you care about at whatever point you need it. The other takeaway here is that this code is essentially self-documenting because of it's declarative nature. Because in a sense, we are documenting with syntax what we can expect the value returned from the API call to be. Next, we'll be doing some (as promised) 'live-coding', so get your code editor open and type the things you're reading here because that's about how interactive we can get! 👀

### Refactoring Code Using Destructuring

Destructuring has a processing model to it and the goal of looking at pre-destructured code alongside destructured code is to solidify the mental model. Since we're not actually 'live-coding' here, I will place the final code, both non-destructured and destructured, for you to compare. Hopefully, both examples should be enough to help you compare the differences, but if not, hit me up! Starting pretty basic here, but here is an example of some code that could benefit from destructuring:

{% highlight javascript %}

function data() {
    return [1,2,3];
}

var tmp = data();
var first = tmp[0];
var second = tmp[1];
var third = tmp[2];

{% endhighlight %}

Kyle admittedly says that the `tmp` variable was probably not even necessary, but whatever... Here's the same thing, but using destructuring:

{% highlight javascript %}

function data() {
    return [1,2,3];
}

var [
    first,
    second,
    third
] = data();

{% endhighlight %}

Again, as we've seen with destructuring in the intro, there is a pattern to the left-hand side of the `=`, which is essentially the same as the imperative approach, but now implemented declaratively! What happens, to either example, if you reference a value that does not exist? The variable would have `undefined` assigned to it. How about if your 'data' has an extra value that you do not use, what happens? If you do not use that additional value, nothing happens... What happens if a value in your 'data' is already `undefined`? If you reference it, whatever variable that value was assigned to will have a value of... `undefined`. But what if a value is `undefined` and you don't actually want any of your variables to be undefined, what would you do then? The imperative approach would be to use a ternary operator, like this:

{% highlight javascript %}

//..
var second = tmp[1] !== undefined ? tmp[1] : 10;
//..

{% endhighlight %}

Using destructuring, the equivalent of the ternary operator is the 'default value expression', which looks like this:

{% highlight javascript %}

//..
    second = 10,
//..

{% endhighlight %}

You can use a 'default value expression' for any of the element positions in your destructuring. A 'default value expression' will only be applied when the value is `undefined`. What if you have an unknown amount of data that you want to collect into an array? How would you do that?

Imperatively:

{% highlight javascript %}

//..
    return [1,2,3,4,5];
//..
var fourth = tmp.slice(3);
//..

{% endhighlight %}

Destructuring:

{% highlight javascript %}

//..
    return [1,2,3,4,5];
//..
...fourth
//..

{% endhighlight %}

Imperatively, using `.slice(3)` will grab everything according to the 'array' position specified, while using `...` in destructuring will 'bundle' all of the remaining data after the last declaration.

### Spread Operator & Declaring Destructured Arrays

In the final examples of the previous section, what would `.slice(3)` or `...` return, or what would you expect it to return, if no value existed? `.slice` should return an array no matter what, and the 'spread operator' should do the same. In destructuring, the 'spread operator' needs to be at the end of your 'pattern', because it gathers all remaining values. I suppose if you were dealing with nested arrays you could probably use it within a nested pattern to retrieve and assign that data, but it would still appear at the end of each segment? There is one fundamental difference between the imperative and destructured approach that we've not looked at yet which is the `tmp` declaration. How could we get the same result, a variable that holds the entire set of data, using destructuring? Like this:

{% highlight javascript %}

//..
var [
//..
] = tmp = data();

{% endhighlight %}

At the end of the declarations for `first`, `second`, `third`... we've added another equals sign and `tmp`. `tmp` will now equal whatever `data()` returns!

### Declaration & Assignment

Destructuring is about the value assignment to a variable, not the declaration. i.e. you could have declared all of the variables ahead of time. **Any valid left-hand side target** can have a value assigned to it. This could be an object, an array, etc. The point again being that destructuring is just the assignment, not the declaration. 

### Comma Separation

What if you would like to ignore a value while using destructuring on an array? Imperatively, it would look like this:

{% highlight javascript %}

just don't declare it!
// var second = tmp[1];

{% endhighlight %}

Using destructuring:

{% highlight javascript %}

//..
first,
,
third,
//..

{% endhighlight %}

Above, adding an additional comma will effectively 'skip' over a value in the array, so if the array were `[1,2,3]`, we'd get `[1,,3]`. It's recommended that if you are going to destructure an array and skip values using commas that you put each value, whether skipped or used, on it's own line for readability sake.

Have you ever needed to swap the values of two variables before and perhaps wrote something like this?

{% highlight javascript %}

var x = 10;
var y = 20;

{
    let tmp = x;
    x = y;
    y = tmp;
}

{% endhighlight %}

With destructuring, we can do that same swap with shortened syntax:

{% highlight javascript %}

var x = 10;
var y = 20;

[y,x] = [x,y];

{% endhighlight %}

### Parameter Arrays

If we can do array destructuring on our assignment list, we can also do [destructuring] in parameter positions. For example, you could do something like this:

{% highlight javascript %}

function data(tmp) {
    var [
        first,
        second,
        third
    ] = tmp;
}

{% endhighlight %}

Or, you could actually destructure the `tmp` parameter, like this:

{% highlight javascript %}

function data([
    first,
    second,
    third
]) {
    //..
}

{% endhighlight %}

The above (beyond the data being an array) cares less about what is being passed in and more about naming the first three index positions of the array as: first, second, third. The multiline formatting of the function signature is for readability. Do it.

What would happen if the `data()` function had a return value of `null`? Whether using destructuring or not, you would end up with a 'type error'. The point being that destructuring is essentially syntactic sugar for the imperative approach, meaning that it is the same as the imperative approach, but potentially more declarative and readable. So, how could we 'build-in' a fallback for the variables so they end up `undefined` rather than `null` or as an empty array? By providing an empty array as the fallback! Imperatively: `var tmp = data() || [];`, using destructuring: `//.. ] = tmp = data() || [];`... the two are essentially the same...

What about when it is a parameter that we are passing in? How do we make sure that there is a default value for a parameter being passed into a function? By using a 'default parameter value'! Like so:

Imperatively: `function data(tmp = []) {...`

Destructuring: `function data([//..] = []) {//..}`

It is recommended to get in the habit of providing default values so that your destructuring patterns fallback to undefined rather than throwing a type error. AND, you may also want your variables to have default values... define them; i.e. `first = 10, second = 20, third = 30...` or whatever you may need them to be.

### Nested Array Destructuring

How do you pull the values out of nested arrays? Here's how that could look with an imperative approach:

{% highlight javascript %}

function data(){
    return [1, [2, 3], 4];
}

var tmp = data() || [];

var first = tmp[0];
var tmp2 = tmp[1];
var second = tmp2[0];
var third = tmp2[1];
var fourth = tmp[2];

{% endhighlight %}

😞 Kind of not enjoyable, but that is how it is done. How about with destructuring?

{% highlight javascript %}

function data() {
    return [1, [2, 3], 4];
}

var tmp;
var [
    first,
    [
        second,
        third
    ],
    fourth
] = tmp = data() || [];

{% endhighlight %}

But what if the value in index position 1 of the array is actually `undefined`? How can you provide a default value so that your things do not explode?! Like this:

Imperatively: `var tmp2 = tmp[1] || [];`

Destructured: `//.. [ second, third ] = [], //..`

Doing the above, will provide graceful fallback for your variables. ❤️

## Object Destructuring

### Object Destructuring

More destructuring! This may look pretty similar to the array destructuring that was just covered, but read on just in case there are some hidden 💎s (hint: there will be). Look at the following:

{% highlight javascript %}

function data() {
    return { a: 1, b: 2, c: 3};
}

var tmp = data();
var first = tmp.a;
var second = tmp.b;
var third = tmp.c;

{% endhighlight %}

Here is its destructured equivalent:

{% highlight javascript %}

function data() {
    return { a: 1, b: 2, c: 3};
}

var {
    a: first,
    b: second,
    c: third
} = data();

{% endhighlight %}

Notice the destructuring pattern for an object is `source: variableName`, this already looks a little different than array destructuring! And since we are working with an object, which requires the source, the order of assignment is whatever you like; i.e. you could order your destructuring pattern backwards `c: third, b: second, a: first` and the result would be the same.

Similar to working with arrays, if you attempt to assign a variable a value which does not exist, it will be assigned `undefined`. Also similar to what we saw with arrays, if there is anything extra that is not used, it is basically ignored. Dissimilar to working with arrays, if you want to gather up the remaining values from an object, it is not as simple as using `.slice()`, but looping over the object using `object.keys` and finding the things you are already capturing, ignoring them, and bundling the rest up in a new object... at least in an imperative approach. With destructuring, use 'object rest'! Object rest is exactly the same as we have seen with array destructuring, `...variableName` will capture any remaining unaccounted for values from the object you are destructuring and place them into a new object for you.

Another similarity to array destructuring, if we need to have default values for variables in the case that a specific parameter does not exist, in object destructuring you can set a default like this:

{% highlight javascript %}

//..
a: first = 42,
//..

{% endhighlight %}

Of course w/ an imperative approach, we'd still be using the long-in-the-tooth ternary operator (re-read the array destructuring for an example of that).

Kyle goes on to explain how he had trouble understanding object destructuring at first, because of the `source: target = default` format, and then explains how it now makes sense to him which did not make any sense whatsoever to me, so I ran off to MDN and found their explanation, I recommended reading it: [Mozilla Developer Network - Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)

### Object Assignment Destructuring

Another non-surprise, but if you have already declared your vars, you do not need to redeclare them when destructuring, or when not destructuring for that matter. However, if you have no declarator, JavaScript will view your object as a block and not an object. This is not your fault, it is JavaScript's. Fear not, wrap everything in parenthesis and you'll be destructuring objects using already declared vars in no time! Here's an example:

{% highlight javascript %}

function data() {
    return { b: 2, c: 3, d: 4};
}

var first, second;

({
    b: second,
    a: first
} = data());

{% endhighlight %}

Notice how the entire statement is wrapped, not just the pattern. Another approach, which we technically covered w/ arrays but I may have conveniently glossed over / left out... is if you need to store all of whatever would be returned from `data()`, say `var tmp = data();`, with destructuring, we could do something like this:

{% highlight javascript %}

//..
var tmp;
//..
tmp = {
    b: second,
    a: first
} = data();

{% endhighlight %}

Now that we've included `tmp =...`, there is no way that JavaScript could confuse our 'undeclared' object as anything other than a destructuring pattern.

### Object Default Assignment

Similar to array destructuring, if what gets returned does not exist, aka returns null or undefined, we can set a default assignment:

{% highlight javascript %}

function data() {
    return;
}

var {
    b: second,
    a: first
} = data() || {};

{% endhighlight %}

Additionally, (and unrelated?) if the target and source are the same name, you only need to list it once, like this:

{% highlight javascript %}

function data() {
    return;
}

var {
    a,
    b
} = data() || {};

{% endhighlight %}

### Nested Object Destructuring

Consider this:

{% highlight javascript %}

function data() {
    return {
        a: 1,
        b: {
            c: 3,
            d: 4
        }
    };
}

var tmp = data() || {};
var a = tmp.a;
var b = tmp.b;
var c = b.c;
var d = b.d;

{% endhighlight %}

And using destructuring:

{% highlight javascript %}

function data() {
    return {
        a: 1,
        b: {
            c: 3,
            d: 4
        }
    };
}

var {
    a,
    b: {
        c,
        d
    } = {}
} = data() || {};

{% endhighlight %}

Pretty similar to nested array destructuring? Yeah... I went ahead and threw in the default value for `b` for the event that it doesn't exist, it will be set to an empty object `{}`. Kyle admits that it is extremely difficult to remember to set defaults, especially in nested destructuring patterns, so he recommends to use a linter, surprisingly, ESLint, which in a previous course of his, he was quite strongly against and was so against that he was making his own. It is dead now... use ESLint!

### Default Assignment Q & A

Q: I've seen people use a placeholder like 'default object' that includes the entire 'tree' instead of an empty object, is that overkill?

A: Yes. It is recommended to place the default values inside of the destructuring pattern and **only** use an empty object `{}` for the fallback.

### Parameter Objects

Don't do this:

{% highlight javascript %}

function data(tmp = {}) {
    var {
        a,
        b
    } = tmp;
    //..
}

{% endhighlight %}

Do this!

{% highlight javascript %}

function data({
    a,
    b
} = {}) {
    //..
}

{% endhighlight %}

That is to say... If you do not need access to the entire object, the proper way to destructure a parameter object is shown in the second example. Otherwise, you should probably stick with the imperative approach and destructure off of `tmp` inside of the function.

### Nested Object & Array Destructuring

Something unique about object destructuring over array destructuring is that we have access to the objects properties and can use them more than once in a destructuring pattern, whereas with array destructuring, we cannot. 😞 Check it out!

{% highlight javascript %}

var obj = {
    a: 1,
    b: 2,
    c: 3
};

var {
    a,
    b: b,
    b: w,
    c
} = obj;

{% endhighlight %}

The above is especially useful when dealing with nested objects. i.e. if you wanted to capture the entirety of `b` and then capture a nested property, something like:

{% highlight javascript %}

var obj = {
    a: 1,
    b: {
        x: 2
    },
    c: 3
};

var {
    a,
    b: b,
    b: {
        x: w
    },
    c
} = obj;

{% endhighlight %}

You can also have arrays nested within objects, and destructure them...

{% highlight javascript %}

var obj = {
    a: 1,
    b: [42, 187],
    c: 3
};

var {
    a,
    b: b,
    b: [
        W,
        X
    ] = [],
    c
} = obj;

{% endhighlight %}

You can effectively have any [nested] combination of arrays and objects and destructure them. Don't forget your defaults!

## Further Destructuring

### Named Arguments

Reading this set of notes about this workshop is not enough to be like, "oh yeah! I know destructuring", you will need to practice destructuring to really get the hang of and truly understand it. So don't feel bad if you're using your favorite search engine frequently to brush up on it, unless you are destructuring daily... then you've got problems. But to help you become even more familiar with destructuring, here is another example to look at:

{% highlight javascript %}

function lookupRecord(store = "person-records", id = -1) {
    //..
}

function lookupRecord({
    store = "person-records",
    id = -1
}) {
    //..
}

lookupRecord( { id: 42} );

{% endhighlight %}

In the first instance of the `lookupRecord` function, there is no way to 'supply' arguments to the function other than the order that they are defined; ie. store, id. But if we instead define the argument as an object, we have effectively created named arguments for our function which we can now pass to it as you can see in the second instance of the `lookupRecord` function and finally at the call-site (the last line of the code snippet above). It is recommended that whenever you have a function that takes 3 or more inputs / arguments to use object destructuring as seen above. Don't run off and refactor all your things, but use it moving forward.

Furthermore, if you are going to start using named arguments as recommended, you may run into the issue that you now have to remember the precise name of the argument... it is for this reason, needing to remember the name of the named argument, that you should come up with some sort of convention that you always use for specific types of arguments; i.e. if you are always passing in a callback, perhaps you would name the named argument `cbreezy` or something more formal if needed. Named arguments is a very popular idiom in JavaScript. Learn it, use it.

### Destructuring & Restructuring

Here's a bit more sophisticated of an example, but one that many have likely ran into at some point. Check out this code, then I'll try to explain it after:

{% highlight javascript %}

// most common approach, using extend(..)

var defaults = {
    url: "http:/some.base.url/api",
    method: "post",
    headers: [
        "Content-Type: text/plain"
    ]
};

console.log(defaults);

// *************************

var settings = {
    url: "http://some.other.url/",
    data: 42,
    callback: function(resp) { /* .. */ }
};

// underscore extend(..)
ajax( _.extend({}, defaults, settings) );

// or: ajax( Object.assign({}, defaults, settings) );

{% endhighlight %}

The above is essentially a couple sets of setting objects (default and settings) that should be 'mixed together' at the call-site for an AJAX call. For example, in the case of the `url` property, the one in the `settings` object should override the `url` property of the `default` object. Underscore's `.extend` will copy `defaults` into the provided empty object, then it will copy `settings` into that same object, overriding any same properties that exist with whatever was brought in last. Fine... but all that is the imperative approach and Kyle don't like that. Let's use destructuring to make it more better, with something he calls: Destructuring & Restructuring:

{% highlight javascript %}

function ajaxOptions({
    url = "http://some.base.url/api",
    method = "post",
    data,
    callback,
    headers: [
        headers0 = "Content-Type: text/plain",
        ...otherHeaders
    ] = []
} = {}) {
    return {
        url, method, data, callback,
        headers: [
            headers0,
            ...otherHeaders
        ]
    };
}

{% endhighlight %}

Great. Now we have an `ajaxOptions` function that has a bunch of named arguments. This is pretty useful! As you can see, anywhere there is an applicable default value (url, method...), it has been defined. Then, in the return statement is where the 'restructuring' happens. The parameters are destructured, then restructured in the return. This is definitely a more declarative approach to defining a function without having to rely on a third-party library. Here is an example of how to use the `ajaxOptions`:

{% highlight javascript %}

// with no arguments, returns the defaults
// as an object if necessary
var defaults = ajaxOptions();

console.log(defaults);

// *************************

var settings = {
    url: "http://some.other.url/",
    data: 42,
    callback: function(resp) { /* .. */ }
};

// with an argument, mixes in the settings
// with the defaults
ajax( ajaxOptions( settings ) );

{% endhighlight %}

### Destructuring Exercise

Following up the example we just saw (destructuring & restructuring), we will update the `handleResponse` function below. If you need any hints, look back at the last section, or skip ahead to the next section which has the actual solution.

{% highlight javascript %}

var defaults = {
	topic: "JavaScript",
	format: "Live",
	slides: {
		start: 0,
		end: 100
	}
};

fakeAjax("http://get-the-workshop.tld",handleResponse);

// *******************************************************

function handleResponse(/* destructuring here */) {

	TestCase({
		/* restructuring here */
	});

}

function TestCase(data) {
	console.log(
		data.topic == "JS Recent Parts" &&
		data.format == "Live" &&
		data.slides.start === 0 &&
		data.slides.end == 77
	);
}

// *******************************************************

function fakeAjax(url,cb) {
	// fake ajax response:
	cb({
		topic: "JS Recent Parts",
		slides: {
			end: 77
		}
	});
}

{% endhighlight %}

### Destructuring Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}
{% highlight javascript %}

// var defaults = {
// 	topic: "JavaScript",
// 	format: "Live",
// 	slides: {
// 		start: 0,
// 		end: 100
// 	}
// };

fakeAjax("http://get-the-workshop.tld",handleResponse);

// *******************************************************

function handleResponse({
    topic = "JavaScript",
    format =  "Live",
    slides: {
        start = 0,
        end = 100
    }
} = {}) {

	TestCase({
		topic, format, slides: {
            start, end
        }
	});

}

function TestCase(data) {
	console.log(
		data.topic == "JS Recent Parts" &&
		data.format == "Live" &&
		data.slides.start === 0 &&
		data.slides.end == 77
	);
}

// *******************************************************

function fakeAjax(url,cb) {
	// fake ajax response:
	cb({
		topic: "JS Recent Parts",
		slides: {
			end: 77
		}
	});
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Array Methods

### find, findIndex, & includes

Take a look at this example for `arr.find`:

{% highlight javascript %}

var arr = [ { a: 1 }, { a: 2 } ];

arr.find(function match(v){
    return v && v.a > 1;
});
// { a: 2 }

arr.find(function match(v){
    return v && v.a > 10;
});
// undefined

arr.findIndex(function match(v){
    return v && v.a > 1;
});
// -1

{% endhighlight %}

If you have an array that holds values and maybe it's difficult to look for those values by their identity, in the case of objects? `.find` takes in a function callback and in the above example(s) you can see that if the return statement is `true`, the actual object will be returned, not `true`. This is similar to the array `.filter` method. If the value returned from the `.find` is `undefined` due to a `false` return value from the evaluated statement, it is indistinguishable from the array itself having a value which is `undefined`; i.e. [1, undefined, 2, 3] vs undefined... This is shown in the second example above. The solution to which is shown in the final example, using `.findIndex`. `.findIndex` will return `-1` if a value is not found (...undefined anyone?), so with that you know that the value definitely does not exist rather than having to guess or in some other way figure out whether your data / array has undefined as a value within it.

Check out these `.indexOf` things and I'll explain after what they are:

{% highlight javascript %}

var arr = [10, 20, NaN, 30, 40, 50];

arr.indexOf(30) != -1 // true

~arr.indexOf(20); // -2 (truthy)

~arr.indexOf(NaN); // -0 (falsy)

{% endhighlight %}

All of the above are examples of '`.indexOf` boolean hacking'. But as of ES2016, we have `.includes`, which looks like this:

{% highlight javascript %}

var arr = [10, 20, NaN, 30, 40, 50];

arr.includes(20); // true

arr.includes(60); // false

arr.includes(20, 3); // false

arr.includes(10, -2); // false

arr.includes(40, -2); // true

arr.includes(NaN); // true

{% endhighlight %}

`.includes` can provide a `true` or `false`, which was the purpose of '`.indexOf` boolean hacking', and it does so by checking the actual value instead of falsely checking the value as in the case of `===`. 

### flat & flatMap

`.find` and `.includes` are good examples of helper methods that we would normally be bringing in from something like Lodash or another utility library, which are now being brought in to the JavaScript 'standard' library. Other examples of bringing in helper methods that you may commonly find in utility libraries are `.flat` and `.flatMap`. Both were added in ES2019.

Here is an example of `.flat` in action:

{% highlight javascript %}

var nestedValues = [ 1, [ 2, 3, ], [[]], [4, [5] ], 6];

nestedValues.flat(0);
// [ 1, [ 2, 3, ], [[]], [4, [5] ], 6]

nestedValues.flat(/*default: 1*/);
// [ 1, 2, 3, [], 4, [5], 6]

nestedValues.flat(2);
// [ 1, 2, 3, 4, 5, 6]

{% endhighlight %}

In the above example(s), a flattening value of zero does nothing, the default value of 1 will remove a single level of nesting, and 2 will remove an additional level of nesting, in the example array provided, all nesting is flattened at level 2. If you want to have your array of arrays of arrays flattened and don't necessarily know how deeply nested the arrays are... give `.flat` a really big number.

When a feature such as `.flat` lands in JavaScript, it is better to start to use it as it is built in to the language rather than continue to rely on third-party libraries. There is nothing wrong with third-party libraries, but we should always try to use anything that is built in to JavaScript before relying on anything else. `.flat` is great for flattening arrays, but what if you also want to map the array?! Fairly common in Functional Programming is the need to both flatten and map something at the 'same' time, enter `.flatMap`! Kyle doesn't get much into explaining Functional Programming or the necessity of using `.flatMap`, but here's some code to look at:

{% highlight javascript %}

[1, 2, 3].map(function tuples(v) {
    return [ v * 2, String(v * 2) ];
});
// [ [2, "2"], [4, "4"], [6, "6"] ]

[1, 2, 3].map(function tuples(v) {
    return [ v * 2, String(v * 2) ];
}).flat();
// [ 2, "2", 4, "4", 6, "6" ]

[1, 2, 3].flatMap(function all(v) {
    return [ v * 2, String(v * 2) ];
});
// [ 2, "2", 4, "4", 6, "6" ]

{% endhighlight %}

Notice how the second and third example produce the same output. The second example uses `.map` then `.flat` whereas the third example uses `.flatMap`. `.flatMap` is basically 'flatten while you map' as opposed to 'map, then flatten'. Conceptually, they are the same, but from a performance and implementation perspective, the single utility function of `.flatMap` is more efficient and should also lend more clarity to the reader (of your code). The only shortcoming of `.flatMap` is that it assumes you are only flattening a single level and does not have the option to flatten more deeply. If you need to flatten and map an array that contains arrays that contain arrays... you'd have to `.map` then `.flat` it with a value specified to control how many 'levels' of your nested array get flattened. yuck... Something fun you can do with `.flatMap` is add additional elements to the returned array. Here's an example of exactly that:

{% highlight javascript %}

[1, 2, 3, 4, 5, 6].flatMap(function doubleEvens(v) {
    if (v % 2 == 0) {
        return [v, v * 2];
    } else {
        return [];
    }
});
// [2, 4, 4, 8, 6, 12]

{% endhighlight %}

That's kinda cool... As of 2019, there were polyfills and transpilations available for these utility functions.

## Iterators & Generators

### Iterators

Going back further in time to ES2015 🤦🏻‍♂️ (dear reader... unless you are completely new to JavaScript, please know this! JK... I don't even know it yet, we all gotta start somewhere), let's look at iterators and generators. What is an iterator you ask? An iterator is way to consume and view a data source's (whether it be an array directly in your code or something returned from an API) values one value at a time. Here's a code sample to illustrate the concept:

{% highlight javascript %}

var str = "Hello";
var str2 = ["W", "o", "r", "l", "d"];

var it1 = str[Symbol.iterator]();
var it2 = str2[Symbol.iterator]();

it1.next(); // { value: "H", done: false }
it1.next(); // { value: "e", done: false }
it1.next(); // { value: "l", done: false }
it1.next(); // { value: "l", done: false }
it1.next(); // { value: "o", done: false }
it1.next(); // { value: undefined, done: true }

it2.next(); // { value: "W", done: false }
// ..

{% endhighlight %}

The above code is taking the iterable variables `str` and `str2` and then iterating over them using `.next`. Calling `.next` on `it1` or `it2` will return an 'iterator result' which is an object with two properties on it; a value property and a done property. The value is the value being iterated out and done is a boolean which tells you if there is anything more to iterate. When you hit the end of your iterable and get back `{ value: undefined, done: true }`, you will keep getting that value back if you continue to call `.next` on it. The iterator protocol does not support going backwards, but you could make an instance of an iterator that does. We'll look at that in a bit here.

### Declarative Iterators

If you wanted to iterate over a string programmatically, i.e. automatically in a sort of looping construct, instead of calling `.next` over and over again, you might come up with something like this:

{% highlight javascript %}

var str = "Hello";

for (
    let it = str[Symbol.iterator](), v, result;
    (result = it.next()) && !result.done &&
    (v = result.value || true);
) {
    console.log(v);
}
// "H" "e" "l" "l" "o"

{% endhighlight %}

The above works, but is a perfect example of where we could benefit from declarative syntax over the above very hard to understand / approach imperative code. And of course, in ES6 we also go the `for of` loop. The `for of` loop takes iterables, things that can be iterated over, iterates over them and gives you the value for each iteration. Take a look at this example:

{% highlight javascript %}

var str = "Hello";
var it = str[Symbol.iterator]();

for (let v of it) {
    console.log(v);
}
// "H" "e" "l" "l" "o"

for (let v of str) {
    console.log(v);
}
// "H" "e" "l" "l" "o"

{% endhighlight %}

Notice in the above code that either an iterator or an iterable is able to be iterated over. Another way to iterate over iterables is to use the `spread` operator: `...`.

{% highlight javascript %}

var str = "Hello":

var letters = [...str];
letters;

// ["H", "e", "l", "l", "o"]

{% endhighlight %}

The `spread` operator and `for of` loop are syntactic support for iterators which are now a first-class built-in citizen in JavaScript.

### Data Structure without Iterators

It's great that iterable data structures are now supported in JavaScript, but what about data structures that do not have iterators? For example, objects are not iterable.

{% highlight javascript %}

var obj = {
    a: 1,
    b: 2,
    c: 3
};

for (let v of obj) {
    console.log(v);
}

// TypeError!

{% endhighlight %}

While it is frustrating that one of the most used data structures is not out-of-the-box iterable in JavaScript, it is possible to define our own. Here is an example of what that looks like:

{% highlight javascript %}

var obj = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function() {
        var keys = Object.keys(this);
        var index = 0;
        return {
            next: () =>
                (index < keys.length) ?
                    { done: false, value: this[keys[index++]] } :
                    { done: true, value: undefined }
        };
    }
};

[...obj];
// [1, 2, 3]

{% endhighlight %}

Notice that the `next` function inside of the object above is exactly like the `.next` we've seen before with iterables. And also notice the arrow function, here being a perfect example of when it is a good idea to use one, because in this case we want to get the lexical `this` from the parent scope of the (arrow) function.

### Generators

The code we just looked at to iterate over an object seems straightforward enough, but it is still an imperative approach... isn't there a more declarative way to do this? There is! Generator functions. Here's an example of one, notice the asterisk (*), this denotes a generator function:

{% highlight javascript %}

function *main() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}

var it = main();

it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { value: 4, done: true }

[...main()];
// [1, 2, 3]

{% endhighlight %}

The generator function allows iteration, with the yield keyword 'returning' a value. Until the generator function hits the `return` value, `done` will be false, the `return` statement will return a `done` boolean of `true`. The only problem with using a `return` statement in a generator function is if you are using the `spread` operator... as soon as the `spread` operator sees a `return` statement, it stops and does not return whatever the `return` returns. So if you are going to use a generator function to `yield` values, make sure that it always `yield`(s) the values and never `return`(s) values. Now that we know we can `yield` values from a generator function, let's take another look at iterating over the key/value pairs of an object using a more declarative approach:

{% highlight javascript %}

var obj = {
    a: 1,
    b: 2,
    c: 3,
    *[Symbol.iterator]() {
        for (let key of Object.keys(this)) {
            yield this[key];
        }
    }
};

[...obj];
// [1, 2, 3]

{% endhighlight %}

Well that's so wonderful. But we are only getting the values from the object... what about the keys? We could yield the keys, we could yield the keys and the values, there are plenty of interesting things you can do when iterating over an object. For keys and values at once, let's look at something called 'entries'. An entry is a tuple, and a tuple is just a two-element array, where the first element is the key, and the second element is the... value?! We have `Object.values` to iterate over an object's values and `Object.keys` to iterate over an object's keys, and now we have `Object.entries` which gives us an array of the aforementioned key/value tuples. 

### Iterator & Generator Exercise

Iterators and generators, a truly exciting topic to be sure, but difficult to wrap your brain around until you try to work with them! Let's do exactly that with this exercise. We're going to take the numbers object and make it iterable. The object itself won't have any data in it, but we do want to define a generator function that will 'spit out' the values 0 - 100. We are going to need to use a named expression, default values for a destructured object, and have the ability to call a function using named arguments. This exercise is pulling together a variety of things that have been covered thus far in this workshop. The final code should only be 5-8 lines of code, the real trick being how to pull all of the things we've covered together for this one exercise... start by defining the iterator; how do you pass it some inputs and iterate over it? Here's the starter code:

{% highlight javascript %}

var numbers = {
	// ..
};

// should print 0..100 by 1s
for (let num of numbers) {
	console.log(num);
}

// should print 6..30 by 4s
console.log("My lucky numbers are: ____");

// Hint:
//     [...numbers[Symbol.iterator]( ?? )]

{% endhighlight %}

### Iterator & Generator Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}
{% highlight javascript %}

var numbers = {
	*[Symbol.iterator]({
        start = 0,
        stop = 100,
        step = 1,
    } = {}) {
        for( let num = start; num <= stop; num += step) {
            yield num
        }
    }
};

for (let num of numbers) {
	console.log(num);
}

console.log(
    `My lucky numbers are: ${
        [...numbers[Symbol.iterator]({
        start: 6,
        stop: 30,
        step: 4
    })]}`
);

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Regular Expressions

### Look Ahead & Behind

The regular expression improvements that we are going to cover have been long in the making for JavaScript. As of ES2018, a set of very helpful changes were added to JavaScript's regular expressions. These are just the beginning, by the time of this writing there should already be more, but this is what had landed at the time this workshop was recorded. For a more up-to-date list, check out the [Mozilla Developer Network - Regular Expressions documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp). The first of the ES2018 regular expressions we are going to look at is called a `look ahead`, the idea of which is essentially an assertion that says: When I match a thing, I want to look ahead and say that my match only happens if something immediately after this also matches. Here are some examples:

{% highlight javascript %}

var msg = "Hello World";

msg.match(/(l.)/g);
// ["ll", "ld"]

msg.match(/(l.)$/g);
// ["ld"]

msg.match(/(l.)(?=o)/g);
// ["ll"]

msg.match(/(l.)(?!o)/g);
// ["lo", "ld"]

{% endhighlight %}

Some assertions that you may be familiar with are the beginning of string character `^` and the end of string character `$`. The specific example above that are 'look ahead'(s) are the third and fourth ones; `msg.match(/(l.)(?=o)/g);` (positive look ahead) and `msg.match(/(l.)(?!o)/g);` (negative look ahead). So if we can look ahead, it would make sense that we could also look behind, right? Well not until 2018, because until then JavaScript was like nope... But fear not reader of the future! You have access to look behinds and this is what they look like!

{% highlight javascript %}

var msg = "Hello World";

msg.match(/(?<=e)(l.)/g);
// ["ll"]

msg.match(/(?<!e)(l.)/g);
// ["lo", "ld"]

{% endhighlight %}

Similar to the look ahead(s), with the look behind, there is a positive `=` and ` negative `!`.

### Named Capture Groups

Another of the ~~new~~ regular expression features is named capture groups, but before you should know what that is, it probably makes sense to understand what a capture group is. 

{% highlight javascript %}

var msg = "Hello World";

msg.match(/.(l.)/);
// ["ell", "ll"]

msg.match(/([jkl])o Worl\1/);
// ["lo Worl", "l"]

msg.match(/(?<cap>l.)/).groups;
// {cap: "ll"}

msg.match(/(?<cap>[jkl])o Wor\k<cap>/);
// ["lo Worl", "l"]

msg.replace(/(?<cap>l.)/g,"-$<cap>-");
// "He-ll-o Wor-ld-"

msg.replace(/(?<cap>l.)/g,function re(...args){
    var [,,,,{ cap }] = args;
    return cap.toUpperCase();
});
// "HeLLo WorLD"

{% endhighlight %}

In regular expressions, parenthesis are not just grouping operators (although they do have that effect), they are also capturing operators. In the first example above, the `"ll"` is the capture group. A capture group is a way to have a sup-part of the (regular expression) pattern pulled out in a separate way. You can see this in a 'back reference' as in this example:

{% highlight javascript %}

msg.match(/([jkl])o Worl\1/);
// ["lo Worl", "l"]

{% endhighlight %}

The above says; whatever comes before the 'o' and the `\1` says; match that same thing later in the pattern. This was the 'old' way of doing regular expressions in JavaScript, now we have a better way, which you can see in the third example above, which happens to be the first named capture group:

{% highlight javascript %}

msg.match(/(?<cap>l.)/).groups;
// {cap: "ll"}

{% endhighlight %}

The `?<namedCaptureGroup>` is what gives the set of parenthesis a name! And, in the above example, you may also have noticed that using `.groups` actually 'spits out' an object with the name of the capture group as the key and the matched result as its value. The following example is of using a named capture group as a back reference:

{% highlight javascript %}

msg.match(/(?<cap>[jkl])o Wor\k<cap>/);
// ["lo Worl", "l"]

{% endhighlight %}

The `\k` is what makes the magic happen. The last two examples are showing a named capture group being used with the `.replace` method, the second example being a bit more complicated using a function callback. Previously, before named capture groups existed, each set of parenthesis would be assigned a number, which may have been difficult to keep track of if your regular expression was quite long... but with named capture groups you can give each group in your regular expression a 'name' which is much more declarative in approach.

### dotall Mode

`dotall` Mode is the third (JavaScript regular expression) feature (added in ES2018) we are going to look at... In addition to having `g` for global, `m` for multiline, and `i` for case insensitive, the regular expression flag `s` 'turns on' what is called the `dotall` Mode. This is important, because historically the `.` character is able to match *any* character except it is unable to do so across new lines. Consider the following:

{% highlight javascript %}

var msg = `
The quick brown fox
jumps over the
lazy dog`;

msg.match(/brown.*over/);
// null

msg.match(/brown.*over/s);
// ["brown fox\njumps over"]

{% endhighlight %}

The first `.match` without the `s` flag is unable to match the regular expression, but that same expression with the `s` flag can match the query!

Another (regular expression) flag that had landed / was going to land at the time this workshop was recorded:

* `/u` - turns on Unicode-aware mode for regular expressions

The importance of regular expression support expanding in JavaScript is that it brings more of the features that developers have come to use with regular expressions in other languages to JavaScript, which is useful for the language's continued dominance and overthrowing of global cabals.

### Regex Exercise

Knowing that *everyone* **loves** regular expressions, let's do this exercise to pour some of our love out for our favorite feature of JavaScript! In addition to working with regular expressions, in this exercise we are also going to be practicing generators. Using the code below, we are going to be using a regular expression to 'extract' / print what each 'power' can do; i.e. a gun: kill. The objective of this exercise is to use all three of the regular expression features that have been covered from the sections above (look ahead / behind, named capture groups, dotall Mode). Here's the exercise:

{% highlight javascript %}

// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
	console.log(power);
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal


// Hints:
//
// function *powers(poem) { .. }
//
// re = / .. /gs
//
// while (match = re.exec(poem)) { .. }
//

{% endhighlight %}

### Regex Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}
{% highlight javascript %}

// The Power of a Smile
// by Tupac Shakur
var poem = `
The power of a gun can kill
and the power of fire can burn
the power of wind can chill
and the power of a mind can learn
the power of anger can rage
inside until it tears u apart
but the power of a smile
especially yours can heal a frozen heart`;

for (let power of powers(poem)) {
	console.log(power);
}
// a gun: kill
// fire: burn
// wind: chill
// a mind: learn
// anger: rage
// smile: heal

function *powers(poem) {
    var re = /(?<=power of )(?<thing>(?:a )?\w+).*?(?<=can )(?<verb>\w+)/gs;
    var match;
    while (match = re.exec(poem)) {
        let {
            groups: {
                thing,
                verb
            }
        } = match;
        yield `${thing: verb}`;
    }
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

## Async Await

### Async Functions

One of the most highly anticipated features that people got very++ excited about is... the `async` function and the `await` syntax inside of that function. But why would we need async functions?! Well... JavaScript first had callbacks, then in ES6 landed `Promise`(s), and finally came `async`... Which doesn't really answer the question 😞 IDK, but there are likely scenarios where you want to have asynchronous function calls... With promises and generators, you could do something like this: (also with the help of a utility function from a library like [co](https://github.com/tj/co), [koa](https://koajs.com/), or [bluebird](http://bluebirdjs.com/docs/getting-started.html))

{% highlight javascript %}

runner(function *main() {
    var user = yield fetchCurrentUser();

    var [ archivedOrders, currentOrders ] =
        yield Promise.all([
            fetchArchivedOrders( user.id ),
            fetchCurrentOrders( user.id )
        ]);
        //...
});

{% endhighlight %}

The above code pattern is called the sync-async pattern. This was possible in ES6 because of the availability of `Promises` and generator functions. Many developers moved from promise chains to the sync-async pattern, the only unfortunate part of this pattern is its dependency on a third party utility function (`runner` above) to manage the pause and resume of the promise. So almost as soon as `Promises` and generator functions landed in ES6, people wanted the ability to pause and resume as they could with the third party utility function(s).

💥 `async` `await` 💥

`await` effectively replaces the `yield` keyword. Here's that same code block from above using the `async` `await` syntax:

{% highlight javascript %}

async function main() {
    var user = await fetchCurrentUser();

    var [ archivedOrders, currentOrders ] =
        await Promise.all([
            fetchArchivedOrders( user.id ),
            fetchCurrentOrders( user.id )
        ]);
        //...
}

main();

{% endhighlight %}

`async` `await` shipped with ES2017 so by now... should be widely supported.

### Async Await Exercise

Practice time! We want to be able to request a number of files and print their results to the correct 'location' but also not have to wait for the 1st then 2nd then 3rd result to be returned in order but still print the 'files' in their sequential order... Should take maybe 5 - 8 lines of code. Solution in the next section if you need it! 

{% highlight javascript %}

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

async function loadFiles(files) {
	// request all files concurrently

	// print in order, sequentially
}

loadFiles(["file1","file2","file3"]);


// **************************************


function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

{% endhighlight %}

### Async Await Solution

{% capture summary %}Click to view the solution{% endcapture %}
{% capture details %}
{% highlight javascript %}

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

async function loadFiles(files) {
	// request all files concurrently
    var promises = files.map(getFile);

	// print in order, sequentially
    for ( promise of promises ) {
        console.log( await promise );
    }
}

loadFiles(["file1","file2","file3"]);


// **************************************


function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

{% endhighlight %}
{% endcapture %}{% include details.html %}

### Async Iteration

There are some issues with async functions. For example, if you try to run a function and pass it to `forEach`, like this:

{% highlight javascript %}

async function fetchFiles(files) {
    var prs = files.map( getFile );

    prs.forEach( function each(pr) {
        console.log( await pr );
    });
}

{% endhighlight %}

...the async function will fail. The reason it fails is because the await keyword has to be used inside of an async function, not a regular function. So, you may expect to be able to pass the async function to the forEach, but forEach does not know what to do with a promise, so it will still fail. What we really need is an asynchronous iterator. As of the workshop, there was no proposal to add this 'eager' asynchronous iterator to JavaScript, but it is a missing piece... But the instructor, Kyle, has built a solution for us called [fasy](https://github.com/getify/fasy) (/ˈfāsē/). Fasy provides eager asynchronous iterator functions for all of the standard (JavaScript) functions, such as; map, filter, reduce.

### Async Function Problems

The instructors Fasy library addresses the issue of nesting async functions, but there are some other issues / concerns to consider. These issues are why the instructor still often uses a generator (function) with a runner (as we have seen in the first section of this unit). Here are some of the issues to consider:

* `await` keyword only knows what to do with actual Promises - There is no way to extend the `await` keyword, it only knows what to do with thenables and promises. Not a huge deal, but when you work with generator function and a runner, you have the ability to pause no any representation of a future value that you may need to.

* Scheduling (starvation) - The way promises were implemented was with the micro-task queue. The micro-task queue is 'outside' of the event loop, which allows a promise to jump to 'the front of the line' whenever a promise is resolved. The side effect of this is anything in the event loop, i.e. an AAJX call or some other function will be blocked. The danger in this is that it is possible to create an infinite loop where a promise keeps adding a new micro-task queue, forever blocking the standard event loop. This is called starvation, CS people write PhD theses about it. TLDR; the instructor ran across an instance where his async code starved the rest of his application. He brought it to the attention of TC39 (board that oversees JavaScript). TC39 said, "you are the only person who has ever ran into this problem, we are going to do nothing to fix it". I guess be aware that it is a possibility, and if it happens to you, godspeed.

* External Cancelation - Async functions are essentially 'black boxes' in the sense that once they start, it is impossible to externally cancel them. [Here's a link to Kyle's talk all about this topic, "Cancel All My Appointments"](https://www.youtube.com/watch?v=VDaKLQE03ss) - He even went on to write some example code for how JavaScript could handle external cancellation of asynchronous functions, using cancellation tokens, which would look something similar to how an AJAX request is canceled. You can take a look at that code here: [Cancelable Asynchronous Functions - CAF](https://github.com/getify/CAF). Being able to cancel any event on the back or front end is a basic necessity, and asynchronous functions are no different. If you need to be able to do this, either use the generator function / runner combination or take a look at the just mentioned CAF.

### Async Generators with yield

Another 'missing piece' of asynchronous functions is the ability to 'push' or `yield` something that we can pass to another function. It would be beneficial if there were a way to 'push' and 'pull' in the same kind of function. An async* generator can solve this problem. In ES2018, async* generators were added. It is a new function type that is both an async function and a generator in one. The async* generator function type allows you to use both the `yield` and `await` keyword(s) in the same function. The `yield` keyword for pushing and the `await` keyword for pulling. Here is a code example that shows why this could be desirable:

{% highlight javascript %}

async function fetchURLs(urls) {
    var results = [];

    for (let url of urls) {
        let resp = await fetch( url );
        if (resp.status == 200) {
            let text = await resp.text();
            results.push( text.toUpperCase() );
        } else {
            results.push( undefined );
        }
    }

    return results;
}

{% endhighlight %}

The above code is actually fine if you only had a few results, but what if you had thousands? Does it make any sense that you would have to wait an indefinite amount of time before you are able to do anything with your data? Probably not... Here is that same code, but using the async* generator function type:

{% highlight javascript %}

async function *fetchURLs(urls) {
    for (let url of urls) {
        let resp = await fetch( url );
        if (resp.status == 200) {
            let text = await resp.text();
            yield text.toUpperCase();
        } else {
            yield undefined;
        }
    }
}

{% endhighlight %}

Not a lot changes, but `await` will be 'pulling' the results and `yield` will be 'pushing' the results out. Pretty 🔥

### Async Generators Iteration

When you call an async* generator function, what you get back from it is a special kind of iterator which allows you to consume its results as it has them. The problem with async* generator functions is that they return a promise rather than an iterator / iterable result, which means you cannot use a `for of` loop or something like that on it, but adding asynchronous behavior to an iterator can work. Here's an example of how that could look:

{% highlight javascript %}

async function main(favoriteSites) {
    var it = fetchURLs( favoriteSites );

    while (true) {
        let res = await it.next();
        if (res.done) break;
        let text = res.value;

        console.log( text );
    }
}

{% endhighlight %}

The above code is considered to be a 'lazy' asynchronous iteration as it will (a)wait results before proceeding. And this is great, but to have to write all that every time you are 'lazily' getting some results is probably not the easiest approach... Thanks to the powers that be, we have the `for await of` loop! Check it out:

{% highlight javascript %}

async function main(favoriteSites) {
 for await (let text of fetchURLs( favoriteSites )){
        console.log( text );
    }
}

{% endhighlight %}

## Wrap-Up

### Wrap-Up

All of the topics that have been covered in this workshop were not things that even the instructor was able to immediately understand. It may take days, weeks, and even months to truly understand some of these features. Don't feel bad if you are not able to get all this right now. Find opportunities to work with these things and solidify your knowledge and understanding of these concepts over time and over real world use. The mission of this workshop was not to have you walk away and be like, "I KNOW ALL THE THINGS ABOUT JAVASCRIPT! ! ! !", but to let you know that this is an ever-evolving language that needs to be kept up with.
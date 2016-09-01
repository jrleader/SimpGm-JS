/**
 * Created by Xiaoming on 16/7/24.
 */
// ***** Model *****

var sym1, sym2, sym3;
// var element1, element2, element3;
var playCost, noOfRounds, balance;
balance = 0;

sym1 = 1, sym2 = 2, sym3 = 3;
var symbols = [sym1, sym2, sym3];
var contentInCell1, contentInCell2, contentInCell3, resDisp, balDisp, roundsLeftDisp;
var arrLen = symbols.length;
var contents = new Array();
// create and initialise the mapping of symbols
var mapping = new Array();
for(var pos = 0; pos < arrLen; ++pos) {
    mapping[pos] = new Array();
    var intSyms = mapping[pos];
    for (var intPos = 0; intPos < symbols.length; ++intPos) {
        intSyms[intPos] = symbols[intPos];
    }
}
var

// playCost = 6;
balance = 100;
// noOfRounds = 10;

// ***** Controller *****

/* Code referenced from http://stackoverflow.com/questions/9899372/
 * pure-javascript-equivalent-to-jquerys-ready-how-to-call-a-function-when-the
 */
(function(funcName, baseObj) { // What does this syntax mean?
    // The public function name defaults to window.docReady
    // but you can pass in your own object and own function name and those will be used
    // if you want to put them in a different namespace
    funcName = funcName || "docReady"; // avoid assigning a 'null' or 'undefined' value to an object
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
// This is the one public interface
// docReady(fn, context);
// the context argument is optional - if present, it will be passed
// as an argument to the callback
baseObj[funcName] = function(callback, context) {
    // if ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away
    if (readyFired) {
        setTimeout(function() {callback(context);}, 1);
        return;
    } else {
        // add the function and context to the list
        readyList.push({fn: callback, ctx: context});
    }
    // if document already ready to go, schedule the ready function to run
    if (document.readyState === "complete") {
        setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
        // otherwise if we don't have event handlers installed, install them
        if (document.addEventListener) {
            // first choice is DOMContentLoaded event
            document.addEventListener("DOMContentLoaded", ready, false);
            // backup is window load event
            window.addEventListener("load", ready, false);
        } else {
            // must be IE
            document.attachEvent("onreadystatechange", readyStateChange);
            window.attachEvent("onload", ready);
        }
        readyEventHandlersInstalled = true;
    }
}
})("docReady", window);

// Once clicked, all symbols in the table cells should be randomly picked from the set of symbols.
function initNewRnd() {
    resDisp = document.getElementById("prevRndRes");
    // resDisp = document.getElementById("resultCol");
    // prompt the user, to notify end of the game
    if(noOfRounds == 0) {
        resDisp.innerHTML = "Game over!";
        // var initButton = document.getElementsByName().item().firstChild;
        return;
    }
    // if 'contents' has not been initialised
    if(contents.length < 1)
    {
        contentInCell1 = document.getElementById("symbol1"); // The 'document' object only visible after the function
        // has been executed.
        contentInCell2 = document.getElementById("symbol2");
        contentInCell3 = document.getElementById("symbol3");
        contents.push(contentInCell3, contentInCell2, contentInCell1);
    }
    // first way of creating mapping between symbols and individual data cell(can only create
    // combinations in which each number is different from others)
    // randomize the order of elements in the array
    // symbols.sort(function() {
    //     return Math.random() - 0.5;
    // });
    // for(var i = 0; i < contents.length; ++i) {
    //            if(i == contents.length - 1) {
    //                contents[i].innerHTML = symbols[i - 1];
    //            }
    //            else {
    //                contents[i].innerHTML = symbols[i + 1];
    //            }
    //     contents[i].innerHTML = symbols[i];
    // }
    // for(var i = 0; i < contents.length; ++i) {
    //     for(var j = 0; j < symbols.length; ++j) {
    //         contents[i] = symbols[j];
    //     }
    // }

    // second way of randomizing symbols
    for(var pos = 0; pos < arrLen; ++pos) {
        var intSyms = mapping[pos];
        intSyms.sort(function() {
            return Math.random() - 0.5;
        });
        contents[pos].innerHTML = intSyms[pos];
    }
    var symbol1 = parseInt(contentInCell1.innerHTML, 10);
    var symbol2 = parseInt(contentInCell2.innerHTML, 10);
    var symbol3 = parseInt(contentInCell3.innerHTML, 10);
    function updateBalAndPrintRes(a, b, c) {
        if(isWon(a, b, c)) {
            resDisp.innerHTML = "You have won this round!";
            if((a == b) && (b == c)) {
                balance += 3 * playCost - playCost;
            }
            else {
                balance += 2 * playCost - playCost;
            }
        }
        else {
            resDisp.innerHTML = "You have lost this round!";
            balance -= playCost;
        }
    }
    // updateBalAndPrintRes(symbol1, symbol2, symbol3, function() {
    //     if(isWon(a, b, c)) {
    //         resDisp.innerHTML = "You have won this round!";
    //     }
    //     else {
    //         resDisp.innerHTML = "You have lost this round!";
    //     }
    // });
    updateBalAndPrintRes(symbol1, symbol2, symbol3);
    balDisp.innerHTML = balance;
    // if(noOfRounds > 0) {
        noOfRounds = noOfRounds - 1;
        roundsLeftDisp.innerHTML = noOfRounds;
    // }
    // else {
    //     roundsLeftDisp.innerHTML = 0;
    // }
    // for(var i = 0; i < contents.length; ++i) {
    //     // mapping[i].sort(function () {
    //     //     return Math.random() - 0.5;
    //     // });
    //     var whichSymbol = parseInt(Math.random() * symbols.length);
    //     var sym = mapping[i];
    //     content[i].innerHTML = sym[whichSymbol];
    // }
}

function isWon(element1, element2, element3) {
    return (!(((element1 == element2) && (element1 != element3)) || ((element1 == element3) && (element1 != element2))
            || ((element2 == element3) && (element2 != element1))));
}



function getResult() {
    result = balance / noOfRounds;
    return result;
}

function getPlayCost() {
    var url = location.href;
    // playcost
    var substr = url.split("?")[1].split("&")[0].split("=")[1];
    // var substr2 = substr1.split("&")[0];
    // var substr3 = substr2.split("=")[1];
    return substr;
}

function getRounds() {
    var url = location.href;
    var substr = url.split("?")[1].split("&")[1].split("=")[1];
    return substr;
}


// function setNewRndBtnOnClick() {
//     var buttons = document.getElementsByTagName("button");
//
// }

docReady(function () {
    // In Safari, the next two lines are not correctly executed
    noOfRounds = getRounds();
    playCost = getPlayCost();
    balDisp = document.getElementById("bal");
    balDisp.innerHTML = balance;
    roundsLeftDisp = document.getElementById("roundsLeft");
    roundsLeftDisp.innerHTML = noOfRounds;
    // use JS query string to retrieve user input of playCost and noOfRounds
    // location.search.
});
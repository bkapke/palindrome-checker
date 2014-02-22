/*jslint browser: true, devel: true, plusplus: true */

(function () {
    "use strict";

    // declare some vars for document elements
    var output = document.getElementById("output"),
        statusLine = document.getElementById("status"),
        phrase = document.getElementById('phrase'),
        testButton = document.getElementById("testButton"),
        palindromeText = document.getElementById("palindrome"),
        characterCheck = document.getElementById("characterCheck"),
        spaceCheck = document.getElementById("spaceCheck"),
        //etc
        ignoreSpecialCharacters = false,
        ignoreSpaces = false;

    //Sets the ui message based on the test results
    function setMessage(palindrome) {
        if (palindrome) {
            output.innerHTML = "Is a palindrome";
            statusLine.innerHTML = "Success!";
            statusLine.style.color = "green";
        } else {
            output.innerHTML = "This is not a palindrome";
            statusLine.innerHTML = "Test Failed";
            statusLine.style.color = "red";
        }
    }

    //Tests the string for symmetry.
    function checkForPalindrome(string) {
        var palindrome = true,
            right = string.length - 1,
            left = 0;

        if (!string || string.length < 1) {
            // 0 characters
            return false;
        }

        while (left < right && palindrome) {
            palindrome = string.charAt(left) === string.charAt(right);
            left++;
            right--;
        }

        return palindrome;
    }

    //Get the string from the form and start testing.
    function executeTest() {
        var string = phrase.value,
            cleanString;

        cleanString = string;

        if (ignoreSpaces) {
            //ignores whitespaces only;
            cleanString = string.replace(/\s+/g, '');
        }

        if (ignoreSpecialCharacters) {
            //ignores punctuation and white space (controversial).
            cleanString = string.replace(/[A-Z0-9]/ig, '');
        }

        if (checkForPalindrome(cleanString)) {
            setMessage(true);
            palindromeText.innerHTML = '"' + string + '"';
        } else {
            setMessage(false);
        }
    }

    function executeOnEnter(e) {
        if (e.keyCode === 13) {
            executeTest();
            phrase.blur();
        }
    }

    //resets the form to state 1
    function resetForm() {
        output.innerHTML = "";
        statusLine.innerHTML = "Waiting";
        statusLine.style.color = "green";
        palindromeText.innerHTML = "";
        phrase.value = "";
    }

    function charIgnoreChanged(e) {
        ignoreSpecialCharacters = e.target.checked;
    }

    function spaceIgnoreChanged(e) {
        ignoreSpaces = e.target.checked;
    }

    //Listening to the dom
    phrase.addEventListener('keydown', executeOnEnter);
    testButton.addEventListener('click', executeTest);
    phrase.addEventListener('focus', resetForm);
    characterCheck.addEventListener('change', charIgnoreChanged);
    spaceCheck.addEventListener('change', spaceIgnoreChanged);

}());
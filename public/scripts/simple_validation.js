"use strict";

var validationConfig = {
    first_name: {
        required: true,
        length: 2
    },
    last_name: {
        required: true,
        length: 2
    },
    email: {
        required: true
    },
    email_confirm: {
        required: true,
        compare: "email"
    },
    password: {
        required: true,
        length: 8,
    },
    password_confirm: {
        required: true,
        length: 8,
        compare: "password"
    }
};


function validateInputs(fields) {

    var value;
    for (var i = 0; i < fields.length; i++) {
        value = document.getElementById(fields[i].element_id).value;
        if (fields[i].test_key === "email") {

        } else if (fields[i].test_key === "email_confirm") {

        } else if (fields[i].test_key === "password") {

        } else if (fields[i].test_key === "password_confirm") {

        } else if (fields[i].test_key === "first_name") {

        } else if (fields[i].test_key === "last_name") {

        } else {
            console.log("Missing Validation fucntion")
        }

    }
}

function validatePassword () {

}
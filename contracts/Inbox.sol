//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract InboxContract {

    string public message;

    constructor (string memory initialMessage)  {
        message = initialMessage;
    }
    function setMessage(string memory newMessgae) public {
        message = newMessgae;
    }
}
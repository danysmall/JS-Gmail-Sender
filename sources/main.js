// ==UserScript==
// @name         GMail Send Automation
// @namespace    http://danysmall.tilda.ws/
// @version      1.1
// @description  Gmail message send automation
// @author       Danila Smolyakov
// @match        *://mail.google.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMA8IAwEKDQQGBQsHDAIJDgIXO2yQAAAQRJREFUOMuNk1kSxCAIRBHXaJLh/qcdFPdKTYYfy/DSoI1QwiRHHO6+APRpA2yRFLVAJhQpNHPe5kxEjJmzAJ4XdYw88r7+gaoQScgamje+bzjF/5o7d1TLnESp5Yv8p6xMRshxEZ1bQ7ppIXAEouVUR/4uhKAoC0flmjQk1hYAJKoSYoDenZ8VSv9bNTv3QKT0SnxIlVO41v9O3EU9EqVOOLPVCPNNGrcRXo6MIi3EemsMtOKXEGLWDkAU6WbWWmIU72atTXYiDrPWY4qnLO27WctFjUnx3azlqj2iEAM4n80K+sHu94ERs36M3PvQilnH89i/PBzz++mlfx/vw/N3NkzpL21YEp6cLNVaAAAAAElFTkSuQmCC
// @grant        GM_registerMenuCommand
// ==/UserScript==

'use strict';

// User input valiables
const DELAY_S = 3;
const DIVIDER = '\n';

const SUBJECT = 'Subject for E-Mail that we wanna send';

const BODY = `Text of message that we wanna send. Lorem for example:

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed posuere, justo blandit lacinia tristique, libero augue mollis turpis, non venenatis metus leo a augue.
Vestibulum pellentesque lorem ut leo mollis, suscipit malesuada ante pharetra.
Quisque at mi tincidunt libero venenatis egestas non ut nisl.
Phasellus augue enim, rutrum vitae mi.`;

const EMAILS = `test@gmail.com
test2@gmail.com
test3@gmail.com`;

// Script constants
// They're used for saving data in LocalDataStorage of browser
const SEND_BUTTON_TEXT = 'Send';
const IS_END_KEY = 'isEnd';
const MAILS_ARRAY_KEY = 'mails';
const SEND_PAGE_LOCATION = '?&cs=b&pv=tl&v=b'

// Add any value to browser LocalStorage
function set_local_storage_key(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

// Return value from browser LocalStorage
function get_local_storage_key(key) {
  if (window.localStorage.getItem(key) != null){
    return JSON.parse(window.localStorage.getItem(key));
  }
  return null;
}

// Return <true> if key isset in browser LocalStorage
// Return <false> if key aren't isset in browser LocalStorage
function is_local_isset(key) {
  if (get_local_storage_key(key) == null) {
    return false;
  }
  return true;
}

// Set is_end key in browser LocalStorage as true
function end_script(){
  set_local_storage_key(IS_END_KEY, true);
}

// Return <true> if key IS_END_KEY is <true>
// Return <false> if key IS_END_KEY is <false> of doesn't exist
function is_ended() {
  if (get_local_storage_key(IS_END_KEY)) {
    return true;
  }
  return false;
}

// Restart sctipt by deleting MAILS_ARRAY_KEY item from localStorage
// and setting IS_END_KEY as <false>
function reset_start() {
  window.localStorage.setItem(IS_END_KEY, false);
  window.localStorage.removeItem(MAILS_ARRAY_KEY);
  document.location.href = SEND_PAGE_LOCATION;
}

function remove_all_data() {
  window.localStorage.removeItem(IS_END_KEY);
  window.localStorage.removeItem(MAILS_ARRAY_KEY);
}

// Fill html tags with given information and click "Send" button
function sendMessage(mail_to, subject, body, delay){
  setTimeout(function(){
    // Insert TO
    let to = document.getElementById('to');
    to.value = mail_to;

    // Insert subject of mail
    let subPost = document.getElementsByName('subject')[0];
    subPost.value = subject;

    // Insert body
    let bodyPost = document.getElementsByName('body')[0];
    bodyPost.value = body;

    // Click send button
    let buttonSubmit = document.querySelector(`input[value="${SEND_BUTTON_TEXT}"]`);
    buttonSubmit.click();
  }, 1000 * delay );
}

// Mainloop function
function mainloop(){
  // If script is ended
  if (is_ended()) {
    return;
  }

  // Change location to needed href if we're not here
  if (document.location.search != SEND_PAGE_LOCATION) {
    document.location.href = SEND_PAGE_LOCATION;
    return;
  }

  // if there are not value of emails in the localStorage
  if (!is_local_isset(MAILS_ARRAY_KEY)) {
    set_local_storage_key(MAILS_ARRAY_KEY, EMAILS.split(DIVIDER));
  }

  // If emails are over exit script
  let emails_array = get_local_storage_key(MAILS_ARRAY_KEY)
  if (emails_array.length == 0 || emails_array == null) {
    end_script();
    return;
  }

  // Save first email from array and splice it
  let mail_to = emails_array[0];
  emails_array = emails_array.splice(1);

  // Save new array without first email in localStorage
  set_local_storage_key(MAILS_ARRAY_KEY, emails_array);

  // Send email
  sendMessage(mail_to, SUBJECT, BODY, DELAY_S);
}

// Add context-menu command
if (is_ended()) {
  if (!is_local_isset(IS_END_KEY))
  GM_registerMenuCommand ('Start', mainloop);
} else {
  GM_registerMenuCommand ('Stop', end_script);
}

GM_registerMenuCommand ('Restart', reset_start);

if (is_local_isset(IS_END_KEY) || is_local_isset(MAILS_ARRAY_KEY)) {
  GM_registerMenuCommand ('Delete all saved data', remove_all_data);
}

// Start mainloop function
mainloop();

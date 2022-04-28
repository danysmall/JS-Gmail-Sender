# Automation for sending mails from GMail by using Tampermonkey
## Requirements
- Installed plugin **Tampermonkey**
- Be logged in GMail
- Entered in Base-HTML version of GMail site

## How to use
All settings are written in *main.js* file. You need to download it and change all settings that you need. You'll see all of settings below.

#### Delay
You can setup delay between sending mails to users. Note that this delay counted from page loaded. It can be more that you wrote. Example:
>```JS 
> const DELAY_S = 3;
> ```

Or you can setup it as float value. It also will work.
> ```JavaScript
> const DELAY_S = 1.3;
> ```


#### Divider
Divider value used for e-mails variable. If you pass e-mails divided by space you should set divider value like this:
>```JavaScript
>const DIVIDER = ' ';
>```
> If you pass e-mail divided by newlines you should set divider like this:
>```JavaScript
>const DIVIDER = '\n'
>```
> And even if your e-mails are divided by other divider you can just put it into divider variable and script also will work.

#### Subject and body of E-Mail
> Setup your subject and body of mail as you like. Subject doesn't allow multiline formatting but that body does.
>```JavaScript
>const SUBJECT = 'This is the subject of my mail';
>const BODY = `Text of message that we wanna send.
>Lorem for example: Lorem ipsum dolor sit amet, ...`

#### E-mails list
Setup your e-mails list following you divider. Examples for different dividers:
> **Newline divider**
>```JavaScript
>const DIVDER = '\n';
>const EMAILS = `test@gmail.com
>test2@gmail.com
>test3@gmail.com`
>```
> **Space divider**
>```JavaScript
>const DIVIDER = ' ';
>const EMAILS = `test@gmail.com test2@gmail.com test3@gmail.com`
>```
> **Colon divider**
>```JavaScript
>const DIVIDER = ' ';
>const EMAILS = `test@gmail.com:test2@gmail.com:test3@gmail.com`
>```

### First Start
- After setting all values that you need you should go to the base-HTML version of GMail. At the first time you just need to click **start** button in context-menu of the Tampermonkey or browser
- Atfer that some data will be saved in localStorage of browser and **start** button will disappear. To rerun script with new data you just need to change it and after that click to **restart** button
- To stop the script you can click **stop** button in context-menu
- To delete all saved data in browser you need go to base-HTML GMail site and click the **Delete all saved data**

### Other languages of GMail site
Note that if you use non-english version of the site you need to change one more variable — **SEND_BUTTON_TEXT**. Its value should be the same as name of button in your language
>```JavaScript
>// For the English
>const SEND_BUTTON_TEXT = 'Send';
>// For the Russian
>const SEND_BUTTON_TEXT = 'Отправить';
>// For the Español
>const SEND_BUTTON_TEXT = 'Enviar';
>// And the same way for the other languages
>const SEND_BUTTON_TEXT = 'NAME_OF_BUTTON';
>```

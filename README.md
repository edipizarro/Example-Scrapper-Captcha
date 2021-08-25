# Packages
- Puppeteer: ``` npm i puppeteer ```

# Usage
Run on NodeJS (Tested on version 10):
``` node scrapper-solution.js ```

# What does this script do
Tries to bypass reCaptcha and scrap data from an URL.
It does not work when the script is executed too many times (I think that if userAgent and ViewPort data are randomly generated it may work better)

# Troubleshooting
If it returns an error, first uncomment lines 47 and 48 to check if it is requesting Captcha.
Then, if the log shows that the site is requesting Captcha **AND** you are using your web navigator User Agent and View Port, enter to the same URL using your web navigator and manually solve the captcha, the the site *should* not ask you for captcha again for a few executions.
# Eusoff Meal Bot

![Eusoff Bot Logo](media/eusoffBotLogo.png)


**Eusoff Meal Bot** is a telegram bot that shows breakfast and dinner for Eusoff Hall for the current week. 

It uses Google Apps Script as a webhook for the telegram bot.

Done by [@glennjs](https://github.com/glennljs)

---
## Requirements

To use this, you'll need. 

  1. [Telegram bot Token](https://core.telegram.org/bots)
  2. [A google account](https://script.google.com/home)

---


## Installation

1. With [npm](https://github.com/nodenv/nodenv) installed, install [clasp](https://developers.google.com/apps-script/guides/clasp) globally

    ```bash
    npm install -g @google/clasp
    ```

2. Run `yarn` to install dependencies
3. Enable the [Google Apps Script API](https://script.google.com/home/usersettings)
4. Then login to Google, `clasp login`
5. Create the google app, `clasp create --title "Eusoff Meal Bot" --type webapp`
6. Copy `secret.js.example` into `secret.js`, replace all placeholder values with your own, except for deployment id.
7. Deploy it using `clasp deploy` to get the deployment id.

    Take note of the deployment id after `Created version x`
    ```console
    Created version 1.
    - <<YOUR DEPLOYMENT ID HERE> @1. 
    ```
8.  Now set the deployment id in `secret.js` along with the bot token and sheet ids.
9.  Run `clasp push` and `clasp deploy -i <<YOUR DEPLOYMENT ID HERE>>` to push your code to Google Scripts and deploy it again
10. Run `clasp open` to open it in google script
11. Click `secret.js`, and click `Run > Run Function > setWebHook`

      Like so

      ![setWebHook](media/setWebHook.png)

12. It will ask you to authorise (for the first time), and it should be ok to do so, click `Advanced > Go to Eusoff Meal Bot (unsafe) > Allow`

      ![authorize](media/clickAdvanced.png)

13. Open the app by `clasp open --webapp`, select the version with your deployment id to open. (This will automatically reset the telegram bot's webhooks)
      
      This should be seen.
      
      ![success page](media/doGet.png)

14. Open your telegram bot! It should show you the breakfast and dinner for the current week!

      ![telegram bot](media/finalSuccess.png)
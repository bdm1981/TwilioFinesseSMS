# TwilioFinesseSMS
The Twilio SMS Gadget for Cisco Finesse will enable contact center agents to send SMS messages from the Finesse desktop. 

## Installation:
These instructions assume you already have a Twilio account setup. If not, you can sign-up for an account at [Twilio.com](https://twilio.com). The gadget format changed for gadgets in 11.5. This can work in earlier versions with modifications.

### Step 1:
1. From the [Twilio Console](https://www.twilio.com/console/functions/manage) Navigate to Functions `https://www.twilio.com/console/functions/manage`

1. Under Function Configuration, make sure `Enable ACCOUNT_SID and AUTH_TOKEN` is checked
![image thumbnail](https://raw.githubusercontent.com/bdm1981/TwilioFinesseSMS/master/screenshots/function-configuration.png)

1. From `https://www.twilio.com/console/functions/manage` click on the + icon to create a new function. Select `Blank` from the template options and click `Create`.

1. Function Setup

    * The function name can be set to whatever you wish
    * The set the path to `send`. the Gadget references this path. If the name is already in use, the gadget will need to be updated to reference the path used.
    * Uncheck `Check for valid Twilio Signature`
    * Paste the content from the `functions/sms/send.js` file into this new function.
    * Save the function.

1. Repeat the previous steps for the List Function

    * The path should be set to `list`

1. Note the Runtime domain from your functions. This will be needed in the next step. ![runtime domain](https://raw.githubusercontent.com/bdm1981/TwilioFinesseSMS/master/screenshots/runtime-domain.png)

### Step 2:
1. Before deploying the gadget to the Finesse server, two variables need to be set in the `agentTwilioGadget.js` file.
    * `var runtimeDomain = "https://"` - Set this to the runtime domain captured in the last step.
    * `var fromNumber = ""` - Set this to the Twilio Phone number to send SMS messages from. This should be in e.164 format: `+1415XXXXXXX`

1. Depending on the version of UCCX/CCE you are running and where the gadget will be installed, the agentTwilioGadget.xml file will need to be modified with the proper location of the finesse and jQuery javascript libraries. 
    ```JavaScript
        <!-- jQuery -->
        <script type="text/javascript" src="/desktop/assets/js/jquery.min.js"></script>
    
        <!-- Finesse Library -->
        <script type="text/javascript" src="/desktop/assets/js/finesse.js"></script>

        <!-- Gadget Business Logic -->
        <script type="text/javascript" src="agentTwilioGadget.js"></script>

        <!-- Bootstrap Library -->
        <script src="/bootstrap.min.js"></script>
    ```
1. Gadgets can be installed on your own web server or directly on the Finesse server. In order to install on the Finesse server follow these steps:
    * If you have never installed gadgets on the system before, the 3rdpartygadget account password must first be set. This is done by connecting to the uccx server via SSH and running the following command: utils reset_3rdpartygadget_password
    * Once the password has been set SFTP to the UCCX server with with the username: 3rdpartygadget and the password set in the previous step. filezilla (windows) or transmit (mac) are two of my preferred SFTP clients.Upload the everything from the assets folder into a new directory called `twilioGadget` in the files directory.
1. Next we will update the Finesse layout to point to the new gadget. Load the Finesse administration by going to: https://<hostname or ip>:8445/cfadmin/
If your team’s are utilizing the default layout, Click on the desktop layout tab. Otherwise, click on the Team Resources tab to edit a specific team's layout.
I prefer to copy the Desktop Layout XML to a text editor, modify it and then paste it back once you are complete. Where you place the Gadget is your preference. 
    ```XML
    <column>   
        <gadgets>
            <gadget>/3rdpartygadget/files/twilioGadget/agentTwilioGadget.xml</gadget> 
        </gadgets>    
    </column> 
    ```

If everything went as planned, the finesse desktop should now show the following

Screenshots:
![image thumbnail](https://raw.githubusercontent.com/bdm1981/TwilioFinesseSMS/master/screenshots/default-view.png)

The phone number and message history is populated with the current voice contact details:
![image thumbnail](https://raw.githubusercontent.com/bdm1981/TwilioFinesseSMS/master/screenshots/populated-view.png)

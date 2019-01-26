# sliderdownloader_js
This is a script made using node.js, automating music download from [http://slider.kz](http://slider.kz). <br />
I'm not responsible if anyone use this script for illegal purposes.
<br /> <br />
You need to have node installed on your machine in order to use this script/app.

## INSTALLATION / CONFIGURATION
In order to install and configure the app, you have the choice to use our custom installation script or not.
<br />
- clone the repo ```git clone https://github.com/thentges/sliderdownloader_js.git```
- go to the created directory ```cd sliderdownloader_js```

Now, you have two choices:
#### using the custom script [RECOMMENDED]
- type ```chmod +x ./install.sh``` in order to make the script executable
- run the script, and follow the instructions ```./install.sh```
#### creating configuration file by yourself
The script is working using a non-pushed ```config.json``` file, where we store some confidential or computer specific data.
You can find a ```config.json.example``` at the project root:
```javascript
{
    "txt_path": "./tracks.txt", // this is the path to the .txt file containing your song list
    "download_dir": "./", // this is the path to the directory where you want the tracks downloaded
    "mail": {
        "service": "gmail", // this is the nodemailer service you want to use to mail the recap (possibilities list here: https://nodemailer.com/smtp/well-known/)
        "username": "yourmail", // this is the email address you'll use to send the report
        "password": "yourpassword", // this is the password associated to this email
        "recipient": null // this is the email address you want to send the recap to. If null, the recap will be sent to the sender address
    },
    "pref": {
        "mail": true, // if you want to receive a report mail everytime the program download something, false if not
        "notif": true // if you want to get notifications when the program starts and ends, false if not
    }
}
```
- duplicate the ```config.json.example``` as ```config.json```
- change the values of the newly created config.json according to your needs
- type ```npm install``` in order to install the dependencies

## HOW TO USE IT
#### Scheduling it with crontab [RECOMMENDED]
todo
#### or

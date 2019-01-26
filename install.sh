#!/bin/sh
BASEDIR=$(dirname $0)

echo 'this is the installation guide in order to configure the scripts'

# prompt user for values
read -p 'enter the location of your .txt containing tracks ::: ' txt_path
read -p 'enter the path to your download directory  ::: ' download_dir
read -p 'enter your mail provider according to this list https://nodemailer.com/smtp/well-known/ ::: ' mail_service
read -p 'enter your (sender) email ::: ' mail_username
read -sp 'enter your (sender) email password ::: ' mail_password
echo
read -p 'enter your mail (receiving) recaps ::: ' mail_recipient

# delete the actual config.json if it exist
if [ -f config.json ]; then
    rm config.json
fi

# create the new config.json file with values
echo "{
    \"txt_path\": \"${txt_path}\",
    \"download_dir\": \"${download_dir}\",
    \"mail\": {
        \"service\": \"${mail_service}\",
        \"username\": \"${mail_username}\",
        \"password\": \"${mail_password}\",
        \"recipient\": \"${mail_recipient}\"
}" >> config.json


cd $BASEDIR && npm install && chmod +x ./run.sh

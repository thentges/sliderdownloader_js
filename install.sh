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

# while the user didn't choose either yes or no, re-ask him
while [ -z "$notif" ]
do
    read -p "do you want to enable desktop notifications ? (y/n) " choice_notif
    case "$choice_notif" in
      y|Y ) notif='true';;
      n|N ) notif='false';;
      *) echo '[error] type y (yes) or n (no)';;
    esac
done

while [ -z "$mail" ]
do
    read -p "do you want to enable report mailing ? (y/n) " choice_mail
    case "$choice_mail" in
      y|Y ) mail='true';;
      n|N ) mail='false';;
      *) echo '[error] type y (yes) or n (no)';;
    esac
done

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
    },
    \"pref\": {
        \"mail\": ${mail},
        \"notif\": ${notif}
    }
}
" >> config.json


cd $BASEDIR && npm install && chmod +x ./run.sh

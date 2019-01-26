#!/bin/sh
# make sure the bash commands are available when run outside from bash (CRON)
# for linux and mac os x
PATH=/usr/local/bin:/usr/local/sbin:~/bin:/usr/bin:/bin:/usr/sbin:/sbin
BASEDIR=$(dirname $0)
cd $BASEDIR && npm start

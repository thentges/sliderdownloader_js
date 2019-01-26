#!/bin/sh
PATH=/usr/local/bin:/usr/local/sbin:~/bin:/usr/bin:/bin:/usr/sbin:/sbin
BASEDIR=$(dirname $0)
cd $BASEDIR && npm start

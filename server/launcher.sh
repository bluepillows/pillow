#!/bin/bash

set -e
export PATH=$PATH:.

# modules are expected in the current dir
# set NODE_PATH to add them all
export NODE_PATH="./node_modules"

# settings for this script
PROCNAME="node"
PROCARGS="./build/index"
SERVERPROCNAME="PLSERVER"
LAUNCHCMD="$PROCNAME $PROCARGS"
OUTFILE="log/plserver.stderr"

####### functions for command type #######

check_status() {
  running=`ps ax | grep -v grep | grep $SERVERPROCNAME | wc -l`
  
  if [ $running -gt 0 ]; then
    until curl -IL --silent http://localhost:9001 | grep Date; do
      printf '.'
      sleep 1
    done
    echo "$SERVERPROCNAME is running"
  else
    echo "$SERVERPROCNAME is NOT running"
  fi
}

start_server() {
  running=`ps ax | grep -v grep | grep $SERVERPROCNAME | wc -l`
  if [ $running -gt 0 ]; then
    echo "$SERVERPROCNAME is ALREADY running, NOT starting it"
    exit 1
  fi
  echo "Launching : $LAUNCHCMD"
  nohup $LAUNCHCMD >/dev/null 2>>$OUTFILE&
}

#find processes with node in their name, kill them
stop_server() {
  echo "killing processes with name : $SERVERPROCNAME"
  pkill $SERVERPROCNAME
}

##################################

case "$1" in
stop)
  stop_server
  sleep 2
  check_status
  ERROR=$?
;;

start)
  start_server
  sleep 4
  check_status
  ERROR=$?
;;

esac

exit $ERROR


#!/bin/bash

# migrate based on --up (default) or --down flag
kind="up"
database="postgres"
while getopts u:p:b:e: flag
do
  case "${flag}" in
    u) ;;
    d) kind="down";;
    p) dir=${OPTARG};;
    e) export NODE_ENV=${OPTARG}
  esac
done

source ../../../.env.$NODE_ENV.local

echo "Checking validity of ${kind} migrations ..."


files=$(find ${dir}/*.${kind}.sql)
files_count=$(echo "$files" | wc -l)
echo "Making ${files_count} migrations ..."

# migrate files one by one
for file in $(find ${dir}/*.${kind}.sql -printf "%f\n" | sort -n -t '_' $([[ "$kind" == "down" ]] && echo "-r")); do
  echo "migrating ${file}"
  # psql ... --file "$file" --single-transaction
  # TODO: handle db errors
  psql postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB -1 -f ${dir}/${file}
done;


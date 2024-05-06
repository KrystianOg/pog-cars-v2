#!/bin/bash

# migrate based on --up (default) or --down flag
kind="up"
while getopts u:d:p: flag
do
  case "${flag}" in
    u) ;;
    d) kind="down";;
    p) dir=${OPTARG};;
  esac
done

echo "Checking validity of ${kind} migrations ..."


files=$(find ${dir}/*.${kind}.sql)
files_count=$(echo "$files" | wc -l)
echo "Making ${files_count} migrations ..."

# migrate files one by one
for file in $(find ${dir}/*.${kind}.sql -printf "%f\n" | sort -n -t '_' $([[ "$kind" == "down" ]] && echo "-r")); do
  echo "migrating ${file}"
  # psql ... --file "$file" --single-transaction
  # TODO: handle db errors
  psql postgresql://admin:admin1234@localhost:5432/postgres -1 -f ${dir}/${file}
done;


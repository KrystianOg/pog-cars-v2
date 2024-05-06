#!/bin/bash

while getopts n: flag
do
  case "${flag}" in
    n) name=${OPTARG};;
  esac
done

if [ -z "$name" ]; then
 echo "Name argument required"
 exit 1
fi

dir=../migrations
# grab largest up and down migrations numbers
max=0

for path in ../migrations/*.down.sql; do
  file=$(basename "$path")
  IFS="_" read -r num rest <<< "$file"

  if (( num > max )); then
    max=$num
  fi
done

touch ../migrations/$((max + 1))_${name}.down.sql

max=0

for path in ../migrations/*.up.sql; do
  file=$(basename "$path")
  IFS="_" read -r num rest <<< "$file"

  if (( num > max )); then
    max=$num
  fi
done

touch ../migrations/$((max + 1))_${name}.up.sql
# for file in (find ${dir}/*.down.sql)
# printf ${down_migrations}

# list up migrations

# printf ${up_migrations}


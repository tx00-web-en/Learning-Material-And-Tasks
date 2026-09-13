#!/bin/bash

OWNER="OWNER"
REPO="REPO"

gh api "repos/$OWNER/$REPO/commits" --jq '.[] | [
    .sha[0:7],
    .commit.author.name,
    .commit.author.date,
    (.commit.message | split("\n")[0])
] | @tsv' |
while IFS=$'\t' read -r sha author utc_date message
do
    # Convert UTC date to Unix timestamp
    timestamp=$(date -d "$utc_date" +%s)

    # Convert to Finnish time
    finnish_date=$(TZ="Europe/Helsinki" date -d "@$timestamp" "+%Y-%m-%d %H:%M:%S")

    # Store the timestamp so we can calculate duration
    if [ -n "$previous_timestamp" ]; then
        duration=$((previous_timestamp - timestamp))

        days=$((duration / 86400))
        hours=$(( (duration % 86400) / 3600 ))
        minutes=$(( (duration % 3600) / 60 ))
        seconds=$((duration % 60))

        if [ "$days" -gt 0 ]; then
            duration_text="${days}d ${hours}h ${minutes}m"
        elif [ "$hours" -gt 0 ]; then
            duration_text="${hours}h ${minutes}m"
        elif [ "$minutes" -gt 0 ]; then
            duration_text="${minutes}m ${seconds}s"
        else
            duration_text="${seconds}s"
        fi
    else
        duration_text="---"
    fi

    printf "%-8s  %-19s  %-12s  %-20s  %s\n" \
        "$sha" \
        "$finnish_date" \
        "$duration_text" \
        "$author" \
        "$message"

    previous_timestamp=$timestamp

done
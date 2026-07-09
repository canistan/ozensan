#!/bin/bash
for i in {2..6}
do
  echo "Starting page $i..."
  python3 scripts/scrape_victor.py --page $i
done
echo "All pages completed!"

#!/bin/bash
for entry in *; do
  if [[ $entry == *.rockspec ]]; then
    echo "Installing $entry"
    luarocks make "$entry"
  fi
done

echo "Installed custom kong plugins"
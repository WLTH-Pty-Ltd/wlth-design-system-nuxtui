#!/usr/bin/env sh
set -eu

nuxi generate playground

rm -rf public
mkdir -p public

if [ -d playground/.output/public ]; then
  cp -R playground/.output/public/. public/
elif [ -d playground/.vercel/output/static ]; then
  cp -R playground/.vercel/output/static/. public/
else
  echo "No static output directory found at playground/.output/public or playground/.vercel/output/static" >&2
  exit 1
fi

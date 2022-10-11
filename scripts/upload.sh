#!/usr/bin/env sh

# build latest assets
yarn build

# upload assets
scp -r ./build/* cren@voren3.seti.org:~/web/

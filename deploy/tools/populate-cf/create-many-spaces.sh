#!/bin/bash

#cf login -a https://api.local.pcfdev.io --skip-ssl-validation
#cf create-org many-spaces
cf target -o many-spaces
counter=200
while [ $counter -le 300 ]
do
    cf create-space many-spaces-$counter
    ((counter++))
done
echo All done
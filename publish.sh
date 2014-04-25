#!/bin/bash

s3cmd sync --delete-removed _site/ s3://code.brianlundin.com/ --verbose

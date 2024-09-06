#!/usr/bin/env bash

echo -e "# Pagenotes\n\nThis plugin adds support for endnotes in Gitbook.\n" > ./docs/documentation.md

cat \
./docs/setup.md \
./docs/overview.md \
./docs/examples.md \
./docs/template.md \
./docs/config.md \
./docs/style.md \
./docs/troubleshoot.md \
./docs/limitations.md \
./docs/support.md \
LICENSE >> ./docs/documentation.md
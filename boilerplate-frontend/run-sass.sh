#!/bin/bash
rm -rf esa-3-sf/public/css/*.*

node_modules/.bin/sass  \
  ./frontend-src/scss/backoffice/backoffice.scss:./esa-3-sf/public/css/backoffice.css \
  --load-path=node_modules/ \
  --load-path=./frontend-src/icone/ \
  --load-path=./frontend-src/globali/ \
  --style=compressed --watch & \
\
node_modules/.bin/sass  \
  ./frontend-src/scss/public/public.scss:./esa-3-sf/public/css/public.css \
  --load-path=node_modules/ \
  --load-path=./frontend-src/icone/ \
  --load-path=./frontend-src/globali/ \
  --style=compressed --watch & \
\
node_modules/.bin/sass  \
  ./frontend-src/scss/email/mail-embed.scss:./esa-3-sf/public/email/mail-embed.css \
  ./frontend-src/scss/email/mail-inline.scss:./esa-3-sf/public/email/mail-inline.css \
  --load-path=node_modules/ \
  --load-path=./frontend-src/globali/ \
  --no-source-map --style=compressed --watch & \
\
node_modules/.bin/sass  \
  ./frontend-src/scss/error_pages/error_page.scss:./esa-3-sf/public/error_pages/error_page.css \
  --load-path=node_modules/ \
  --load-path=./frontend-src/globali/ \
  --style=compressed --watch & \
\
node_modules/.bin/sass  \
  ./frontend-src/scss/backoffice/select2/select2.scss:./esa-3-sf/public/css/select2.css \
  --load-path=node_modules/ \
  --load-path=./frontend-src/globali/ \
  --style=compressed --watch

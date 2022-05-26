#!/usr/bin/bash

# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
ERROR='\033[1;35m'
SUCCESS='\033[1;33m'
RESET='\033[0m' # No Color

TARGET_DIR=_project_root_ # relativo a package.json


printf "* ${SUCCESS}Librerie aggiuntive:${RESET}\n"
rm ./_project_root_/public/libs/*.* # pulizia
# cp -v node_modules/jspdf/dist/jspdf.umd.min.js ./"$TARGET_DIR"/public/libs/
cp -v ./node_modules/jquery/dist/jquery.min.js ./"$TARGET_DIR"/public/libs/
cp -R -v ./node_modules/@massimo-cassandro/m-utilities/layout-tools/dist/. ./"$TARGET_DIR"/public/libs/

# symfony form theme
# cp -v ./node_modules/@massimo-cassandro/symfony-bootstrap-form-theme/dist/bs4_form_layout.html.twig ./"$TARGET_DIR"/templates/_shared/
cp -v ./node_modules/@massimo-cassandro/symfony-bootstrap-form-theme/dist/bs5_form_layout.html.twig ./"$TARGET_DIR"/templates/_shared/

# ckeditor
cp -R -v ./node_modules/@massimo-cassandro/m-utilities/ckeditor/ckeditor-dist/. ./"$TARGET_DIR"/public/ckeditor/

# includes contenuti
# vengono aggiornati solo gli includes
SOURCE=./node_modules/@massimo-cassandro/m-utilities/boilerplate-twig/_SYMFONY_/templates/backoffice/contenuti
TARGET="$TARGET_DIR"/templates/backoffice/contenuti/
cp -v "$SOURCE"/contenuti-elenco.incl.html.twig "$TARGET"
cp -v "$SOURCE"/contenuti-scheda.incl.html.twig "$TARGET"


#shared twig files
SHARED_DIR_FILES=(
  analytics.html.twig
  file_uploader.html.twig
  favicons.html.twig
  flash_messages.html.twig
  flash_messages_malert.html.twig
  flash-messages-malert-bs4-js.html.twig
  form_end_sf4.html.twig
  form_end_sf5.html.twig
  google_font_loader.html.twig
  google_font_v2_loader.html.twig
  icone.html.twig
  imgs_viewer.html.twig
  imgs.html.twig
  meta.html.twig
  recapiti.html.twig
)

for i in "${SHARED_DIR_FILES[@]}"
do
  SOURCE=./node_modules/@massimo-cassandro/m-utilities/boilerplate-twig/_SYMFONY_/templates/_shared/"$i"
  TARGET="$TARGET_DIR"/templates/_shared/"$i"
  if [ -f "$TARGET" ]; then
    printf "* ${SUCCESS}${i}:${RESET}\n"
    cp -v "$SOURCE" "$TARGET"
else
  printf "* ${ERROR}${i} non presente${RESET}\n"
  fi
done

# read -e -p "Aggiorno anche questo script [s/N]?" SN # -i "N"

# if [ -z "$SN" ]
# then
#   SN="N"
# fi
# if [ $SN == "s" ] || [ $SN == "S" ]
# then
#   cp "$BOILERPLATE_PROJ_DIR"/_vscode/upd-from-boilerplate.sh "$PWD"
#   printf "* ${SUCCESS}upd-from-boilerplate.sh aggiornato${RESET}\n"
# fi

# cp "$BOILERPLATE_PROJ_DIR"/_vscode/upd-from-boilerplate.sh "$PWD"
# printf "* ${SUCCESS}upd-from-boilerplate.sh aggiornato${RESET}\n"

echo END

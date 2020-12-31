#!/usr/bin/bash

# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
ERROR='\033[1;35m'
SUCCESS='\033[1;33m'
RESET='\033[0m' # No Color


printf "* ${SUCCESS}Librerie aggiuntive:${RESET}\n"
cp -v node_modules/jspdf/dist/jspdf.umd.min.js js/libs/
# cp -v node_modules/jquery/dist/jquery.min.js js/libs/


# symfony form theme
FILE_OR_FOLDER="bs4_form_layout.html.twig"
SOURCE=node_modules/@massimo-cassandro/symfony-bootstrap-form-theme/dist/"$FILE_OR_FOLDER"
TARGET=../../templates/_shared/"$FILE_OR_FOLDER"
if [ -f "$TARGET" ]; then
  printf "* ${SUCCESS}${FILE_OR_FOLDER}:${RESET}\n"
  cp -v "$SOURCE" "$TARGET"
else
  printf "* ${ERROR}${FILE_OR_FOLDER} non presente${RESET}\n"
fi


# layout_tools
FILE_OR_FOLDER="layout-tools"
SOURCE=node_modules/@massimo-cassandro/"$FILE_OR_FOLDER"/dist/
TARGET="$FILE_OR_FOLDER"/
if [ -d $TARGET ]; then
  printf "* ${SUCCESS}${FILE_OR_FOLDER}:${RESET}\n"
  cp -v -R "$SOURCE". "$TARGET"
else
  printf "* ${ERROR}${FILE_OR_FOLDER} non presente${RESET}\n"
fi


# ckeditor
FILE_OR_FOLDER=ckeditor
SOURCE=node_modules/@massimo-cassandro/m-utilities/"$FILE_OR_FOLDER"/ckeditor-dist/
TARGET=ckeditor/
if [ -d $TARGET ]; then
  printf "* ${SUCCESS}${FILE_OR_FOLDER}:${RESET}\n"
  cp -v -R "$SOURCE". "$TARGET"
else
  printf "* ${ERROR}No ${FILE_OR_FOLDER}${RESET}\n"
fi


# includes contenuti
# vengono aggiornati solo gli includes
SOURCE=./node_modules/@massimo-cassandro/m-utilities/boilerplate/_PROJ_ROOT_/_REPO_/templates/backoffice/contenuti
TARGET=../../templates/backoffice/contenuti/
if [ -d $TARGET ]; then
  printf "* ${SUCCESS}includes contenuti:${RESET}\n"
  cp -v "$SOURCE"/contenuti-elenco.incl.html.twig "$TARGET"
  cp -v "$SOURCE"/contenuti-scheda.incl.html.twig "$TARGET"
else
  printf "* ${ERROR}includes contenuti non presenti${RESET}\n"
fi

#shared twig files
SHARED_DIR_FILES=(
  analytics.html.twig
  file_uploader.html.twig
  favicons.html.twig
  flash_messages_malert.html.twig
  flash_messages.html.twig
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
  SOURCE=./node_modules/@massimo-cassandro/m-utilities/boilerplate/_PROJ_ROOT_/_REPO_/templates/_shared/"$i"
  TARGET=../../templates/_shared/"$i"
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

#!/usr/bin/bash

# cambiare nome se modificato per evitare che sia sovrascritto
# cd "$(dirname "$0")"

source upd-from-boilerplate-params.sh

ASSETS_DIR="$project_base_dir"/public/assets
NODE_MOD_DIR="$ASSETS_DIR"/node_modules
TEMPLATES_DIR="$project_base_dir"/templates
BOILERPLATE_PATH="$NODE_MOD_DIR"/@massimo-cassandro/m-utilities/boilerplate # senza slash finale, no quotes
BOILERPLATE_PROJ_DIR="$BOILERPLATE_PATH"/_PROJ_ROOT_
BOILERPLATE_REPO_DIR="$BOILERPLATE_PROJ_DIR"/_REPO_

# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux
ERROR='\033[1;35m'
SUCCESS='\033[1;33m'
RESET='\033[0m' # No Color

# symfony form theme
FILE_FOLDER="bs4_form_layout.html.twig"
SOURCE="$NODE_MOD_DIR"/@massimo-cassandro/symfony-bootstrap-form-theme/dist/"$FILE_FOLDER"
TARGET="$TEMPLATES_DIR"/_shared/"$FILE_FOLDER"
if [ -f "$TARGET" ]; then
  cp "$SOURCE" "$TARGET"
  printf "* ${SUCCESS}${FILE_FOLDER} aggiornato${RESET}\n"
else
  printf "* ${ERROR}No ${FILE_FOLDER}${RESET}\n"
fi


# layout_tools
FILE_FOLDER="layout-tools"
SOURCE="$NODE_MOD_DIR"/@massimo-cassandro/"$FILE_FOLDER"/dist/
TARGET=$ASSETS_DIR/"$FILE_FOLDER"/
if [ -d $TARGET ]; then
  cp -a "$SOURCE". "$TARGET"
  printf "* ${SUCCESS}${FILE_FOLDER} aggiornato${RESET}\n"
else
  printf "* ${ERROR}No ${FILE_FOLDER}${RESET}\n"
fi


# ckeditor
FILE_FOLDER=ckeditor
SOURCE="$NODE_MOD_DIR"/@massimo-cassandro/m-utilities/"$FILE_FOLDER"/ckeditor-dist/
TARGET=$ASSETS_DIR/"$FILE_FOLDER"/
if [ -d $TARGET ]; then
  cp -a "$SOURCE". "$TARGET"
  printf "* ${SUCCESS}${FILE_FOLDER} aggiornato${RESET}\n"
else
  printf "* ${ERROR}No ${FILE_FOLDER}${RESET}\n"
fi


# contenuti
FILE_FOLDER=contenuti
SOURCE="$BOILERPLATE_REPO_DIR"/templates/backoffice/"$FILE_FOLDER"/
TARGET=$TEMPLATES_DIR/backoffice/"$FILE_FOLDER"/
if [ -d $TARGET ]; then
  cp -a "$SOURCE". "$TARGET"
  printf "* ${SUCCESS}${FILE_FOLDER} aggiornato${RESET}\n"
else
  printf "* ${ERROR}No ${FILE_FOLDER}${RESET}\n"
fi

#shared
SHARED_DIR_FILES=(
  analytics.html.twig
  fancybox_cdn.html.twig
  favicons-svg.html.twig
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
)

for i in "${SHARED_DIR_FILES[@]}"
do
  SOURCE="$BOILERPLATE_REPO_DIR"/templates/_shared/"$i"
  TARGET="$TEMPLATES_DIR"/_shared/"$i"
  if [ -f "$TARGET" ]; then
    cp "$SOURCE" "$TARGET"
  printf "* ${SUCCESS}${i} aggiornato${RESET}\n"
else
  printf "* ${ERROR}No ${i}${RESET}\n"
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

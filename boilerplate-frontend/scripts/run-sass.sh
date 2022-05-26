#!/bin/zsh


# public/css
#*******************************
npx sass ./front-end/scss/:./AppBundle/Resources/public/css/ \
  --load-path=./node_modules/ \
  --load-path=./front-end/icone/ \
  --style=compressed --watch & \

#--dir ./cdn/css/
#--no-map

# postcss
npx postcss ./AppBundle/Resources/public/css/**/*.css \
  --dir ./AppBundle/Resources/public/css/ \
  --config ./scripts/ --map --verbose --watch & \



# apps
#*******************************
npx sass ./front-end/apps/:./AppBundle/Resources/public/apps \
  --load-path=./node_modules/ \
  --load-path=./front-end/icone/ \
  --style=compressed --watch & \

# postcss
npx postcss ./AppBundle/Resources/public/apps/**/*.css \
  --dir ./AppBundle/Resources/public/apps/ \
  --base ./AppBundle/Resources/public/apps/ \
  --config ./scripts/ --map --verbose --watch


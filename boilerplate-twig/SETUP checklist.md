# checklist

* `twig.yaml`: attivazione alias twig `@includes` e `@email_includes`
* `twig.yaml`: aggiunta form thes `_shared/bs4_form_layout.html.twig`
* `services.yaml`: aggiunta estensioni (copiare estensioni da `src/Twig/Extension`
* Attivazione Google Analytics
* Attivazione Google Search Console
* Favicons
* Default favicons redirect
* cache setup
* pagine errore
* sitemap

## server

* mod_expires
* imageMagick con webp (avif?)

## Setup

### config/packages/twig.yaml

```yaml
twig:
    # default_path: '%kernel.project_dir%/templates'
    
    # globals:
    #   risorse: '%risorse%'
    form_themes:
      - '_shared/bs4_form_layout.html.twig'
    paths:
      '%kernel.project_dir%/templates/_shared': includes
      '%kernel.project_dir%/public/assets/email': email_includes
```


### config/services.yaml

```yaml
# [...]
App\Twig\Extension\JsonDecode:
        tags:
            - { name: twig.extension }

    App\Twig\Extension\HtmlEntityDecode:
        tags:
            - { name: twig.extension }

    App\Twig\Extension\Shuffle:
        tags:
            - { name: twig.extension }

    App\Twig\Extension\Truncate:
        tags:
            - { name: twig.extension }
```


### public/.htaccess

#### favicon

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On

    #favicons default
    RewriteRule ^apple-touch-icon.png /assets/favicons/apple-touch-icon.png [L]
    RewriteRule ^favicon.ico /assets/favicons/favicon.ico [L]
</IfModule>
```

#### cache

```apache
#<IfModule mod_headers.c>
#  <filesMatch "\.(png|svg|jpg|webp|ico|gif|xml|woff|#woff2|ttf)$">
#    Header set Cache-Control "max-age=31536000, #public"
#  </filesMatch>
#  <filesMatch "\.(css)$">
#    Header set Cache-Control "max-age=15768000, #public"
#  </filesMatch>
#  <filesMatch "\.(js)$">
#    Header set Cache-Control "max-age=15768000, #private"
#  </filesMatch>
#  <filesMatch "\.(php)$">
#    Header set Cache-Control "max-age=0, #must-revalidate, private"
#  </filesMatch>
#</IfModule>

<IfModule !mod_expires.c>
    <IfModule mod_headers.c>
        # 1 year 
        Header set Cache-Control 'public, max-age 31536000'
    </IfModule>
</IfModule>

<IfModule mod_expires.c>
    ExpiresActive On
    AddType application/vnd.ms-fontobject .eot
    AddType application/x-font-ttf .ttf
    AddType application/x-font-opentype .otf
    AddType application/x-font-woff .woff
    AddType image/svg+xml .svg

    ExpiresByType application/vnd.ms-fontobject "access 1 year"
    ExpiresByType application/x-font-ttf "access 1 year"
    ExpiresByType application/x-font-opentype "access 1 year"
    ExpiresByType application/x-font-woff "access 1 year"

    ExpiresByType text/html "access 1 hour"
    ExpiresByType text/css "access 14 days"
    ExpiresByType text/x-javascript "access 3 weeks"
    ExpiresByType application/javascript "access 1 month"
    ExpiresByType application/x-javascript "access 1 month"

    ExpiresByType image/svg+xml "access 2 months"
    ExpiresByType image/gif "access 2 months"
    ExpiresByType image/png "access 2 months"
    ExpiresByType image/jpg "access 2 months"
    ExpiresByType image/jpeg "access 2 months"
    ExpiresByType image/gif "access 2 months"

    ExpiresByType application/pdf "access 1 year"

    ExpiresByType video/mp4 "access 1 year"
    ExpiresByType video/webm "access 1 year"
    ExpiresByType video/x-m4v "access 1 year"
    ExpiresByType video/quicktime "access 1 year"
    ExpiresByType audio/mpeg "access 1 year"
    ExpiresByType audio/x-wav "access 1 year"

    ExpiresByType image/x-icon "access 1 year"
    ExpiresDefault "access 2 days"
</IfModule>
```

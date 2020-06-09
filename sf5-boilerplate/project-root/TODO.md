# TODO

- [ ] `twig.yaml`: attivazione alias twig `@includes` e `@email_includes`
- [ ] `twig.yaml`: aggiunta form thes `_shared/bs4_form_layout.html.twig`
- [ ] `services.yaml`: aggiunta estensioni (copiare estensioni da `src/Twig/Extension`
- [ ] Attivazione Google Analytics
- [ ] Attivazione Google Search Console
- [ ] pagine errore
- [ ] sitemap



**config/packages/twig.yaml**

```yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    debug: '%kernel.debug%'
    strict_variables: '%kernel.debug%'
    exception_controller: null
    # globals:
    #   risorse: '%risorse%'
    form_themes:
      - '_shared/bs4_form_layout.html.twig'
    paths:
      '%kernel.project_dir%/templates/_shared': includes
      '%kernel.project_dir%/public/assets/email': email_includes
```


**config/services.yaml**

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

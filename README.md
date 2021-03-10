# Diff Language Folding

Logical code folding for Diff language.  

Also works on Git Commit Message language (when git configuration commit.verbose=true)

## Features

![example](example.png)

## Other Helpful Diff Tricks

*This extension does **not** add or modify colorization of Diff files.  This section is provided only as a friendly suggestion to improve your diff language experience.  These settings are not used by this extension, and can be applied without this extension installed*

I recommend adding the following to your settings.json (modifying the colors to your liking) to improve the colorization of Diff files.  These colors work in both light and dark themes.

```json
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "meta.diff",
                "settings": {
                    "fontStyle": "italic"
                }
            },
            {
                "scope": "meta.diff.header.git",
                "settings": {
                    "foreground": "#ee8f00",
                    "fontStyle": "bold"
                }
            },
            {
                "scope": "meta.diff.index.git",
                "settings": {
                    "foreground": "#999999"
                }
            },
            {
                "scope": "meta.diff.range.unified",
                "settings": {
                    "foreground": "#ee8f00",
                }
            }
        ]
    }
```

You can also configure different colors for different themes.  To do this, change the settings as follows:

```json
    "editor.tokenColorCustomizations": {
        "[THEME_NAME]": {
            "textMateRules": [...]
        }
    }
```

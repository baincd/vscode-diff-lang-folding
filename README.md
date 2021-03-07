# Diff Language (Improved)

diff-lang-improved provides enhancements to vscode diff language

## Features

Add logical folding to the Diff language

![example](example.png)

## Requirements

This has been tested in vscode 1.50.1.  It may work in earlier versions as well, but YMMV.

## Diff Colors Recommendation

This extension does *not* add/modify colorization of Diff files.  

However, I do recommend adding the following to your settings.json (modifying the colors to your liking) to improve the colorization of Diff files.  These colors work in both light and dark themes.

*This extension is not required for these settings to work.  This is provided as a friendly suggestion to improve your diff language experience*

```json
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            // Colorize diff files
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

If you want to use different colors for different themes, this can be achieved by using the following:

```json
    "editor.tokenColorCustomizations": {
        "[THEME_NAME]": {
            "textMateRules": [...]
        }
    }
```


# Table of Contents

1.  [Emacs IDE for express, typescript project.](#org11e931f)
    1.  [Edit > ESlint > Prettier Automation](#org3ceed32)
        1.  [Eslint Prettier Middleware](#orga30823b)
    2.  [Emacs Node Debugger](#org7b1a382)
    3.  [Project dependencies](#org991d616)
    4.  [Eslint](#org80cdacc)



<a id="org11e931f"></a>

# Emacs IDE for express, typescript project.


<a id="org3ceed32"></a>

## Edit > ESlint > Prettier Automation


<a id="orga30823b"></a>

### Eslint Prettier Middleware

I have wrote a small middleware to use `prettier-eslint` for Emacs editor. This middleware check original file if the code is eslint. It uses prettify with `prettier-eslint`. Everytime developer change the code and save it, emacs runs the code below

-   Eslint + Prettier
    -   Run prettier middler ware on save
    -   Reload Buffer on change of the file
        
            (defun run-eslint-prettier()
              (interactive)
              (defvar running-command (concat "node " (projectile-project-root) ".prettier.js " (buffer-file-name)))
              (defvar running-command-parameter (concat (projectile-project-root) ".prettier.js"))
              (defvar running-process nil)
              (defvar running-process-buffer-name "*run eslint-prettier*")
              (progn (call-process
                      "node" nil nil nil
                      running-command-parameter buffer-file-name)
                     (revert-buffer t t t)))

1.  How to use


<a id="org7b1a382"></a>

## Emacs Node Debugger

-   indium
    `.indium.json` file

    {
      "configurations": [
        {
          "program": "node", //이거 중요
          "name": "Web project",
          "type": "node",
          "inspect-brk": true
        }
      ]
    }


<a id="org991d616"></a>

## Project dependencies

-   express
-   node
-   typescript


<a id="org80cdacc"></a>

## Eslint

-   eslint
    `eslint --init`
-   prettier
-   prettier-eslint



# Table of Contents

1.  [Emacs IDE for express, typescript project.](#org08c9b40)
    1.  [Edit > ESlint > Prettier Automation](#org533911f)
        1.  [Eslint Prettier Middleware](#org5a28086)
    2.  [Emacs Node Debugger](#orgb31ce78)
    3.  [Project dependencies](#org30cf97c)
    4.  [Eslint](#org6b6f66b)



<a id="org08c9b40"></a>

# Emacs IDE for express, typescript project.


<a id="org533911f"></a>

## Edit > ESlint > Prettier Automation


<a id="org5a28086"></a>

### Eslint Prettier Middleware

I have wrote a small middleware to use `prettier-eslint` for Emacs editor. This middleware check original file if the code is eslint. It uses prettify with `prettier-eslint`. Everytime developer change the code and save it, emacs runs the code below

-   Eslint + Prettier
    -   Run prettier middler ware on save
    -   Reload Buffer on change of the file
        
            (defun run-eslint-prettier()
              (interactive)
              (defvar running-command (concat "node " (projectile-project-root) ".prettier.mjs " (buffer-file-name)))
              (defvar running-command-parameter (concat (projectile-project-root) ".prettier.mjs"))
              (defvar running-process nil)
              (defvar running-process-buffer-name "*run eslint-prettier*")
              (progn (call-process
                      "node" nil nil nil
                      running-command-parameter buffer-file-name)
                     (revert-buffer t t t)))

1.  How to use


<a id="orgb31ce78"></a>

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


<a id="org30cf97c"></a>

## Project dependencies

-   express
-   node
-   typescript


<a id="org6b6f66b"></a>

## Eslint

-   eslint
    `eslint --init`
-   prettier-eslint


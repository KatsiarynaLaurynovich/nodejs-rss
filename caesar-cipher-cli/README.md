# Ceasar cipher CLI tool

CLI tool will encode or decode a text by Caesar cipher

## Description:

CLI tool accepts 4 options:

Required:

- -s, --shift: must be a number
- -a, --action: allowed values "encode" or "decode"

And optional:
- -i, --input: an input file with string to encode or decode
- -o, --output: an output file with encrypted string

## Prerequisites:

- Git - Download & Install Git.
- Node.js - Download & Install Node.js and the npm package manager.

## Downloading and running app:

```bash
git clone git@github.com:KatsiarynaLaurynovich/nodejs-course-template.git
cd caesar-cipher-cli
npm install
node task -s [shift] -a [action] -i [inputPath] -o [outputPath] ||
node task --shift [shift] --action [action] --input [inputPath] --output [outputPath]

```


**Example:**

```bash
$ node task -a encode -s 3 -i "./input.txt" -o "./output.txt"
```

```bash
$ node task --action encode --shift 7 --input input.txt --output output.txt
```

```bash
$ node task --action decode --shift 7 --input input.txt --output output.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

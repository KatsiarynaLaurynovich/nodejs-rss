# Ceasar cipher CLI tool

CLI tool will encode or decode a text by Caesar cipher

## Description:

CLI tool accepts 4 options:

Required:
-s, --shift: a shift
-a, --action: an action encode/decode

And optional:
-i, --input: an input file with string to encode or decode
-o, --output: an output file with encrypted string

## Prerequisites:

- Git - Download & Install Git.
- Node.js - Download & Install Node.js and the npm package manager.

## Downloading:

```bash
git clone {repository URL}
```

## Installing NPM modules:

```bash
npm install
```

## Running application: 

```bash
node task --shift <shift: is a number> --action <action: encode || decode> [--input <string: file name || STDIO>] [--output <string: file name || STDOUT>]
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

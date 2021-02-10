# action-create-env

Simple action for creating environment file.

✨ Inspired by [SpicyPizza/create-envfile](https://github.com/SpicyPizza/create-envfile).

## Inputs

### `file_name`

Env file name  

`.env` by default.

### `directory`

Directory for env file

Project's root directory be default.

### `key_prefix`

Identifier for valid keys. Keys which starts with this identifier will be loaded.

`envkey_` be default.

## Usage

Simple mode:

```
- name: Create env file
  uses: codex-team/action-create-env@v1
  with:
    envkey_SOME_API_KEY: "123456abcdef"
    envkey_SECRET_KEY: ${{ secrets.SECRET_KEY }}
```

Or extended mode:

```
- name: Create env file
  uses: codex-team/action-create-env@v1
  with:
    envkey_DEBUG: false
    envkey_SOME_API_KEY: "123456abcdef"
    envkey_SECRET_KEY: ${{ secrets.SECRET_KEY }}
    some_other_variable_which_will_be_skipped: foobar
    directory: <directory_name>
    file_name: .env
    key_prefix: envkey_
```

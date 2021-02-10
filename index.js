const core = require('@actions/core');
const path = require('path');
const fs = require('fs');

/**
 * Env variables source
 */
const env = process.env;

try {
    const file_name = core.getInput('file_name') || '.env';
    const directory = core.getInput('directory') || '';
    const key_prefix = core.getInput('key_prefix') || 'envkey_';

    /**
     * Get an array of array pair (key, value) for valid env variables
     * @type {[string, *][]}
     */
    const validVars = Object.entries(env).filter(variable => {
        let name = variable[0];

        return name.startsWith(key_prefix);
    })

    /**
     * If no valid vars were found then do nothing
     */
    if (!validVars.length) return;

    /**
     * Generate a path to env file
     */
    const envFilePath = path.join(directory, file_name);

    /**
     * Open a write stream to file
     */
    const stream = fs.createWriteStream(envFilePath);

    /**
     * Fill up env file
     */
    stream.once('open', function(fd) {
        /**
         * For each valid variable we create a line
         */
        validVars.forEach(variable => {
            let name = variable[0].substring(key_prefix.length);
            let value = variable[1];

            stream.write(`${name}=${value}\n`);
        });

        stream.end();
    });
} catch (error) {
    core.setFailed(error.message);
}

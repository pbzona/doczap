# DocZap

DocZap is a webhook trigger that connects Zapier with Linode's docsmith server.
Currently it supports sending "stale" docs to members of the docs team via
Gmail.

## Requirements

- Local docsmith installation
- NodeJS - tested on 6.9 but should work with newer LTS versions
- A Zapier webhook (or several)

## Installation

Clone the repo, navigate to the installation directory and run:

    npm install

## Configuration

Config values live in the `config/config.js` file. At a minimum, you'll need to
add a valid Zapier webhook path to the `reqOptions` object, under `path`. The
webhook path is just the part after `.com` in the URL.

Other values you can modify:

- `csvFile` - A file in which a backup list of stale docs is stored. This file
contains a tab-separated list of old docs that is overwritten each time it runs.
- `docsmithPath` - Location of your docsmith installation.
- `staleAge` - The age in months that is used as a cutoff for a guide being "stale."
For example, if this is 24, DocZap will send a list of all guides that haven't been
modified in more than 2 years when it runs.

## Usage

To start the script:

    node app.js

Once configured, set DocZap to run as a cron job on a server with docsmith
installed. This will send automatic emails with a list of guides
that need to be updated. Don't forget to set the full executable paths for both
Node and DocZap when setting up cron.

## Development

By using a chain of semantically named promises in `app.js`, it should be very clear what is
happening when the program runs. As a side effect, it'll be simple to extend
and add features.

For example, to add another webhook trigger, you could create another module
based on on `modules/trigger.js` and add it to the main app script. The trigger
returns a trivial value ("DONE"), so the main difference would be passing
the stale doc object through any and all triggers so they all send the proper
bodies. To add a new triggers, just have its promise resolve to the input, making
sure the final trigger resolves with something final. You'd also need to create
a separate object for HTTPS request options in that case, assuming the webhook
URL is different.

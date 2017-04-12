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

If you don't already have a webhook, create one before editing the config file.

### Setting up the Webhook

1.  On Zapier, create a new zap, using "Webhooks by Zapier" as the trigger. You don't need to set up a child key since we're generating a custom payload that doesn't really need to be sorted.

2.  From the generated webhook URL, grab the hook path. This will usually be something like `/hooks/catch/abc123`. The leading slash is important! Add this value to the configuration file (`config/config.js`) as the value for `path` in the `reqOptions` object.

3.  For the second step in your zap, select Gmail. Choose "Send Email" as the action. You'll need to allow Zapier to access your Gmail account to do so. In this step, you may want to set up an alias on your account to allow you to send emails from the `docs@` address, but that's up to you.

4.  Fill out the template for the email The "to" field should be `docs@linode.com`, and the body should be the "Stale" field. This is just the root of the payload object that's being sent to the webhook. To select this, click the options tab (some lines with a plus sign in the input box) and choose it from the dropdown. The rest of the fields can be filled out as you see fit.

5.  Once this is done, Zapier will generate a test email. Check the docs inbox to make sure it worked.

### Edit the DocZap Config File

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

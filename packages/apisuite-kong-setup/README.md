# openbank-api-generator

## Some gentle introductory remarks about Kong solution

Kong is built on top of `nginx`, to be more precise, it is built on top of `OpenResty`. This means we have access to the `OpenResty` libs to develop `Kong Plugins`

The most recent versions of `Kong` have deprecated the usage of `ngx.req.upstream_url` in favor of `ngx.vars.upstream_uri`. However, the latter will only change the `path` and keep the `domain` untouched. 

This posed as a slight setback on our original plan to develop a dynamic upstream plugin which would intercept every request on the `access` phase of Kong's lifecycle (This phase occurs before redirecting the client to the upstream target), check for a `X-OpenBank-Org` header, and use it to compose a new `upstream_url`.

This was scrapped. Almost. Not really. At least not completely.

~~What has to be done is the following:~~

~~1. Create a `Service` that points to the `upstream target`, in this case, the `organization` docker container url~~
~~2. Associate a `Route` to that service that matches the `Host` header with the value of the `organization`~~
~~3. Add the `header-upstream` plugin _without_(!!) any `route`, `service`, `consumer`, etc. This will effectively tell `Kong` that _every_ request to the gateway will go through this plugin.~~

~~<sup>1 and 2 should be done when an `Organization` image is first built and tagged. Another remark here is that when this `docker image` is spun up, it has to be named with the value that will be passed in the request header, e.g. the `organization id`.<sup>~~

~~What the `header-upstream` will do is hook into the `rewrite` phase of `Kong`'s lifecycle (this one occurs right _before_ the `access` phase. Check the [Plugin lifecycle from the docs here](https://docs.konghq.com/0.10.x/plugin-development/custom-logic/#available-request-contexts) for more details), check if there is a `X-OpenBank-Org` header and if there is, it will set the `Host` header with the value of the former. This will make the client to be redirected to the `docker container` url. If no header is found, it will do nothing and carry on.~~

## How it was and what has changed

### Introduction

The above approach did not account for the fact we needed to know when the `organization container` was down and how would one make it go up when an end user made a request to it.

### The first attempt

We tried to leverage Kong's `Ring Balancer` to call the `openbank-container-manager` service whenever an healthcheck to the `organization container` return an unhealthy status. But this posed a problem due to the fact that the response upstreamed to the `end user` would be the one of the `openbank-container-manager` and not the response from the `organization container`. So the result of this was that the `end user` would be forced to proactively re-issue the original request, making it so that any implementer would have to handle the case of an `unhealthy` `organization container`. Not optimal and borderline annoying.

### The second attempt

On the second try, we've built up upon the first attempt, by instructing the `openbank-container-manager` to re-issue the request to the `organization container`. However, it was a challenge to detect when the `organization container` was actually up and able to listen for requests. This resulted in some requests coming back with `502 Bad Gateway` errors.

We changed this to, instead, make the `openbank-container-manager` return a `302 Found` response with a `Location` header pointing to the `organization container`, but this was also unfruitful because the end user would have to handle this (just like in the first attempt).

We came back to re-issuing the request to the `organization container` and send the response to the end user, but now using a loop of requests until the `organization container` was up. This proved to be far from optimal as we would be issuing far too many `http` requests and we would probably run into performance issues down the road. Moreover, this would be happening after `nginx` already upstreamed the requests to the targets and we'd have to account for some crazy endless request loops.

### The third attempt

So we decided to roll our sleeves up and write a Kong Plugin for this purpose. We leveraged `OpenResty` (remeber Kong is built on top of this) `cosockets` by means of the `lua-resty-http`. You can google for what a `cosocket` is, but I'll give you the high level overview:

A cosocket is the term of `OpenResty` ecosystem for creating `tcp sockets`. So if you create an object using  `ngx.socket.tcp()` you are creating a `cosocket`. 

What the plugin we've created does is that it uses `cosockets` to perform the following:

- Make the request to the `organization container`. If its responds, pipes the response back to the end user. Done.
- If it does not respond, it will call the `openbank-container-manager` and spin up the `organization container`.
- It will then make a maximum of 10 requests (configurable in the plugin), still using `cosockets`, to the `organization container` until it responds back and pipes the response back to the end user.

- Done.

Also, we went a step further and integrated with Kong's `oauth2 authorization plugin`. This enables us to drop the `x-openbank-organization` and `x-openbank-stet-version` headers. 

How?

This plugin creates a `schema` inside Kong, called `oauth2_credentials_organization`. This schema associates an `organization container` and `stet version` to a `credential`, so that the only thing the end user needs to pass in to the request is the `Authorization` header with the `bearer` token.

The plugin will run _after_ authorization is made, parse the `bearer` token and grab the `organization container` and `stet version` from Kong's datastore.

Also, the plugin extends Kong's `Admin Api` and makes 2 new endpoints available:

- (GET) `/oauth2/credentials/{credential_id}/organization`
- (POST) `/oauth2/credentials/organization` to associate an `orgaization container` and a `stet version` to a credential


# smoke-next

To build locally:

```bash
$ git clone https://github.com/sinclairzx81/smoke.git
$ git checkout smoke-next
$ npm install
$ npm run watch
```

This will start 2 server processes.

```
Port 5000: A parcel bundler watch process (compile | refresh on save)
Port 5001: A smoke-hub signalling web socket.
```

See example code in `./bench` which you can view on `http://localhost:5000`.

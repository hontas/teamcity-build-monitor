# teamcity build dashboard

## Use it

1. Clone repo, cd into and install dependecies
2. Configure ENV variables `TEAMCITY_URL` (without trailing slash) and `TEAMCITY_AUTH` (Authorization header for teamcity)
3. Start it using `npm run build && npm start`

```shell
git clone xxx
cd xxx
npm i
npm build && npm start
```

Example `.env`-file

```
TEAMCITY_URL=https://your.teamcity.instance.com
TEAMCITY_AUTH=Basic XXXXXXXXX
```

## TODO

- [x] Get Teamcity baseUrl from ENV
- [x] Get basic auth from ENV
- [ ] Enable teamcity auth in UI
- [ ] Enable config of builds in UI
- [x] Dont persist malformed data to local storage
- [ ] Only fetch details for running builds

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

## TODO

- [x] Get Teamcity baseUrl from ENV
- [x] Get basic auth from ENV
- [ ] Enable config of builds in UI
- [ ] Dont persist malformed data to local storage
- [ ] Only fetch details for running builds

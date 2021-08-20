FROM andyrbell/mountebank:latest

ADD imposters.ejs imposters.ejs
COPY imposters /imposters
COPY data /data

EXPOSE 2525
EXPOSE 3000

CMD mb start --configfile imposters.ejs
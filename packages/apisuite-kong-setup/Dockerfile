FROM kong:0.14-centos

COPY ./kong/plugins /plugins
COPY ./kong/config /etc/kong
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

RUN  yum install -y unzip gcc && luarocks install net-url && luarocks install lua-resty-http && luarocks install lua-cjson
RUN chmod +x plugins/install.sh
RUN cd plugins && ./install.sh
EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGTERM

CMD ["kong","restart"]

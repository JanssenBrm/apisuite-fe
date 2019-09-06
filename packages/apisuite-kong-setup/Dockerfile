FROM kong-ee

COPY ./config /etc/config
COPY ./plugins /plugins
COPY docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

RUN  yum install -y unzip && luarocks install net-url && luarocks install lua-resty-http
RUN cd plugins/kong-plugin && ls && luarocks make kong-plugin-header-upstream-0.1.0-1.rockspec && luarocks make kong-plugin-docker-manager-0.1.0-1.rockspec 
EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGTERM

CMD ["kong","restart"]

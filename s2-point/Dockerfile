FROM jaigouk/s2

# 1. Use any image as your base image, or "scratch"
# 2. Add fwatchdog binary via https://github.com/openfaas/faas/releases/
# 3. Then set fprocess to the process you want to invoke per request - i.e. "cat" or "my_binary"

#ADD https://github.com/openfaas/faas/releases/download/0.8.0/fwatchdog /usr/bin
#RUN chmod +x /usr/bin/fwatchdog


RUN echo "Pulling watchdog binary from Github." \
    && mkdir -p /home/app \
    && curl -sSL https://github.com/openfaas/faas/releases/download/0.8.0/fwatchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && cp /usr/bin/fwatchdog /home/app

# Add non root user
RUN addgroup app &&useradd -r -u 1001 -g app app
RUN cp /sources/alias /home/app/.profile && chown -R app /home/app
WORKDIR /home/app
USER app
ENV PATH=$PATH:/home/app/.local/bin

RUN /sources/venv/bin/pip3 install --user app  -r requirements.txt

# RUN  /bin/bash -c "source /sources/venv/bin/activate && do-something-with-python"
# Populate example here - i.e. "cat", "sha512sum" or "node index.js"
ENV fprocess="cat"
# Set to true to see request in function logs
ENV write_debug="false"

HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1
# CMD [ "fwatchdog" ]
ENTRYPOINT ["/bin/bash"]
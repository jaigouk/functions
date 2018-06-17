FROM jaigouk/s2

# 1. Use any image as your base image, or "scratch"
# 2. Add fwatchdog binary via https://github.com/openfaas/faas/releases/
# 3. Then set fprocess to the process you want to invoke per request - i.e. "cat" or "my_binary"

#ADD https://github.com/openfaas/faas/releases/download/0.8.0/fwatchdog /usr/bin
#RUN chmod +x /usr/bin/fwatchdog


RUN mkdir -p /home/app/.local/bin

# Add non root user
RUN addgroup app &&useradd -r -u 1001 -g app app
RUN cp /sources/alias /home/app/.profile
WORKDIR /home/app/
COPY requirements.txt	.

RUN chown app:app -R /home/app \
  /sources/venv/lib/python3.6/ \
  /sources/venv/bin/ \
  /usr/bin/ \
  /tmp/ \
  /sources/venv/


USER app
ENV PATH=$PATH:/home/app/.local/bin
RUN /bin/bash -c "source /sources/venv/bin/activate && pip3 install -r requirements.txt"
RUN curl -sSL https://github.com/openfaas/faas/releases/download/0.8.2/fwatchdog > /home/app/.local/bin/fwatchdog \
  && chmod +x /home/app/.local/bin/fwatchdog
RUN mkdir -p function
RUN touch ./function/__init__.py

RUN chown app:app -R /home/app \
  /home/app/.local/bin/ \
  /tmp

USER app

WORKDIR /home/app/function
COPY .env	.
COPY handler.py	.
COPY requirements.txt	.
COPY watchdog.sh .
WORKDIR /home/app/

# Set to true to see request in function logs

ENV fprocess="python3 /home/app/function/handler.py"
ENV write_debug="true"

HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1

CMD ["/home/app/function/watchdog.sh"]
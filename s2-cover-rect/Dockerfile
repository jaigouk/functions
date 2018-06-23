FROM jaigouk/s2-tf-py3

RUN echo "Pulling watchdog binary from Github." \
  && curl -sSL https://github.com/openfaas/faas/releases/download/0.8.2/fwatchdog > /usr/bin/fwatchdog \
  && chmod +x /usr/bin/fwatchdog

WORKDIR /root/

COPY index.py .
COPY requirements.txt .
ENV PATH "$PATH:/usr/bin:/sources/venv/bin"
RUN pip install -r requirements.txt


COPY function function
RUN touch ./function/__init__.py
WORKDIR /root/function/
COPY function/requirements.txt	.
RUN pip install -r requirements.txt

WORKDIR /root/
ENV fprocess="python index.py"

# WORKDIR /home/app/function
# COPY .env.example	.env
# COPY handler.py	.
# COPY requirements.txt	.
# COPY watchdog.sh .
# RUN chmod +x watchdog.sh
# RUN chown app:app -R /home/app \
#   /sources/venv/lib/python3.6/ \
#   /sources/venv/bin/ \
#   /usr/bin/ \
#   /tmp/ \
#   /sources/venv/

# USER app


# Set to true to see request in function logs
ENV write_debug="true"
ENV read_timeout=10
ENV write_timeout=10
ENV exec_timeout=30

HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
# ENTRYPOINT ["/bin/bash", "-c"]

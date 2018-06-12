FROM ubuntu:16.04

# Pick up some TF dependencies
RUN apt-get update -y && apt-get install -y software-properties-common python-software-properties && \
  add-apt-repository ppa:jonathonf/python-3.6 && \
  apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  curl \
  wget \
  libfreetype6-dev \
  libhdf5-serial-dev \
  libpng12-dev \
  libzmq3-dev \
  pkg-config \
  python3.6 \
  python3.6-dev \
  python3.6-venv \
  rsync \
  unzip \
  && python3.6 -m venv /sources/venv

# Pick up some s2 dependencies
RUN apt-get -y install --no-install-recommends  \
  git libgflags-dev libgoogle-glog-dev libgtest-dev openssl swig \
  libssl-dev cmake gawk libevent-dev libcurl4-openssl-dev libboost-dev \
  && apt-get clean
  # && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /sources \
  && touch /sources/alias \
  && echo "alias python=/usr/bin/python3.6" >> /sources/alias

SHELL ["/bin/bash", "-c", "source /sources/alias "]
WORKDIR /sources

COPY googletest /sources/googletest
RUN mkdir -p /sources/googletest/build
WORKDIR /sources/googletest/build
RUN cmake .. && make && make install

COPY s2geometry /sources/s2geometry
RUN mkdir -p /sources/s2geometry/build && mkdir -p /usr/local/lib/python3.6/site-packages

WORKDIR /sources/s2geometry/build
SHELL ["/bin/bash", "-c", "source /sources/venv/bin/activate"]
RUN PYTHON_INCLUDE_DIRS=/usr/include/python3.6 cmake -DGTEST_ROOT=/sources/googletest ..
RUN make && make test
RUN cp /sources/s2geometry/build/python/_pywraps2.so /usr/local/lib/python3.6/site-packages/ \
  && cp /sources/s2geometry/build/python/_pywraps2.so /usr/local/lib/python2.7/site-packages/
RUN make install

WORKDIR /sources
ENTRYPOINT ["/bin/bash"]
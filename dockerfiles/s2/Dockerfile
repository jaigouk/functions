FROM ubuntu:16.04

# Pick up some TF dependencies
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends \
  software-properties-common python-software-properties \
  && add-apt-repository ppa:jonathonf/python-3.6 \
  && apt-get update -y && apt-get install -y --no-install-recommends \
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
  libgflags-dev libgoogle-glog-dev libgtest-dev openssl swig \
  libssl-dev cmake gawk libevent-dev libcurl4-openssl-dev libboost-dev \
  && apt-get clean

RUN mkdir -p /sources \
  && touch /sources/alias \
  && echo "alias python=/usr/bin/python3.6" >> /sources/alias

COPY googletest /sources/googletest
RUN mkdir -p /sources/googletest/build \
  && cd /sources/googletest/build \
  && cmake .. \
  && make && make install

COPY s2geometry /sources/s2geometry
RUN mkdir -p /sources/s2geometry/build
RUN /bin/bash -c "cd /sources/s2geometry/build && source /sources/venv/bin/activate && PYTHON_INCLUDE_DIRS=/usr/include/python3.6 cmake -DGTEST_ROOT=/sources/googletest .. \
  && make && make test && make install"

WORKDIR /sources
ENTRYPOINT ["/bin/bash"]
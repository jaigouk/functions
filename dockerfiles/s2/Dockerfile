# tensorflow is based on ubuntu 16.04 and it comes with python
# https://github.com/tensorflow/tensorflow/blob/master/tensorflow/tools/docker/Dockerfile
FROM tensorflow/tensorflow:1.7.1-py3


# Pick up some TF dependencies
RUN apt-get update && apt-get install -y \
  git \
  libfreetype6-dev \
  libhdf5-serial-dev \
  libpng12-dev \
  libzmq3-dev \
  protobuf-compiler python-pil python-lxml python-tk \
  python-pip python-dev \
  && echo "Pulling watchdog binary from Github." \
  && curl -sSL https://github.com/openfaas/faas/releases/download/0.6.9/fwatchdog > /usr/bin/fwatchdog \
  && chmod +x /usr/bin/fwatchdog

# RUN git clone https://github.com/tensorflow/models.git \
#   && cd /models/research/ \
#   && protoc object_detection/protos/*.proto --python_out=. \
#   && cd / \
#   && wget http://download.tensorflow.org/models/object_detection/ssd_mobilenet_v1_coco_2017_11_17.tar.gz \
#   && tar -zxvf ssd_mobilenet_v1_coco_2017_11_17.tar.gz


# ENV PYTHONPATH=/model/research:/model/research/slim
# # Disable TensorFlow warning messages
# ENV TF_CPP_MIN_LOG_LEVEL=3

# Pick up some s2 dependencies
RUN apt-get -y install --no-install-recommends  \
  libgflags-dev libgoogle-glog-dev libgtest-dev openssl swig \
  libssl-dev cmake gawk libevent-dev libcurl4-openssl-dev libboost-dev \
  && apt-get clean

RUN mkdir -p /sources
COPY googletest /sources/googletest
RUN mkdir -p /sources/googletest/build \
  && cd /sources/googletest/build \
  && cmake .. \
  && make && make install

COPY s2geometry /sources/s2geometry
RUN mkdir -p /sources/s2geometry/build
RUN /bin/bash -c "cd /sources/s2geometry/build  && cmake -DCMAKE_INSTALL_PREFIX=/usr -DGTEST_ROOT=/sources/googletest .. \
  && make && make test && make install"

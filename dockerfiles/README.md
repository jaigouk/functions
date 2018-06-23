# s2

installed s2 with python3.6

## push

```console
docker build -t s2-tf-py3 .
docker tag s2-tf-py3 jaigouk/s2-tf-py3
docker push jaigouk/s2-tf-py3
```

## installing s2 on os x

we need to compile s2 to get pywraps2 so that we can use python interface via Swig.

```sh
git clone https://github.com/google/googletest.git
cd googletest
export GTEST_ROOT=$(pwd)
mkdir mybuild
cd mybuild
cmake -G"Unix Makefiles" ..
make
make install

source $VIRTUAL_ENV/bin/activate

git clone https://github.com/google/s2geometry.git
cd s2geometry
rm -rf build; mkdir build; cd build

cmake -DGTEST_ROOT=${GTEST_ROOT} \
-DOPENSSL_ROOT_DIR=/usr/local/Cellar/openssl/1.0.2o_1 \
-DOPENSSL_INCLUDE_DIR=/usr/local/Cellar/openssl/1.0.2o_1/include/ \
-DOPENSSL_LIBRARIES=/usr/local/Cellar/openssl/1.0.2o_1/lib ..

make
make test
make install
```

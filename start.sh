cd /home/ubuntu/node-v0.10.29

# try to remove the repo if it already exists
rm -rf motocitmigration ; true

git clone https://github.com/dharmendrakshl1/motocitmigration

cd motocitmigration

npm i

docker build -t motocitmigration  .

docker run -p 8080:8080 motocitmigration

nodejs .

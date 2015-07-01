cd /tmp

# try to remove the repo if it already exists
rm -rf MotoCITMigration; true

git clone https://github.com/dharmendrakshl1/MotoCITMigration

cd MotoCITMigration

npm install

nodejs .

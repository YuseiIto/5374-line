if [ $# -ne 1 ]; then
  echo "指定された引数は$#個です。" 1>&2
  echo "実行するには1個の引数が必要です。" 1>&2
  exit 1
fi

rsync -avz . $1:~/ritto_5374LINE/ --exclude-from=.gitignore --exclude=".git" --delete

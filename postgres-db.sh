export POSTGRES_PORT=5454
export POSTGRES_HOST=localhost
export POSTGRES_USER=apolonskyi
export POSTGRES_PASSWORD=Passw0rd!
export POSTGRES_DB=todo-list

echo "Starting postgres"
docker rm -f postgres-todo
docker build . -t postgres:todo
docker run -d -p 5454:5432 --name postgres-todo postgres:todo -c 'fsync=off' -c 'synchronous_commit=off' -c 'full_page_writes=off'

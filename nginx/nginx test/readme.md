#### // remove tudo
`sudo docker rmi $(sudo docker images -a -q)`
#### // sobe o docker compose
`sudo docker compose up -d`
#### // verifica se está rodando
`sudo docker compose ps`
`sudo docker compose ls` 

```bash
sudo docker compose exec nginx apk add bash &&
sudo docker compose exec nginx apk add vim &&
sudo docker compose exec nginx apk add nano
```

`sudo docker compose exec nginx bash` 

`nano etc/nginx/conf.d/default.conf`

```bash
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass   http://node1;     
    }
}
```
`nginx -t`

```bash
sudo docker compose exec node1 apk add bash &&
sudo docker compose exec node1 apk add vim &&
sudo docker compose exec node1 apk add nano 
```

`sudo docker compose exec node1 bash`

`ls usr/share/nginx/html`

`ls etc/nginx/nginx.conf`
`ls etc/nginx/conf.d/default.conf`

`nginx -t`

`nginx -s reload`
```bash
server {
        server_name vardhan.com;

        location / {
          proxy_pass http://app1:4000;
          proxy_headers_hash_max_size 512;
          proxy_headers_hash_bucket_size 64;
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          add_header Front-End-Https on;
        }
        location /new {
          proxy_pass http://app2:4001/;
          proxy_headers_hash_max_size 512;
          proxy_headers_hash_bucket_size 64;
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          add_header Front-End-Https on;
        }
}
```

`nginx -t`

`nginx -s reload`

`nginx -s stop`

`sudo docker compose down`

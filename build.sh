#!/usr/bin/env bash
sed -i -re '/"@angular\/common": "~2.4.0"/a\
    "@angular\/cli": "1.0.1",' \
    package.json

npm install

"./node_modules/@angular/cli/bin/ng" build --env=sit

# Redirect everything to $URI and fall back to /index.html
cat >dist/nginx.conf <<'EOF'
worker_processes 1;
daemon off;

error_log <%= ENV["APP_ROOT"] %>/nginx/logs/error.log;
events { worker_connections 1024; }

http {
	server {
		listen <%= ENV["PORT"] %>;
		server_name localhost;

		root <%= ENV["APP_ROOT"] %>/public;

        location / {
			try_files $uri /index.html;
		}

		location = /index.html {
			expires 30s;
		}
	}
}
EOF

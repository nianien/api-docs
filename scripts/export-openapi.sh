#!/usr/bin/env bash
set -e

# 1. 确保服务启动在 8080（你可以改端口）
#   - 本地开发：自己先启动
#   - CI：可以在 pipeline 里用 mvn spring-boot:run 起一个

# 2. 导出 openapi.yaml 到本地
curl -s http://localhost:8080/v3/api-docs.yaml -o openapi-service-a.yaml

echo "Generated openapi-service-a.yaml"




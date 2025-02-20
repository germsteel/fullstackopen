# 开发环境阶段
FROM node:18-alpine as development

WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动开发服务器
CMD ["npm", "start"]

# 构建阶段
FROM development as build

RUN npm run build

# 生产环境阶段
FROM nginx:alpine as production

# 从构建阶段复制构建文件
COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"] 
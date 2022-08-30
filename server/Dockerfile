FROM public.ecr.aws/bitnami/node:16
WORKDIR /usr/app

COPY . .

RUN corepack enable
RUN yarn set version stable
RUN yarn plugin import workspace-tools
RUN yarn workspaces focus --production && yarn cache clean 

CMD ["node", "dist/main.js"]

EXPOSE 3030

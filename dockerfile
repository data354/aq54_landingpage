FROM --platform=linux/amd64 dykoffi/node-serve:light as release

WORKDIR /app
COPY dist ./

EXPOSE 8000

CMD serve --cors -sp 8000
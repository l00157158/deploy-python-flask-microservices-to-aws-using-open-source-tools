FROM python:3.13.0a3-slim as builder
COPY . /src
RUN pip install --user fastapi uvicorn boto3 flask

FROM python:3.13.0a3-slim as app
COPY --from=builder /root/.local /root/.local
COPY --from=builder /src .

ENV PATH=/root/.local:$PATH
EXPOSE 5000

CMD ["python3", "app.py"]

FROM public.ecr.aws/lambda/python:3.12

ENV POETRY_VERSION=1.8.3

RUN pip install "poetry==$POETRY_VERSION"

WORKDIR ${LAMBDA_TASK_ROOT}
COPY poetry.lock pyproject.toml ${LAMBDA_TASK_ROOT}/
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root --only main

COPY main.py ${LAMBDA_TASK_ROOT}/

CMD ["main.handler"]
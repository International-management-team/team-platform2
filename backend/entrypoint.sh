# Выполнение миграций и сборки статики
poetry install
python manage.py migrate
python manage.py collectstatic --noinput

# Запуск Gunicorn
exec "$@"

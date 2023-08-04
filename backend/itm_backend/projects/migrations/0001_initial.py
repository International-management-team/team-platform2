# Generated by Django 3.2.20 on 2023-08-04 07:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=254, verbose_name="Название Проекта")),
                ("description", models.TextField(verbose_name="Описание Проекта")),
                ("deadline", models.DateField(verbose_name="Дата окончания проекта")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Onboarding", "Онбординг"),
                            ("In progress", "В работе"),
                            ("Production", "Проект взлетел"),
                            ("Tests", "Тестирование"),
                        ],
                        default="Onboarding",
                        max_length=20,
                        verbose_name="Статус проекта",
                    ),
                ),
                (
                    "priority",
                    models.CharField(
                        choices=[
                            ("maximum", "Максимальный"),
                            ("average", "Средний"),
                            ("minimum", "Минимальный"),
                            ("urgent", "Срочно"),
                        ],
                        max_length=20,
                        verbose_name="Приоритет проекта",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации проекта")),
                ("updated_at", models.DateTimeField(auto_now=True, verbose_name="Дата обновления проекта")),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="projects",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Автор Проекта",
                    ),
                ),
            ],
            options={
                "verbose_name": "Проект",
                "verbose_name_plural": "Проекты",
            },
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200, unique=True, verbose_name="Название")),
            ],
            options={
                "verbose_name": "Тэг",
                "verbose_name_plural": "Тэги",
            },
        ),
        migrations.CreateModel(
            name="Task",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("Backlog", "Бэклог"),
                            ("Todo", "Необходимо сделать"),
                            ("In progress", "В работе"),
                            ("In review", "На рассмотрении"),
                            ("Done", "Завершено"),
                        ],
                        default="Backlog",
                        max_length=20,
                        verbose_name="Статус задачи",
                    ),
                ),
                ("description", models.TextField(verbose_name="Описание задачи")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Дата создания задачи")),
                ("update_at", models.DateTimeField(auto_now=True, verbose_name="Дата обновления обносления задачи")),
                ("deadline", models.DateField(verbose_name="Срок исполнения задачи")),
                ("name", models.CharField(blank=True, max_length=150, verbose_name="Название задачи")),
                (
                    "assigned_to",
                    models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL, verbose_name="Участники задачи"),
                ),
                (
                    "creator",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="created_tasks",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Создатель",
                    ),
                ),
                (
                    "tags",
                    models.ManyToManyField(
                        blank=True, related_name="related_tasks", to="projects.Tag", verbose_name="Тэги"
                    ),
                ),
            ],
            options={
                "verbose_name": "Задача",
                "verbose_name_plural": "Задачи",
            },
        ),
        migrations.CreateModel(
            name="TaskUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "task_id",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="users",
                        to="projects.task",
                        verbose_name="Задача",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="related_tasks",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Исполнитель",
                    ),
                ),
            ],
            options={
                "verbose_name": "Задача пользователя",
                "verbose_name_plural": "Задача пользователя",
                "ordering": ["id"],
            },
        ),
        migrations.CreateModel(
            name="ProjectUser",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "project_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="project_participants",
                        to="projects.project",
                        verbose_name="Проект",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="project_participants",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Участник",
                    ),
                ),
            ],
            options={
                "verbose_name": "Участник Проекта",
                "verbose_name_plural": "Участники Проекта",
            },
        ),
        migrations.AddField(
            model_name="project",
            name="participants",
            field=models.ManyToManyField(
                blank=True,
                through="projects.ProjectUser",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Участники проекта",
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="tags",
            field=models.ManyToManyField(blank=True, related_name="projects", to="projects.Tag", verbose_name="Тэги"),
        ),
        migrations.AddField(
            model_name="project",
            name="tasks",
            field=models.ManyToManyField(
                blank=True, related_name="projects", to="projects.Task", verbose_name="Задачи проекта"
            ),
        ),
        migrations.AddConstraint(
            model_name="projectuser",
            constraint=models.UniqueConstraint(fields=("user_id", "project_id"), name="unique_user_project"),
        ),
    ]

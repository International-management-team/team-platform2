# Generated by Django 3.2.20 on 2023-09-02 10:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("projects", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="taskuser",
            name="user_id",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="related_tasks",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Исполнитель",
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="assigned_to",
            field=models.ManyToManyField(
                blank=True, through="projects.TaskUser", to=settings.AUTH_USER_MODEL, verbose_name="Участники задачи"
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="creator",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="created_tasks",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Создатель",
            ),
        ),
        migrations.AddField(
            model_name="task",
            name="task_project",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tasks",
                to="projects.project",
                verbose_name="Проект",
            ),
        ),
        migrations.AddField(
            model_name="projectuser",
            name="project_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="project_participants",
                to="projects.project",
                verbose_name="Проект",
            ),
        ),
        migrations.AddField(
            model_name="projectuser",
            name="user_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="project_participants",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Участник",
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="owner",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="projects",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Автор Проекта",
            ),
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
        migrations.AddConstraint(
            model_name="projectuser",
            constraint=models.UniqueConstraint(fields=("user_id", "project_id"), name="unique_user_project"),
        ),
    ]

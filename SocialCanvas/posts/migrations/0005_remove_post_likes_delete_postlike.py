# Generated by Django 5.0.1 on 2024-02-05 07:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_postlike_post_likes_postlike_unique_like'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.DeleteModel(
            name='PostLike',
        ),
    ]
# Generated by Django 5.0.3 on 2024-03-25 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('article', '0003_article_article_uuid_alter_article_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='content',
            field=models.TextField(max_length=1500),
        ),
    ]

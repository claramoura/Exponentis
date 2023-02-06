from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    courseProgress = models.JSONField(default=dict)
    unitProgress = models.JSONField(default=dict)
    # Array containing the id of all exercises the user has submitted.
    submissions = models.JSONField(default=list)


class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    course = models.CharField(max_length=100)
    # List of all units in a given course.
    units = models.JSONField(default=list)

class Lesson(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    title = models.CharField(max_length=100)
    keyConcept = models.TextField(blank=False)
    pairs = models.JSONField(default=list)
    renderingOrder = models.SmallIntegerField()

class Graph(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    settings = models.JSONField(default=dict)
    expression = models.JSONField(default=dict)
    mathBounds = models.JSONField(default=dict)
    points = models.JSONField(default=list)
    lessonId = models.ForeignKey(Lesson, on_delete=models.CASCADE)

class Image(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    file = models.ImageField(blank=True, null=True)
    lessonId = models.ForeignKey(Lesson, on_delete=models.CASCADE)

class Example(models.Model):
    id = models.CharField(primary_key=True, max_length=100)
    prompt = models.TextField(blank=False)
    solution = models.TextField(blank=False)
    lessonId = models.ForeignKey(Lesson, on_delete=models.CASCADE)

class Exercise(models.Model):

    class ResponseType(models.TextChoices):
        SHORTANSWER = 'SA', _('short answer')
        MULTIPLECHOICE = 'MC', _('multiple choice')

    id = models.CharField(primary_key=True, max_length=100)
    responseType = models.CharField(max_length=20, choices=ResponseType.choices, default=ResponseType.MULTIPLECHOICE)
    prompt = models.TextField(blank=False)
    # If responseType == 'short answer', then choices = [empty array].
    # If responseType == 'multiple choice', then choices = [choice1, choice2, ...].
    choices = models.JSONField(default=list)
    # If responseType == 'multiple choice', then answer is the index of the correct answer in the choice array.
    answer = models.TextField(blank=False)
    # Exercises are modeled after examples; exampleId points to the corresponding example object.
    exampleId = models.ForeignKey(Example, on_delete=models.CASCADE)

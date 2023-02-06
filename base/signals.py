from django.db.models.signals import pre_save, post_save, pre_delete
from django.dispatch import receiver

from .models import *

# Adds new example/practice pair to lesson
@receiver(post_save, sender=Exercise)
def add_new_pair(sender, **kwargs):
    exercise = kwargs['instance']
    lesson = exercise.exampleId.lessonId
    pairDict = {"example": exercise.exampleId.id, "practice": exercise.id}
    if pairDict not in lesson.pairs:
        lesson.pairs.append(pairDict)
        lesson.save()


# Updates progress dictionaries by adding new entries when a new user is registered or when a user submits an exercise.
@receiver(pre_save, sender=User)
def user_progress_dictionaries(sender, **kwargs):
    user = kwargs['instance']
    courses = Course.objects.all()
    
    # Updates progress dictionaries by adding new entries.
    for course in courses:
        if course.id not in user.courseProgress.keys():
            user.courseProgress[course.id] = 0
        
        for unit in course.units:
            if unit['id'] not in user.unitProgress.keys():
                user.unitProgress[unit['id']] = 0

# Removes example/exercise pair from lesson when an example is deleted
@receiver(pre_delete, sender=Example)
def remove_example_exercise_from_lesson_pairs(sender, **kwargs):
    example = kwargs['instance']
    lesson = example.lessonId

    for pair in lesson.pairs:
        if pair['example'] == example.id:
            lesson.pairs.remove(pair)
            
            lesson.save()

# Adds a new course or unit to the progress dictionaries of all users.
@receiver(post_save, sender=Course)
def new_entry_in_progress_dictionary(sender, **kwargs):
    course = kwargs['instance']
    users = User.objects.all()
    
    # Updates progress dictionaries by adding new entries.
    for user in users:
        if course.id not in user.courseProgress.keys():
            user.courseProgress[course.id] = 0
        
        for unit in course.units:
            if unit['id'] not in user.unitProgress.keys():
                user.unitProgress[unit['id']] = 0

        user.save()
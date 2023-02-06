from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User, UserAdmin)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(Graph)
admin.site.register(Example)
admin.site.register(Exercise)
admin.site.register(Image)
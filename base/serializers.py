from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'password', 
            'last_login', 
            'is_superuser', 
            'username', 
            'first_name', 
            'last_name', 
            'email', 
            'is_staff', 
            'is_active', 
            'date_joined', 
            'courseProgress', 
            'unitProgress', 
            'submissions'
        ]


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['token', 'id', 'username', 'courseProgress', 'unitProgress', 'submissions', 'isAdmin']

    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        access = refresh.access_token
        return {
            'access': str(access),
            'access_exp': access['exp'],
            'access_iat': access['iat'],
        }

    def get_isAdmin(self, obj):
        return obj.is_staff

class SubmissionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['courseProgress', 'unitProgress', 'submissions']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class GraphSerializer(serializers.ModelSerializer):
    lessonIdOptions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Graph
        fields = '__all__'

    def get_lessonIdOptions(self, obj):
        return list(Lesson.objects.values_list('id', flat=True))

class ImageSerializer(serializers.ModelSerializer):
    lessonIdOptions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Image
        fields = '__all__'

    def get_lessonIdOptions(self, obj):
        return list(Lesson.objects.values_list('id', flat=True))



class LessonSerializer(serializers.ModelSerializer):
    # List of dictionaries containing the ids of an example and its corresponding exercise.
    # Exercises are modeled after examples; their Bootstrap modals are connected in the frontend.
    class Meta:
        model = Lesson
        fields = '__all__'

class ExampleSerializer(serializers.ModelSerializer):
    lessonIdOptions = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Example
        fields = '__all__'

    def get_lessonIdOptions(self, obj):
        return list(Lesson.objects.values_list('id', flat=True))

class ExerciseSerializer(serializers.ModelSerializer):
    exampleIdOptions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Exercise
        fields = '__all__'

    def get_exampleIdOptions(self, obj):
        return list(Example.objects.values_list('id', flat=True))

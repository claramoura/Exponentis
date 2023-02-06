from django.db.models import Q
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenViewBase

from .custom_permission import IsAdminUserOrReadOnly
from .models import *
from .serializers import *

# Returns all courses or creates a new Course instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getCourses(request):
    data = request.data

    if request.method == 'POST':
        try:
            course = Course.objects.create(
            id=data['id'],
            course=data['course'],
            units=data['units'])
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CourseSerializer(course, many=False)
        return Response(serializer.data)
    
    else:
        try:
            courses = Course.objects.all()
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

# Get course by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getCourse(request, id):
    data = request.data 
    try:
        course = Course.objects.get(pk=id)
    except Course.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        course.id = data['id']
        course.course = data['course']
        course.units = data['units']

        course.save()

    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_200_OK)

    serializer = CourseSerializer(course, many=False)
    
    return Response(serializer.data)



# Returns all graphs or creates a new Graph instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getGraphs(request):
    data = request.data

    if request.method == 'POST':
        try:
            graph = Graph.objects.create(
            id=data['id'],
            settings=data['settings'],
            expression=data['expression'],
            mathBounds=data['mathBounds'],
            points=data['points'],
            lessonId=Lesson.objects.get(id=data['lessonId']))
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = GraphSerializer(graph, many=False)
        return Response(serializer.data)
    
    else:
        try:
            graphs = Graph.objects.all()
        except Graph.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = GraphSerializer(graphs, many=True)
        return Response(serializer.data)

# Get graph by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getGraph(request, id):
    data = request.data

    try:
        graph = Graph.objects.get(pk=id)
    except Graph.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        graph.id = data['id']
        graph.settings = data['settings']
        graph.expression = data['expression']
        graph.mathBounds = data['mathBounds']
        graph.points = data['points']
        graph.lessonId = Lesson.objects.get(id=data['lessonId'])

        graph.save()

    elif request.method == 'DELETE':
        graph.delete()
        return Response(status=status.HTTP_200_OK)

    serializer = GraphSerializer(graph, many=False)

    return Response(serializer.data)



# Returns all images or creates a new Image instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getImages(request):
    data = request.data

    if request.method == 'POST':
        try:
            image = Image.objects.create(
            id=data['id'],
            file=request.FILES.get('file'),
            lessonId=Lesson.objects.get(id=data['lessonId']))
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ImageSerializer(image, many=False)
        return Response(serializer.data)
    
    else:
        try:
            images = Image.objects.all()
        except Image.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)


# Get image by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getImage(request, id):
    data = request.data

    try:
        image = Image.objects.get(pk=id)
    except Image.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        image.id = data['id']
        image.file = request.FILES.get('file')
        image.lessonId = Lesson.objects.get(id=data['lessonId'])

        image.save()

    elif request.method == 'DELETE':
        image.delete()
        return Response(status=status.HTTP_200_OK)
    
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)



# Returns all lessons or creates a new Lesson instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getLessons(request):
    data = request.data

    if request.method == 'POST':
        try:
            lesson = Lesson.objects.create(
            id=data['id'],
            title=data['title'],
            keyConcept=data['keyConcept'],
            pairs=data['pairs'],
            renderingOrder=data['renderingOrder'])
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = LessonSerializer(lesson, many=False)
        return Response(serializer.data)
        
    else:
        try:
            lessons = Lesson.objects.all()
        except Lesson.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

# Get lessons by their unit's id
@api_view(['GET'])
def getUnitLessons(request, unitId):
    try:
        lessons = Lesson.objects.filter(Q(id__startswith=f'{unitId}')).order_by('renderingOrder')
        serializer = LessonSerializer(lessons, many=True)
    except Lesson.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.data)

# Get lesson by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getLesson(request, id):
    data = request.data

    try:
        lesson = Lesson.objects.get(pk=id)
    except Lesson.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        lesson.id = data['id']
        lesson.title = data['title']
        lesson.keyConcept = data['keyConcept']
        lesson.pairs = data['pairs']
        lesson.renderingOrder = data['renderingOrder']

        lesson.save()

    elif request.method == 'DELETE':
        lesson.delete()
        return Response(status=status.HTTP_200_OK)

    serializer = LessonSerializer(lesson, many=False)

    return Response(serializer.data)


# Returns all examples or creates a new Example instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getExamples(request):
    data = request.data

    if request.method == 'POST':
        try:
            example = Example.objects.create(
            id=data['id'],
            prompt=data['prompt'],
            solution=data['solution'],
            lessonId=Lesson.objects.get(id=data['lessonId']))
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = ExampleSerializer(example, many=False)
        return Response(serializer.data)
        
    else:
        try:
            examples = Example.objects.all()
        except Example.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExampleSerializer(examples, many=True)
        return Response(serializer.data)

# Get example by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getExample(request, id):
    data = request.data

    try:
        example = Example.objects.get(pk=id)
    except Example.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        example.id = data['id']
        example.prompt = data['prompt']
        example.solution = data['solution']
        example.lessonId = Lesson.objects.get(id=data['lessonId'])

        example.save()

    elif request.method == 'DELETE':
        example.delete()
        return Response(status=status.HTTP_200_OK)
    
    serializer = ExampleSerializer(example)

    return Response(serializer.data)



# Returns all exercises or creates a new Exercise instance
@api_view(['GET', 'POST'])
@permission_classes([IsAdminUserOrReadOnly])
def getExercises(request):
    data = request.data

    if request.method == 'POST':
        try:
            exercise = Exercise.objects.create(
            id=data['id'],
            responseType=data['responseType'],
            prompt=data['prompt'],
            choices=data['choices'],
            answer=data['answer'],
            exampleId=Example.objects.get(id=data['exampleId']))
        
        except BaseException:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = ExerciseSerializer(exercise, many=False)
        return Response(serializer.data)
        
    else:
        try:
            exercises = Exercise.objects.all()
        except Exercise.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExerciseSerializer(exercises, many=True)
        return Response(serializer.data)

# Get exercise by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUserOrReadOnly])
def getExercise(request, id):
    data = request.data

    try:
        exercise = Exercise.objects.get(pk=id)
    except Exercise.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        exercise.id = data['id']
        exercise.responseType = data['responseType']
        exercise.prompt = data['prompt']
        exercise.choices = data['choices']
        exercise.answer = data['answer']
        exercise.exampleId = Example.objects.get(id=data['exampleId'])

        exercise.save()

    elif request.method == 'DELETE':
        exercise.delete()
        return Response(status=status.HTTP_200_OK)
    
    serializer = ExerciseSerializer(exercise)

    return Response(serializer.data)



# Get all users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.data)

# Get user by id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAdminUser])
def getUser(request, id):
    data = request.data
    
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user.email = data['email']
        user.first_name = data['first_name']
        user.last_name = data['last_name']
        user.submissions = data['submissions']
        user.courseProgress = data['courseProgress']
        user.unitProgress = data['unitProgress']
        user.is_active = data['is_active']
        user.is_staff = data['is_staff']
        user.is_superuser = data['is_superuser']

        user.save()

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_200_OK)

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)



class MyTokenViewBase(TokenViewBase):
    def post(self, request): 
        data = request.data
        
        try:
            user = User.objects.get(username=data['username'])
        except:
            message = {'detail': 'Sorry! We could not find your account.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        if check_password(data['password'], user.password) == False:
            message = {'detail': 'Incorrect password.'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializerWithToken(user, many=False)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def registerUser(request):
    data = request.data    
    try:
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'This username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def submitPractice(request):
    user = request.user
    data = request.data

    if data['submission'] in user.submissions:
        serializer = SubmissionResponseSerializer(user, many=False)
        return Response(serializer.data)
    
    else:
        user.submissions.append(data['submission'])
    
        # Numerator refers to the number of exercises in the course (or unit) that the user has submitted.
        numerator = 0
        # Denominator refers to the total number of exercises in the course (or unit).
        denominator = 0

        courseId = ''
        unitId = ''

        # Updates course progress
        for entry in user.courseProgress.keys():
            if data['submission'].startswith(entry):
                courseId = entry
                denominator = Exercise.objects.filter(id__startswith=entry).count()
        
        for submission in user.submissions:
            if submission.startswith(courseId):
                numerator += 1

        try:
            progress = round((numerator / denominator), 2) * 100
        except ZeroDivisionError:
            progress = 0
        finally:
            user.courseProgress[courseId] = int(progress)
            numerator = 0
            denominator = 0

        for entry in user.unitProgress.keys():
            if submission.startswith(entry):
                unitId = entry
                denominator = Exercise.objects.filter(id__startswith=entry).count()
        
        for submission in user.submissions:
            if submission.startswith(unitId):
                numerator += 1

        try:
            progress = round((numerator / denominator), 2) * 100
        except ZeroDivisionError:
            progress = 0
        finally:
            user.unitProgress[unitId] = int(progress)
        
        user.save()

        serializer = SubmissionResponseSerializer(user, many=False)

        return Response(serializer.data)